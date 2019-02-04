USE `bk`;
-- MySQL dump 10.13  Distrib 8.0.15, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: bk
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;




--
-- Table structure for table `Address`
--

DROP TABLE IF EXISTS `Address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `Address` (

    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Street name.',
    `house_number` int(11) NOT NULL COMMENT 'Numerical distinction.',
    `letter` char(1) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Alphabetical distinction.',
    `zip_code` char(4) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ie. the Norwegian «postnummer».',
    `postal_location` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Municipality.',
    `route_FK` int(11) DEFAULT NULL COMMENT 'Foreign key pointing to a specific route in the Route table.',

    PRIMARY KEY (`ID`),
    KEY `IDX_Address` (`name`,`house_number`,`letter`,`zip_code`,`postal_location`) USING BTREE COMMENT 'These rows will never change.',
    KEY `FK_Address_Route_IDX` (`route_FK`),
    CONSTRAINT `FK_Address_Route` FOREIGN KEY (`route_FK`) REFERENCES `route` (`id`)

) ENGINE=InnoDB AUTO_INCREMENT=4667 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `Order` (

    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `user_FK` int(11) NOT NULL COMMENT 'Foreign key pointing to a specific user in the User table.',
    `time` datetime NOT NULL COMMENT 'The exact time of purchase.',

    PRIMARY KEY (`ID`),
    KEY `FK_Order_User_IDX` (`user_FK`),
    CONSTRAINT `FK_Order_User` FOREIGN KEY (`user_FK`) REFERENCES `user` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Order_Line`
--

DROP TABLE IF EXISTS `Order_Line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `Order_Line` (

    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `order_FK` int(11) NOT NULL COMMENT 'Foreign key pointing to a specific order in the Order table.',
    `product_FK` int(11) NOT NULL COMMENT 'Foreign key pointing to a specific product in the Product table.',
    `quantity` int(11) NOT NULL COMMENT 'The quantity of a given product.',

    PRIMARY KEY (`ID`),
    KEY `FK_Order_Line_Order_IDX` (`order_FK`),
    KEY `FK_Order_Line_Product_IDX` (`product_FK`),
    CONSTRAINT `FK_Order_Line_Order` FOREIGN KEY (`order_FK`) REFERENCES `order` (`id`),
    CONSTRAINT `FK_Order_Line_Product` FOREIGN KEY (`product_FK`) REFERENCES `product` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Price_Log`
--

DROP TABLE IF EXISTS `Price_Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `Price_Log` (

    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `product_FK` int(11) NOT NULL COMMENT 'Foreign key pointing to a specific product in the Product table.',
    `old_price` decimal(8,2) NOT NULL COMMENT 'The prior product price.',
    `new_price` decimal(8,2) NOT NULL COMMENT 'The new product price.',
    `time` datetime NOT NULL COMMENT 'The exact time of [price] update.',

    PRIMARY KEY (`ID`),
    KEY `FK_Price_Log_Product_IDX` (`product_FK`),
    CONSTRAINT `FK_Price_Log_Product` FOREIGN KEY (`product_FK`) REFERENCES `product` (`id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `Product` (

    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Name of the product.',
    `price` decimal(8,2) NOT NULL COMMENT 'Price of the product.',

    PRIMARY KEY (`ID`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Route`
--

DROP TABLE IF EXISTS `Route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `Route` (

    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `EN_US` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Weekdays in English.',
    `NO_NN` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Weekdays in New Norwegian.',

    PRIMARY KEY (`ID`),
    UNIQUE KEY `EN_US_UNIQUE` (`EN_US`),
    UNIQUE KEY `NO_NN_UNIQUE` (`NO_NN`)

) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `User` (

    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `email` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'TODO: Add regex email pattern validation.',
    `first_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    `last_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
    `password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'SHA512 hashed password.',
    `subscription` int(1) NOT NULL DEFAULT '0' COMMENT 'Whether a user subscribes to notifications or not.',
    `address_FK` int(11) NOT NULL COMMENT 'Foreign key pointing to a specific address in the Address table.',
    `user_type` int(1) DEFAULT '2',

    PRIMARY KEY (`ID`),
    UNIQUE KEY `email_UNIQUE` (`email`),
    KEY `FK_User_User_Type_IDX` (`address_FK`),
    CONSTRAINT `FK_User_User_Type` FOREIGN KEY (`user_type`) REFERENCES `User_Type` (`ID`),
    CONSTRAINT `CK_User_Email_Pattern` CHECK (`email` REGEXP '([a-zA-Z0-9.+]+(?:\@{1}))([a-zA-Z0-9+]+)(\.{1}[a-zA-Z0-9+]+)+')

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User_Type`
--

DROP TABLE IF EXISTS `User_Type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `User_Type` (

    `ID` int(1) NOT NULL,
    `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Name of a specific user type (e.g. admin or root).',

    PRIMARY KEY (`ID`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Waste_Category`
--

DROP TABLE IF EXISTS `Waste_Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `Waste_Category` (

    `ID` int(11) NOT NULL,
    `name` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Name of waste category (eg. plastic).',

    PRIMARY KEY (`ID`),
    UNIQUE KEY `name_UNIQUE` (`name`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Waste_Collection`
--

DROP TABLE IF EXISTS `Waste_Collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
SET character_set_client = utf8mb4 ;
CREATE TABLE `Waste_Collection` (

    `ID` int(11) NOT NULL AUTO_INCREMENT,
    `route_FK` int(11) NOT NULL COMMENT 'Foreign key pointing to a specific route in the Route table.',
    `waste_FK` int(11) NOT NULL COMMENT 'Foreign key pointing to a specific waste category in the Waste_Category table.',
    `date` date NOT NULL COMMENT 'The date for which the waste collection shall occur.',

    PRIMARY KEY (`ID`),
    KEY `FK_Waste_Collection_Waste_Category_IDX` (`waste_FK`),
    KEY `FK_Waste_Collection_Route_IDX` (`route_FK`),
    CONSTRAINT `FK_Waste_Collection_Route` FOREIGN KEY (`route_FK`) REFERENCES `route` (`id`),
    CONSTRAINT `FK_Waste_Collection_Waste_Category` FOREIGN KEY (`waste_FK`) REFERENCES `Waste_Category` (`ID`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-02  0:22:54
