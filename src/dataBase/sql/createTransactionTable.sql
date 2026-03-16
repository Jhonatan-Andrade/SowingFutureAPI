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