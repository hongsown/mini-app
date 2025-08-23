-- Migration to add in_stock column to products table
ALTER TABLE products ADD COLUMN in_stock INTEGER DEFAULT 0;

-- Update existing records to have default value
UPDATE products SET in_stock = 0 WHERE in_stock IS NULL;