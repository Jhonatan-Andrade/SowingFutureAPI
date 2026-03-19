

import { app } from "./app";
import pool from "./dataBase/databaseClient";

const apiPort = process.env.PORT ? Number(process.env.PORT) : 3333;
async function waitForDatabase() {
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

async function startServer() {
  try {
    await waitForDatabase();
    app.listen({ port: apiPort, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        console.error("Erro ao iniciar servidor:", err);
        process.exit(1);
      }
      console.log(`Server is Running : http://localhost:${apiPort}`);
    });
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
    process.exit(1);
  }
}

startServer();