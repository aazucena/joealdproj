DROP DATABASE IF EXISTS proj_db;
CREATE DATABASE IF NOT EXISTS proj_db;
USE proj_db;

DROP TABLE IF EXISTS `collection`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `store_items`;

CREATE TABLE IF NOT EXISTS `collection` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(64),
    `date_created` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `date_updated` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO `collection`(`name`) VALUE
('Cars'),
('Books'),
('Food'),
('Games'),
('Videos');


CREATE TABLE IF NOT EXISTS `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `first_name` varchar(64) NOT NULL,
    `last_name` varchar(64) NOT NULL,
    `age` int,
    PRIMARY KEY (id)
);

INSERT INTO `users`(`first_name`,`last_name`,`age`) VALUE
('Bob', 'Jones', 22),
('Jenny', 'Joles', 32),
('Timmy', 'Knitty', 12),
('Bot', 'Rob', 999),
('Nothing', 'Ness', 0);


CREATE TABLE IF NOT EXISTS `store_items` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `price` FLOAT(4, 2) DEFAULT 0.00,
    PRIMARY KEY (id)
);

INSERT INTO `store_items`(`name`, `price`) VALUE
('Mercedes Benz (2001)', 100.00),
('NVIDIA RTX 3090 Ti', 1200.00),
('Tacobell', 20.00),
('Among Us', 2.99),
('Internet', 0.00);
