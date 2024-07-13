const { db } = require('@vercel/postgres');


async function seed(client) {
    await client.query(`

CREATE TABLE "category" (
    category_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
);

CREATE TABLE "product_category" (
    product_id UUID REFERENCES "product" (product_id) ON DELETE CASCADE,
    category_id UUID REFERENCES "category" (category_id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, category_id)
);

-- Create cart table
CREATE TABLE "cart" (
    cart_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "user" (user_id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cart_item join table
CREATE TABLE "cart_item" (
    cart_item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID REFERENCES "cart" (cart_id) ON DELETE CASCADE,
    product_id UUID REFERENCES "product" (product_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    CONSTRAINT unique_cart_product_combination UNIQUE (cart_id, product_id);
);

`);
}