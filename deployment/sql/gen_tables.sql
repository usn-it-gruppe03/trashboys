-- Init. vars for default characters:
SET @charset:='utf8mb4';
SET @collate:=CONCAT(@charset, '_unicode_ci');




-- Oppretter første "cluster" med tabeller.
-- Disse tabellene håndterer kun rutene.

DROP TABLE IF EXISTS route;
CREATE TABLE route (
    
    id                  TINYINT         UNSIGNED NOT NULL AUTO_INCREMENT,
    weekday             VARCHAR(10)     NOT NULL,
    dayname             VARCHAR(10),
    
    CONSTRAINT route_PK PRIMARY KEY (id)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET @charset COLLATE @collate;




DROP TABLE IF EXISTS street;
CREATE TABLE street (
    
    name                VARCHAR(60)     NOT NULL,
    route_id            TINYINT         UNSIGNED NOT NULL,
    
    CONSTRAINT street_PK PRIMARY KEY (name),
    CONSTRAINT street_route_id_FK FOREIGN KEY (route_id)
        REFERENCES route (id)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET @charset COLLATE @collate;




DROP TABLE IF EXISTS waste;
CREATE TABLE waste (
    
    category VARCHAR(60),
    
    CONSTRAINT waste_PK PRIMARY KEY (category)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET @charset COLLATE @collate;



DROP TABLE IF EXISTS collection;
CREATE TABLE collection (
    
    category            VARCHAR(60),
    route_id            TINYINT         UNSIGNED NOT NULL,
    collection_date     DATE            DEFAULT '2018-10-11',
    
    CONSTRAINT collection_PK PRIMARY KEY (category , route_id , collection_date),
    CONSTRAINT collection_waste_category_FK FOREIGN KEY (category)
        REFERENCES waste (category),
    CONSTRAINT collection_route_id_FK FOREIGN KEY (route_id)
        REFERENCES route (id)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET @charset COLLATE @collate;




-- Oppretter andre "cluster" med tabeller
-- Disse håndterer innlogg/brukere, bestilling av varer osv.

DROP TABLE IF EXISTS user_type;
CREATE TABLE user_type (
    
    id                  TINYINT(1)      NOT NULL CHECK (id IN (0 , 1)),
    description         VARCHAR(10)     NOT NULL,
    
    CONSTRAINT user_type_PK PRIMARY KEY (id)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET @charset COLLATE @collate;




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
    CONSTRAINT person_user_type_id_FK FOREIGN KEY (u_type)
        REFERENCES user_type (id)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET @charset COLLATE @collate;




DROP TABLE IF EXISTS product;
CREATE TABLE product (
    
    id                  TINYINT(1)      NOT NULL AUTO_INCREMENT,
    description         VARCHAR(30)     NOT NULL,
    price               DECIMAL(8,2)    NOT NULL,
    
    CONSTRAINT product_PK PRIMARY KEY (id)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET @charset COLLATE @collate;




DROP TABLE IF EXISTS supply;
CREATE TABLE supply (
    
    id                  SMALLINT        NOT NULL AUTO_INCREMENT,
    order_date          TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    customer            VARCHAR(60),
    
    CONSTRAINT supply_PK PRIMARY KEY (id),
    CONSTRAINT supply_person_u_email_FK FOREIGN KEY (customer)
        REFERENCES person (u_email)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET @charset COLLATE @collate;




-- Lager også pris her, GI BEGRUNNELSE

DROP TABLE IF EXISTS order_line;
CREATE TABLE order_line (
    
    supply_id           SMALLINT        NOT NULL,
    product_id          TINYINT(1)      NOT NULL,
    quantity            TINYINT(2)      NOT NULL,
    price               DECIMAL(8,2),
    
    CONSTRAINT order_line_PK PRIMARY KEY (supply_id , product_id),
    CONSTRAINT order_line_product_id_FK FOREIGN KEY (product_id)
        REFERENCES product (id),
    CONSTRAINT order_line_supply_id_FK FOREIGN KEY (supply_id)
        REFERENCES supply (id)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET @charset COLLATE @collate;




DROP TABLE IF EXISTS price_log;
CREATE TABLE price_log (
    
    product_id          TINYINT(1)      NOT NULL,
    updated             TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    price               DECIMAL(8,2),
    
    CONSTRAINT price_log_PK PRIMARY KEY (product_id , updated),
    CONSTRAINT price_log_product_id_FK FOREIGN KEY (product_id)
        REFERENCES product (id)
    
) ENGINE = InnoDB DEFAULT CHARACTER SET @charset COLLATE @collate;