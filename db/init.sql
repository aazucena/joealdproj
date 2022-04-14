DROP DATABASE IF EXISTS proj_db;
CREATE DATABASE IF NOT EXISTS proj_db;
USE proj_db;

DROP TABLE IF EXISTS `collection`;

CREATE TABLE IF NOT EXISTS `collection` (
    `id` int NOT NULL,
    `name` varchar(64),
    PRIMARY KEY (id)
);

insert into `collection`(`id`,`name`) values
(1,'Cars'),
(2,'Books'),
(3,'Food'),
(4,'Games'),
(5,'Videos');