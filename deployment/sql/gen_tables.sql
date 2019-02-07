USE `bk`;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `Address`;
CREATE TABLE `Address` (
    `ID` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `house_number` INT(11) NOT NULL,
    `letter` CHAR(1) NOT NULL,
    `zip_code` CHAR(4) NOT NULL,
    `postal_location` VARCHAR(45) NOT NULL,
    `route_ID` INT(11) DEFAULT NULL,

    PRIMARY KEY(`ID`),
    FOREIGN KEY(`route_ID`) REFERENCES `Route`(`ID`),
    INDEX `Address_IDX` (`name`, `house_number`, `letter`, `zip_code`, `postal_location`)
);


DROP TABLE IF EXISTS `Order`;
CREATE TABLE `Order` (
    `ID` INT(11) NOT NULL AUTO_INCREMENT,
    `user_ID` INT(11) NOT NULL,
    `time` DATETIME NOT NULL,

    PRIMARY KEY (`ID`),
    FOREIGN KEY (`user_ID`) REFERENCES `User`(`ID`)
);


DROP TABLE IF EXISTS `Order_Line`;
CREATE TABLE `Order_Line` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `order_ID` int(11) NOT NULL,
    `product_ID` int(11) NOT NULL,
    `quantity` int(11) NOT NULL,
    `price` DECIMAL(8, 2),

    PRIMARY KEY (`ID`),
    FOREIGN KEY (`order_ID`) REFERENCES `Order` (`ID`),
    FOREIGN KEY (`product_ID`) REFERENCES `Product` (`ID`)
);


DROP TABLE IF EXISTS `Price_Log`;
CREATE TABLE `Price_Log` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `product_ID` int(11) NOT NULL,
    `old_price` decimal(8,2) NOT NULL,
    `new_price` decimal(8,2) NOT NULL,
    `time` datetime NOT NULL,

    PRIMARY KEY (`ID`),
    FOREIGN KEY (`product_ID`) REFERENCES `Product` (`ID`)
);


DROP TABLE IF EXISTS `Product`;
CREATE TABLE `Product` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    `price` decimal(8,2) NOT NULL,

    PRIMARY KEY (`ID`)
);


DROP TABLE IF EXISTS `Route`;
CREATE TABLE `Route` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `en_us` varchar(45) DEFAULT NULL UNIQUE,
    `no_nn` varchar(45) DEFAULT NULL UNIQUE,

    PRIMARY KEY (`ID`)
);


DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(45) NOT NULL UNIQUE,
    `first_name` varchar(45) NOT NULL,
    `last_name` varchar(45) NOT NULL,
    `password` varchar(128) NOT NULL,
    `subscription` int(1) NOT NULL DEFAULT '0',
    `address_ID` int(11) NOT NULL,
    `user_type_ID` int(1) DEFAULT '2',

    PRIMARY KEY (`ID`),
    FOREIGN KEY (`user_type_ID`) REFERENCES `User_Type` (`ID`),
    CONSTRAINT `CK_User_Email_Pattern` CHECK (`email` REGEXP '([a-zA-Z0-9.+]+(?:\@{1}))([a-zA-Z0-9+]+)(\.{1}[a-zA-Z0-9+]+)+')
);


DROP TABLE IF EXISTS `User_Type`;
CREATE TABLE `User_Type` (
    `ID` int(1) NOT NULL,
    `name` varchar(45) NOT NULL,

    PRIMARY KEY (`ID`)
);


DROP TABLE IF EXISTS `Waste_Category`;
CREATE TABLE `Waste_Category` (
    `ID` int(11) NOT NULL,
    `name` varchar(45) DEFAULT NULL UNIQUE,

    PRIMARY KEY (`ID`)
);


DROP TABLE IF EXISTS `Waste_Collection`;
CREATE TABLE `Waste_Collection` (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `route_ID` int(11) NOT NULL,
    `waste_ID` int(11) NOT NULL,
    `date` date NOT NULL,

    PRIMARY KEY (`ID`),
    FOREIGN KEY (`route_ID`) REFERENCES `Route` (`ID`),
    FOREIGN KEY (`waste_ID`) REFERENCES `Waste_Category` (`ID`)
);

