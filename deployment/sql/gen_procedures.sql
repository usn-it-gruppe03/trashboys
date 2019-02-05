
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
    
		SELECT `ID` 
		FROM `Address` 
        WHERE name = p_streetname AND house_number = p_streetnumber INTO @address_FK_temp;
    
		INSERT INTO `User` (`email` , `first_name`, `last_name`, `password`, `address_FK`)  VALUES 
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

