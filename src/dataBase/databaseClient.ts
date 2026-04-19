
import { Pool  } from "pg";
import { createUsersTable, createAccountingRecordsTable, createGoalsTable, createTransactionTable } from "./scriptSQL";

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
};
export const pool = new Pool(dbConfig);


pool.connect()
  .then(client => {
    client.release();
  })
  .catch(err => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });
const createTables = async () => {
  try {
    await pool.query(createUsersTable);
    await pool.query(createAccountingRecordsTable);
    await pool.query(createGoalsTable);
    await pool.query(createTransactionTable);
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
    process.exit(1);
  }
};

// Inicializar banco de dados
createTables().catch((err) => {
  console.error("Erro crítico ao inicializar banco de dados:", err);
  process.exit(1);
});

export async function waitForDatabase() {
  let attempts = 0;
  const maxAttempts = 3;
  
  while (attempts < maxAttempts) {
    try {
      const client = await pool.connect();
      client.release();
      return;
    } catch (err) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw new Error(`Não foi possível conectar ao banco de dados após ${maxAttempts} tentativas`);
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

