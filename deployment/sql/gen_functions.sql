

-- ************************************************* -- 
				-- FUNCTION 1 -- 
-- ************************************************* -- 
-- Displays customer/users full name. 
-- Low complexity function.

USE soppel3;
DELIMITER ::
DROP FUNCTION IF EXISTS full_name::
CREATE FUNCTION full_name(
	p_fname 	VARCHAR(50),
    p_sname 	VARCHAR(50)

)
RETURNS VARCHAR(100)
deterministic

BEGIN
	RETURN CONCAT(p_fname, ' ', p_sname);
END ::
DELIMITER ;


-- CALLS FUNCTION full_name()
USE soppel3;
SELECT u_email, full_name(f_name, s_name) AS FullName FROM person;




-- ************************************************* -- 
				-- FUNCTION 2 -- 
-- ************************************************* -- 
-- Adds up all rows in order_line that has a certain supplyID
-- Used to sum up entire "orders".

USE soppel3;
DELIMITER ::
DROP FUNCTION IF EXISTS supply_sum::
CREATE FUNCTION supply_sum(
	p_supplyID 	SMALLINT(6)

)
RETURNS DECIMAL(8, 2)
reads sql data

BEGIN
	DECLARE	v_sum DECIMAL(8,2);
    
    SELECT SUM(price) INTO v_sum
    FROM order_line
		WHERE p_supplyID = supplyID;
	RETURN v_sum;
	
END ::
DELIMITER ;


-- CALLS FUNCTION FulltNavn()
USE soppel3;

SELECT supplyID, P.description, quantity, O.price 
FROM order_line AS O, product AS P
WHERE supplyID = 2
AND P.productID = O.productID

UNION ALL

SELECT '', '', 'SUM:', supply_sum(2);





