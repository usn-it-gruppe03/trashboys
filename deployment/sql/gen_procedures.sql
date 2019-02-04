
-- ************************************************* -- 
				-- PROCEDURE 1 -- 
-- ************************************************* -- 

-- Prosedyre 1 - new_user.
-- Lagret prosedyre for å sette inn 1 rad i minst 1 tabell i databasen.
-- Oppretter ny bruker. 
USE bk;
DELIMITER ::
DROP PROCEDURE IF EXISTS new_user::
CREATE PROCEDURE new_user(
	IN p_email VARCHAR(60),
    IN p_password VARCHAR(140),
    IN p_fname VARCHAR(45),
    IN p_sname VARCHAR(45),
    IN p_streetname VARCHAR(80),
    IN p_streetnumber INT,
    
    OUT p_message VARCHAR(150)

)

BEGIN
START TRANSACTION;
	SET @addressExists = 0;
    SELECT Count(*) 
				FROM Address 
                WHERE name = p_streetname AND house_number = p_streetnumber INTO @addressExists;
    
    IF @addressExists <> 0 
	AND		p_email <> ''
	AND		p_password <> ''
    AND		p_fname <> ''
    AND 	p_sname <> '' THEN
		SET @address_FK_temp = 0;
    
		SELECT ID 
		FROM Address 
        WHERE name = p_streetname AND house_number = p_streetnumber INTO @address_FK_temp;
    
		INSERT INTO `User` (email , first_name, last_name, password, address_FK)  VALUES 
			(p_email, 
			p_fname, 
            p_sname,
            SHA2(p_password, 512),
            @address_FK_temp
			
		);
         
         SELECT CONCAT('Bruker opprettet!') INTO p_message;
            
	ELSE
		SELECT CONCAT('Ugyldig inndata! ') INTO p_message;
	END IF;
    

COMMIT;
END ::
DELIMITER ;

-- Kaller prosedyren
USE bk;

SET @email='Test@test.com';
SET @upassword = 'test123321';
SET @fname = 'Tester';
SET @sname= 'Testersen';
SET @streetname='Krintovegen';
SET @streetnumber=66;



CALL new_user(
			@email, 
            @upassword,
            @fname, 
            @sname,
            @streetname, 
            @streetnumber,
            @svar1);
            
            
Select @svar1;


-- Bekreft at bruker er lagt inn:
-- select * from person;






-- ************************************************* -- 
				-- PROCEDURE 2 -- 
-- ************************************************* -- 

-- Prosedyre 2 - delete_prod.
-- Prosedyre som sletter 1 rad i minst 1 tabell.

USE soppel3;
DELIMITER ::
DROP PROCEDURE IF EXISTS delete_prod::
CREATE PROCEDURE delete_prod(
    IN p_productID TINYINT(1),
    OUT p_message VARCHAR(150)

)

BEGIN
DECLARE v_ant INT;


START TRANSACTION;
	
    SELECT COUNT(*) INTO v_ant FROM product WHERE productID = p_productID;
    
	IF	 (p_productID > 0 && v_ant > 0) THEN
		
        
        DELETE FROM product 
			WHERE productID = p_productID;

    
		
         
         SELECT CONCAT('Produkt slettet!') INTO p_message;
            
	ELSE
		SELECT CONCAT('Ugyldig inndata! ') INTO p_message;
	END IF;
    

COMMIT;

END ::
DELIMITER ;


-- Setter inn en rad som kan slettes. 
insert into product (description, price) VALUES
('TestProdukt', 69.69);

-- Kaller prosedyren
USE soppel3;

SET @product=6;



CALL delete_prod(@product, @svar1);
                        
Select @svar1;


-- select * from product;



-- ************************************************* -- 
				-- PROCEDURE 3 -- 
-- ************************************************* -- 

-- Prosedyre 3 - alter_category.
-- Lagret prosedyre som setter inn/oppdaterer data i minst 2 tabeller
-- ved hjelp av en transaksjon.
USE soppel3;
DELIMITER ::
DROP PROCEDURE IF EXISTS alter_category::
CREATE PROCEDURE alter_category(
	IN p_oldName VARCHAR(60),
    IN p_newName VARCHAR(60),
    OUT p_melding VARCHAR(150)

)

BEGIN
DECLARE v_ant INT;

START TRANSACTION;
SET FOREIGN_KEY_CHECKS=0;
	

   	
   	SELECT COUNT(*) INTO v_ant FROM waste where category = p_oldName;

	IF (p_oldName <> '' AND v_ant > 0) THEN
    
		UPDATE collection 
			SET category = p_newName
            WHERE category = p_oldName;
            
		UPDATE waste 
			SET category = p_newName
            WHERE category = p_oldName;
         
         SELECT CONCAT('Endring vellykket!') INTO p_melding;
            
	ELSE
		SELECT CONCAT('Ugyldig inndata! ') INTO p_melding;
	END IF;
    
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

END ::
DELIMITER ;


-- Kaller prosedyren
USE soppel3;
SET @gammeltNavn='Våtorganisk avfall';
SET @nyttNavn='Båtorganisk avfall';
CALL alter_category(@gammeltNavn, @nyttNavn, @svar1);
Select @svar1;

-- Testspørringer for å se resultatet
-- select * from waste;
-- select * from collection;