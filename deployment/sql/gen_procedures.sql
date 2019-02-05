
-- ************************************************* -- 
				-- PROCEDURE 1 -- 
-- ************************************************* -- 

-- Prosedyre 1 - new_user.

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
    
		INSERT INTO `User` (`email` , `first_name`, `last_name`, `password`, `address_ID`)  VALUES 
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

-- ************************************************* -- 
                -- PROCEDURE 1 TEST CALL -- 
-- ************************************************* -- 
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

-- Set notification subscription




USE bk;
DELIMITER ::
DROP PROCEDURE IF EXISTS set_subscription::
CREATE PROCEDURE set_subscription(
    IN p_user_ID INT(11),
    IN p_subscription INT(1),
    
    OUT p_message VARCHAR(150)

)

BEGIN
START TRANSACTION;
    SET @userExists = 0;
    SELECT Count(*) 
    FROM `User` 
    WHERE `ID` = p_user_ID INTO @userExists;

    IF @userExists <> 0 
    AND  p_subscription IN(0, 1) THEN

        UPDATE `User` 
        SET `subscription` = p_subscription
        WHERE `ID` = p_user_ID;

        SELECT CONCAT('Success!') INTO p_message;

    ELSE
        SELECT CONCAT('Error!') INTO p_message;
    END IF;
   

COMMIT;
END ::
DELIMITER ;




-- ************************************************* -- 
                -- PROCEDURE 2 TEST CALL -- 
-- ************************************************* -- 
USE bk;

SET @ID='1';
SET @sub=1;



CALL set_subscription(
            @ID, 
            @sub,
            @svar1);
            
            
Select @svar1;















































