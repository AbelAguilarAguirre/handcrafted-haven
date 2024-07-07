const { db } = require('@vercel/postgres');


async function seed(client) {
    await client.query(`

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user table
CREATE TABLE IF NOT EXISTS "user" (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create product table
CREATE TABLE IF NOT EXISTS "product" (
    product_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    rating FLOAT CHECK (rating >= 0 AND rating <= 5),
    price DECIMAL(10, 2),
    description TEXT,
    image_url VARCHAR(255),
    user_id UUID REFERENCES "user" (user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create review table
CREATE TABLE IF NOT EXISTS "review" (
    review_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    rating FLOAT CHECK (rating >= 0 AND rating <= 5),
    product_id UUID REFERENCES "product" (product_id) ON DELETE CASCADE,
    user_id UUID REFERENCES "user" (user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update product rating
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
DECLARE
    avg_rating FLOAT;
BEGIN
    -- Calculate the average rating of all reviews for the product
    SELECT AVG(rating) INTO avg_rating
    FROM review
    WHERE product_id = NEW.product_id;

    -- Update the product rating with the calculated average rating
    UPDATE product
    SET rating = avg_rating
    WHERE product_id = NEW.product_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function after a review is inserted
CREATE TRIGGER after_review_insert
AFTER INSERT ON review
FOR EACH ROW
EXECUTE FUNCTION update_product_rating();

`);
}

