-- Dropper, oppretter, og bruker schema.
DROP SCHEMA IF EXISTS søppel03;
CREATE SCHEMA søppel03;
USE søppel03;


-- Oppretter første "cluster" med tabeller.
-- Disse tabellene håndterer kun rutene.

DROP TABLE IF EXISTS route;
CREATE TABLE route (
    routeID TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    weekday VARCHAR(10) NOT NULL,
    dayname VARCHAR(10),
    PRIMARY KEY (routeID)
);


DROP TABLE IF EXISTS street;
CREATE TABLE street (
    street_name VARCHAR(60) NOT NULL,
    routeID TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY (street_name),
    FOREIGN KEY (routeID)
        REFERENCES route (routeID)
);


DROP TABLE IF EXISTS waste;
CREATE TABLE waste (
    category VARCHAR(60),
    PRIMARY KEY (category)
);


DROP TABLE IF EXISTS collection;
CREATE TABLE collection (
    category VARCHAR(60),
    routeID TINYINT UNSIGNED NOT NULL,
    collection_date DATE DEFAULT '2018-10-11',
    PRIMARY KEY (category , routeID , collection_date),
    FOREIGN KEY (category)
        REFERENCES waste (category),
    FOREIGN KEY (routeID)
        REFERENCES route (routeID)
);



-- Oppretter andre "cluster" med tabeller
-- Disse håndterer innlogg/brukere, bestilling av varer osv.

DROP TABLE IF EXISTS user_type;
CREATE TABLE user_type (
    typeID TINYINT(1) NOT NULL CHECK (typeID IN (0 , 1)),
    description VARCHAR(10) NOT NULL,
    PRIMARY KEY (typeID)
);


DROP TABLE IF EXISTS person;
CREATE TABLE person (
    u_email VARCHAR(60) NOT NULL,
    u_password VARCHAR(140) NOT NULL,
    f_name VARCHAR(45) NOT NULL,
    s_name VARCHAR(45) NOT NULL,
    street_name VARCHAR(45) NOT NULL,
    street_number SMALLINT(3),
    u_type TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (u_email),
    FOREIGN KEY (u_type)
        REFERENCES user_type (typeID)
);

DROP TABLE IF EXISTS product;
CREATE TABLE product (
    productID TINYINT(1) NOT NULL AUTO_INCREMENT,
    description VARCHAR(30),
    price DECIMAL(8 , 2 ) NOT NULL,
    PRIMARY KEY (productID)
);


DROP TABLE IF EXISTS supply;
CREATE TABLE supply (
    supplyID SMALLINT NOT NULL AUTO_INCREMENT,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    customer VARCHAR(60),
    PRIMARY KEY (supplyID),
    FOREIGN KEY (customer)
        REFERENCES person (u_email)
);


-- Lager også pris her, GI BEGRUNNELSE

DROP TABLE IF EXISTS order_line;
CREATE TABLE order_line (
    supplyID SMALLINT NOT NULL,
    productID TINYINT(1) NOT NULL,
    quantity TINYINT(2) NOT NULL,
    price DECIMAL(8 , 2 ),
    PRIMARY KEY (supplyID , productID),
    FOREIGN KEY (productID)
        REFERENCES product (productID),
    FOREIGN KEY (supplyID)
        REFERENCES supply (supplyID)
);


DROP TABLE IF EXISTS price_log;
CREATE TABLE price_log (
    productID TINYINT(1) NOT NULL,
    updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    price DECIMAL(8 , 2 ),
    PRIMARY KEY (productID , updated),
    FOREIGN KEY (productID)
        REFERENCES product (productID)
);


















