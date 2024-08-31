CREATE DATABASE inventory_order_db;
USE inventory_order_db;

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
manufacturing_date DATE,
category_id INT,
supplier_id INT,
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


INSERT INTO categories (name) VALUES 
('Electronics'), 
('Furniture'), 
('Clothing'), 
('Books'), 
('Toys'), 
('Groceries'), 
('Beauty'), 
('Sports'), 
('Automotive'), 
('Home Appliances');

INSERT INTO suppliers (name, phone_number, email) VALUES 
('Supplier A', '1234567890', 'supplierA@example.com'),
('Supplier B', '0987654321', 'supplierB@example.com'),
('Supplier C', '1122334455', 'supplierC@example.com'),
('Supplier D', '2233445566', 'supplierD@example.com'),
('Supplier E', '3344556677', 'supplierE@example.com'),
('Supplier F', '4455667788', 'supplierF@example.com'),
('Supplier G', '5566778899', 'supplierG@example.com'),
('Supplier H', '6677889900', 'supplierH@example.com'),
('Supplier I', '7788990011', 'supplierI@example.com'),
('Supplier J', '8899001122', 'supplierJ@example.com');


INSERT INTO products (name, description, quantity, price, status, image_url, reorder_level, manufacturing_date, category_id, supplier_id) VALUES 
('Smartphone', 'Latest model smartphone with 128GB storage', 50, 699.99, 'Available', 'http://example.com/smartphone.jpg', 10, '2023-01-01', 1, 1),
('Laptop', 'High-performance laptop with 16GB RAM', 30, 999.99, 'Available', 'http://example.com/laptop.jpg', 5, '2023-02-01', 1, 2),
('Office Chair', 'Ergonomic office chair with lumbar support', 20, 199.99, 'Available', 'http://example.com/office_chair.jpg', 5, '2023-03-01', 2, 3),
('Desk Lamp', 'LED desk lamp with adjustable brightness', 100, 29.99, 'Available', 'http://example.com/desk_lamp.jpg', 20, '2023-04-01', 2, 4),
('T-shirt', 'Cotton T-shirt in various sizes', 200, 19.99, 'Available', 'http://example.com/tshirt.jpg', 50, '2023-05-01', 3, 5),
('Novel', 'Bestselling novel by a famous author', 150, 14.99, 'Available', 'http://example.com/novel.jpg', 30, '2023-06-01', 4, 6),
('Action Figure', 'Collectible action figure from popular series', 80, 24.99, 'Available', 'http://example.com/action_figure.jpg', 10, '2023-07-01', 5, 7),
('Organic Apples', 'Fresh organic apples, 1kg pack', 60, 4.99, 'Available', 'http://example.com/apples.jpg', 15, '2023-08-01', 6, 8),
('Shampoo', 'Herbal shampoo for all hair types', 120, 9.99, 'Available', 'http://example.com/shampoo.jpg', 25, '2023-09-01', 7, 9),
('Basketball', 'Official size and weight basketball', 40, 29.99, 'Available', 'http://example.com/basketball.jpg', 10, '2023-10-01', 8, 10);

drop table products

SELECT * FROM categories;
SELECT * FROM suppliers;
SELECT * FROM products;


use inventory_order_db;

CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT
);


-- Create Orders table
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME NOT NULL,
    status ENUM('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled') NOT NULL,
    total_amount DECIMAL(10, 2) DEFAULT 0,
    product_id INT NOT NULL,
    shipment_date DATETIME,
    estimated_arrival DATETIME,
	quantity INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id),
	FOREIGN KEY (product_id) REFERENCES Products(id)
);






-- Create triggers for order status
DELIMITER //
CREATE TRIGGER update_shipment_date
BEFORE UPDATE ON Orders
FOR EACH ROW
BEGIN
    IF (NEW.status = 'Shipped') THEN
        SET NEW.shipment_date = CURRENT_TIMESTAMP;
        SET NEW.estimated_arrival = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 7 DAY); -- Example: 7 days for delivery
    END IF;
END;
//
DELIMITER ;





-- Create triggers to update total amount
DELIMITER //
CREATE TRIGGER update_total_amount_insert
AFTER INSERT ON OrderItems
FOR EACH ROW
BEGIN
    UPDATE Orders
    SET total_amount = total_amount + NEW.quantity * NEW.price
    WHERE order_id = NEW.order_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_total_amount_update
AFTER UPDATE ON OrderItems
FOR EACH ROW
BEGIN
    UPDATE Orders
    SET total_amount = total_amount - OLD.quantity * OLD.price + NEW.quantity * NEW.price
    WHERE order_id = NEW.order_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE TRIGGER update_total_amount_delete
AFTER DELETE ON OrderItems
FOR EACH ROW
BEGIN
    UPDATE Orders
    SET total_amount = total_amount - OLD.quantity * OLD.price
    WHERE order_id = OLD.order_id;
END;
//
DELIMITER ;

-- Create indexes for performance optimization
CREATE INDEX idx_order_date ON Orders(order_date);
CREATE INDEX idx_order_status ON Orders(status);
CREATE INDEX idx_order_customer ON Orders(customer_id);

-- Create views for reporting (optional)
CREATE VIEW OrderSummary AS
SELECT 
    Orders.order_id,
    Orders.order_date,
    Orders.status,
    Orders.total_amount,
    Customers.name AS customer_name
FROM 
    Orders
JOIN 
    Customers ON Orders.customer_id = Customers.customer_id;

INSERT INTO Customers (customer_id, name, email, phone, address)
VALUES
(1, 'John Doe', 'john.doe@example.com', '123-456-7890', '123 Main St, Cityville, ST 12345'),
(2, 'Jane Smith', 'jane.smith@example.com', '987-654-3210', '456 Elm St, Townsville, ST 67890'),
(3, 'Alice Johnson', 'alice.johnson@example.com', '555-123-4567', '789 Oak St, Villageville, ST 11223');

INSERT INTO Orders (order_id, customer_id, order_date, status, total_amount, tracking_number, shipment_date, estimated_arrival)
VALUES
(1, 1, '2024-08-24 10:00:00', 'Pending', 0, 'ORD-1-1627890123', NULL, NULL),
(2, 2, '2024-08-24 11:00:00', 'Processing', 0, 'ORD-2-1627890124', NULL, NULL),
(3, 3, '2024-08-24 12:00:00', 'Shipped', 0, 'ORD-3-1627890125', '2024-08-24 12:00:00', '2024-08-31 12:00:00');

INSERT INTO OrderItems (order_item_id, order_id, product_id, quantity, price)
VALUES
(1, 1, 1, 2, 25.00),
(2, 1, 2, 1, 15.00),
(3, 2, 3, 3, 10.00),
(4, 3, 1, 1, 25.00),
(5, 3, 2, 2, 15.00);









