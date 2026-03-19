export const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`
export const createAccountingRecordsTable = `
  CREATE TABLE IF NOT EXISTS accounting_records (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    value_money NUMERIC NOT NULL,
    records_in_and_out VARCHAR(50) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  );
`
export const createGoalsTable = `
  CREATE TABLE IF NOT EXISTS goals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    target_value NUMERIC NOT NULL,
    current_value NUMERIC NOT NULL,
    target_date DATE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  );

`
export const createTransactionTable = `
  CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      value_money NUMERIC NOT NULL,
      records_in_and_out VARCHAR(50) NOT NULL,
      category VARCHAR(50) NOT NULL,
      target_date DATE NOT NULL,
      payment_method VARCHAR(50) NOT NULL,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
  );
`