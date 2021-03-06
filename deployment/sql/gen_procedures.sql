
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
    IN p_houseletter VARCHAR(2),
    
    OUT p_message VARCHAR(150)

)

BEGIN
START TRANSACTION;
    
    SET @addressExists = 0;
    SET @userExists = 0;
    SET @address_FK_temp = 0;

    SELECT Count(*) 
    FROM `User`
    WHERE `email` = p_email INTO @userExists;

    SELECT Count(*) 
                FROM `Address` 
                WHERE `name` = p_streetname AND `house_number` = p_streetnumber AND `letter` = p_houseletter INTO @addressExists;
                
    
        
    SELECT `ID` 
    FROM `Address` 
    WHERE `name` = p_streetname AND `house_number` = p_streetnumber AND `letter` = p_houseletter INTO @address_FK_temp;


    IF @userExists > 0 THEN
            SELECT CONCAT('Bruker allerede registrert!') INTO p_message;
    
    ELSEIF (@addressExists  < 1) THEN
            SELECT CONCAT('Adresse eksiterer ikke!') INTO p_message;
    
    ELSEIF (p_email = '') THEN
            SELECT CONCAT('Fyll ut epost!') INTO p_message;
   
    ELSEIF (p_password = '') THEN
            SELECT CONCAT('Fyll ut passord!') INTO p_message;
    
    ELSEIF (p_fname = '') THEN
            SELECT CONCAT('Fyll ut fornavn!') INTO p_message;
   
    ELSEIF (p_sname = '') THEN
            SELECT CONCAT('Fyll ut etternavn!') INTO p_message;
    
    ELSE

        
        
        INSERT INTO `User` (`email` , `first_name`, `last_name`, `password`, `address_ID`)  VALUES 
            (p_email, 
            p_fname, 
            p_sname,
            SHA2(p_password, 512),
            @address_FK_temp
        );
             
        SELECT CONCAT('Bruker opprettet!') INTO p_message;
    END IF;
        
    

    
COMMIT;
END ::
DELIMITER ;

-- ************************************************* -- 
                -- PROCEDURE 1 TEST CALL -- 
-- ************************************************* -- 
USE bk;
SET @email='Andersbaero@gmail.com';
SET @upassword = 'test123321';
SET @fname = 'Tester';
SET @sname= 'Testersen';
SET @streetname='Uvdalvegen';
SET @streetnumber=176;
SET @houseletter = 'B';



CALL new_user(
            @email, 
            @upassword,
            @fname, 
            @sname,
            @streetname, 
            @streetnumber,
            @houseletter,
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



-- ************************************************* -- 
                -- PROCEDURE 3 DELETE USER -- 
-- ************************************************* -- 


USE bk;
DELIMITER ::
DROP PROCEDURE IF EXISTS delete_user::
CREATE PROCEDURE delete_user(
    IN p_email VARCHAR(60),
    IN p_password VARCHAR(140),
    
    OUT p_message VARCHAR(150)

)

BEGIN
START TRANSACTION;
    SET @UserID_TEMP = 0;
    SET @UserPW_TEMP = '';

    SELECT `ID`
    FROM `User`
    WHERE `email` = p_email INTO @UserID_TEMP;

    Select `password`
    FROM `User`
    WHERE @UserID_TEMP = `ID` INTO @UserPW_TEMP;

    IF @UserPW_TEMP = SHA2(p_password, 512) THEN
        DELETE FROM `User`
        WHERE `email` = p_email;
        SELECT CONCAT('Bruker slettet!') INTO p_message;
    ELSE
        SELECT CONCAT('Feil passord!') INTO p_message;
    END IF;

        
        




    

    
COMMIT;
END ::
DELIMITER ;


-- ************************************************* -- 
                -- PROCEDURE 3 TEST CALL -- 
-- ************************************************* -- 
USE bk;

SET @email='Anders@test.com';
SET @upassword = 'testpassord';



CALL delete_user(
            @email, 
            @upassword,
            @svar1);
            
            
Select @svar1;




-- ************************************************* -- 
                -- PROCEDURE 4 edit_user -- 
-- ************************************************* -- 



USE bk;
DELIMITER ::
DROP PROCEDURE IF EXISTS edit_user::
CREATE PROCEDURE edit_user(
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
    SET @userExists = 0;

    SELECT Count(*) 
    FROM `User`
    WHERE `email` = p_email INTO @userExists;

    SELECT Count(*) 
                FROM `Address` 
                WHERE `name` = p_streetname AND `house_number` = p_streetnumber INTO @addressExists;


    IF @userExists > 0 THEN
            SELECT CONCAT('Bruker allerede registrert!') INTO p_message;
    
    ELSEIF (@addressExists < 1) THEN
            SELECT CONCAT('Adresse eksiterer ikke!') INTO p_message;
    
    ELSEIF (p_email = '') THEN
            SELECT CONCAT('Fyll ut epost!') INTO p_message;
   
    ELSEIF (p_password = '') THEN
            SELECT CONCAT('Fyll ut passord!') INTO p_message;
    
    ELSEIF (p_fname = '') THEN
            SELECT CONCAT('Fyll ut fornavn!') INTO p_message;
   
    ELSEIF (p_sname = '') THEN
            SELECT CONCAT('Fyll ut etternavn!') INTO p_message;
    
    ELSE

        SET @address_FK_temp = 0;
        
        SELECT `ID` 
        FROM `Address` 
        WHERE `name` = p_streetname AND `house_number` = p_streetnumber INTO @address_FK_temp;
        
        UPDATE `User`
        SET `email` = p_email,
        SET `first_name` = p_fname, 
        SET `last_name` =  p_sname,
        SET `password` =  SHA2(p_password, 512)
        WHERE 
        
        SELECT CONCAT('Bruker opprettet!') INTO p_message;
    END IF;
        
    

    
COMMIT;
END ::
DELIMITER ;

-- ************************************************* -- 
                -- PROCEDURE 4 TEST CALL -- 
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







---------------------------

SET @routeIDtemp = -1;

select DISTINCT route_ID 
INTO  @routeIDtemp
from `Address`
where `name` = "Uvdalvegen" -- plukk ut brukeradresse eller adressen skrevet inn i forms
AND `house_number` = 176; -- samme her 

select `name`, `date`
from `Waste_Collection` as WC, `Waste_Category` AS WCAT
where route_ID = @routeIDtemp
AND WC.waste_ID = WCAT.ID;






















