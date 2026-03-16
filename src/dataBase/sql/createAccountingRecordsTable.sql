CREATE TABLE IF NOT EXISTS accounting_records (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  value_money NUMERIC NOT NULL,
  records_in_and_out VARCHAR(50) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);