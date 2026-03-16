
import { Pool  } from "pg";

//importar o sql para criar as tabelas necessárias
import { readFileSync } from "fs";
import { join } from "path";

const createUsersTable = readFileSync(join(__dirname, "./sql/createUsersTable.sql"), "utf-8");
const createAccountingRecordsTable = readFileSync(join(__dirname, "./sql/createAccountingRecordsTable.sql"), "utf-8");
const createGoalsTable = readFileSync(join(__dirname, "./sql/createGoalsTable.sql"), "utf-8");


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
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
  }
};
createTables();

export default pool;

