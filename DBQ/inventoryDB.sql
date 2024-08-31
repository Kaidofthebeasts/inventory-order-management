CREATE DATABASE inventory_db;
USE inventory_db;

CREATE TABLE categories (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
phone_number VARCHAR(15),
email VARCHAR(255),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
description TEXT,
quantity INT NOT NULL CHECK (quantity >= 0),
price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
status VARCHAR(20) NOT NULL,
image_url VARCHAR(255),
reorder_level INT CHECK (reorder_level >= 0),
manufacturing_date DATE,
category_id INT,
supplier_id INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
total_value DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * price) STORED,
FOREIGN KEY (category_id) REFERENCES categories(id),
FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
INDEX idx_product_name (name),
INDEX idx_category_id (category_id),
INDEX idx_supplier_id (supplier_id)
);

-- Trigger to update status based on quantity
DELIMITER //
CREATE TRIGGER update_status_insert
BEFORE INSERT ON products
FOR EACH ROW
BEGIN
-- Check if the new quantity is 0
IF (NEW.quantity = 0) THEN
SET NEW.status = 'Out of Stock';
-- Check if the new quantity is below the reorder level
ELSEIF (NEW.quantity <= NEW.reorder_level) THEN
SET NEW.status = 'Low Stock';
-- If the new quantity is greater than the reorder level, set the status to 'Available'
ELSE
SET NEW.status = 'Available';
END IF;
END;

//
DELIMITER ;

DELIMITER //

CREATE TRIGGER update_status_update
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
-- Check if the quantity is updated and the new quantity is 0
IF (OLD.quantity <> NEW.quantity AND NEW.quantity = 0) THEN
SET NEW.status = 'Out of Stock';
-- Check if the quantity is updated and the new quantity is below the reorder level
ELSEIF (OLD.quantity <> NEW.quantity AND NEW.quantity <= NEW.reorder_level) THEN
SET NEW.status = 'Low Stock';
-- If the quantity is not updated or is greater than the reorder level, set the status to 'Available'
ELSE
SET NEW.status = 'Available';
END IF;
END;

//
DELIMITER ;

-- Insert sample data into categories
INSERT INTO categories (name) VALUES ('Electronics'), ('Furniture'), ('Clothing');

-- Insert sample data into suppliers
INSERT INTO suppliers (name, phone_number, email) VALUES 
('Supplier A', '1234567890', 'supplierA@example.com'),
('Supplier B', '0987654321', 'supplierB@example.com');




