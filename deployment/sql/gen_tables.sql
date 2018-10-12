-- Use DB:
USE soppel3;

-- Set foreign key checks:
SET FOREIGN_KEY_CHECKS = 0;

-- Oppretter første "cluster" med tabeller.
-- Disse tabellene håndterer kun rutene.

DROP TABLE IF EXISTS route;
CREATE TABLE route (
    
    routeID             TINYINT         UNSIGNED NOT NULL AUTO_INCREMENT,
    weekday             VARCHAR(10)     NOT NULL,
    dayname             VARCHAR(10),
    
    CONSTRAINT route_PK PRIMARY KEY (routeID)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;




DROP TABLE IF EXISTS street;
CREATE TABLE street (
    
    name                VARCHAR(60)     NOT NULL,
    routeID             TINYINT         UNSIGNED NOT NULL,
    
    CONSTRAINT street_PK PRIMARY KEY (name),
    CONSTRAINT street_routeID_FK FOREIGN KEY (routeID)
        REFERENCES route (routeID)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;




DROP TABLE IF EXISTS waste;
CREATE TABLE waste (
    
    category VARCHAR(60),
    
    CONSTRAINT waste_PK PRIMARY KEY (category)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;



DROP TABLE IF EXISTS collection;
CREATE TABLE collection (
    
    category            VARCHAR(60),
    routeID             TINYINT         UNSIGNED NOT NULL,
    collection_date     DATE            DEFAULT '2018-10-11',
    
    CONSTRAINT collection_PK PRIMARY KEY (category , routeID , collection_date),
    CONSTRAINT collection_waste_category_FK FOREIGN KEY (category)
        REFERENCES waste (category),
    CONSTRAINT collection_routeID_FK FOREIGN KEY (routeID)
        REFERENCES route (routeID)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;




-- Oppretter andre "cluster" med tabeller
-- Disse håndterer innlogg/brukere, bestilling av varer osv.

DROP TABLE IF EXISTS user_type;
CREATE TABLE user_type (
    
    typeID              TINYINT(1)      NOT NULL CHECK (typeID IN (0 , 1)),
    description         VARCHAR(10)     NOT NULL,
    
    CONSTRAINT user_type_PK PRIMARY KEY (typeID)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;




DROP TABLE IF EXISTS person;
CREATE TABLE person (
    
    u_email             VARCHAR(60)     NOT NULL,
    u_password          VARCHAR(140)    NOT NULL,
    f_name              VARCHAR(45)     NOT NULL,
    s_name              VARCHAR(45)     NOT NULL,
    street_name         VARCHAR(45)     NOT NULL,
    street_number       SMALLINT(3),
    u_type              TINYINT(1)      NOT NULL DEFAULT 0,
    
    CONSTRAINT person_PK PRIMARY KEY (u_email),
    CONSTRAINT person_typeID_FK FOREIGN KEY (u_type)
        REFERENCES user_type (typeID)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;




DROP TABLE IF EXISTS product;
CREATE TABLE product (
    
    productID           TINYINT(1)      NOT NULL AUTO_INCREMENT,
    description         VARCHAR(30)     NOT NULL,
    price               DECIMAL(8,2)    NOT NULL,
    
    CONSTRAINT product_PK PRIMARY KEY (productID)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;




DROP TABLE IF EXISTS supply;
CREATE TABLE supply (
    
    supplyID            SMALLINT        NOT NULL AUTO_INCREMENT,
    order_date          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    customer            VARCHAR(60),
    
    CONSTRAINT supply_PK PRIMARY KEY (supplyID),
    CONSTRAINT supply_person_u_email_FK FOREIGN KEY (customer)
        REFERENCES person (u_email)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;




-- Lager også pris her, GI BEGRUNNELSE

DROP TABLE IF EXISTS order_line;
CREATE TABLE order_line (
    
    supplyID            SMALLINT        NOT NULL,
    productID           TINYINT(1)      NOT NULL,
    quantity            TINYINT(2)      NOT NULL,
    price               DECIMAL(8,2),
    
    CONSTRAINT order_line_PK PRIMARY KEY (supplyID , productID),
    CONSTRAINT order_line_productID_FK FOREIGN KEY (productID)
        REFERENCES product (productID),
    CONSTRAINT order_line_supplyID_FK FOREIGN KEY (supplyID)
        REFERENCES supply (supplyID)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;




DROP TABLE IF EXISTS price_log;
CREATE TABLE price_log (
    
    productID           TINYINT(1)      NOT NULL,
    updated             TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    price               DECIMAL(8,2),
    
    CONSTRAINT price_log_PK PRIMARY KEY (productID , updated),
    CONSTRAINT price_log_productID_FK FOREIGN KEY (productID)
        REFERENCES product (productID)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Set foreign key checks:
SET FOREIGN_KEY_CHECKS = 1;