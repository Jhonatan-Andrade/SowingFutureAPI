
import { Pool  } from "pg";
import { createUsersTable, createAccountingRecordsTable, createGoalsTable, createTransactionTable } from "./scriptSQL";


const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("url não foi encontrada nas variáveis de ambiente.");
}
const pool = new Pool({connectionString: url});


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

export default pool;

