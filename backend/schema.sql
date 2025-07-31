-- Database schema for ChatAgent CellPhone Recommendation System

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    language VARCHAR DEFAULT 'en',
    preferences TEXT
);

-- Create cellphones table
CREATE TABLE cellphones (
    id SERIAL PRIMARY KEY,
    brand VARCHAR NOT NULL,
    model VARCHAR NOT NULL,
    year INTEGER NOT NULL,
    price FLOAT NOT NULL,
    storage VARCHAR,
    battery_life VARCHAR
);

-- Create conversations table
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_id ON users(id);
CREATE INDEX idx_cellphones_id ON cellphones(id);
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_timestamp ON conversations(timestamp);

-- Insert sample data for testing
INSERT INTO users (name, language, preferences) VALUES
('John Doe', 'en', '{"budget": 500, "brand": "Apple", "storage": "128GB"}'),
('Maria Garcia', 'es', '{"budget": 300, "brand": "Samsung", "battery": "long"}'),
('Pierre Dubois', 'fr', '{"budget": 400, "brand": "Google", "features": "camera"}');

INSERT INTO cellphones (brand, model, year, price, storage, battery_life) VALUES
('Apple', 'iPhone 15', 2024, 799.99, '128GB', '24h'),
('Apple', 'iPhone 14', 2023, 699.99, '128GB', '20h'),
('Samsung', 'Galaxy S24', 2024, 799.99, '256GB', '26h'),
('Samsung', 'Galaxy A54', 2023, 449.99, '128GB', '22h'),
('Google', 'Pixel 8', 2023, 699.99, '128GB', '24h'),
('Google', 'Pixel 7a', 2023, 449.99, '128GB', '20h'),
('OnePlus', '11', 2023, 699.99, '256GB', '25h'),
('Xiaomi', '13T', 2023, 599.99, '256GB', '23h'); 