-- ************************************************* -- 
				-- FUNCTION 1 -- 
-- ************************************************* -- 
-- Adds up all rows in order_line that has a certain supplyID
-- Used to sum up entire "orders".

USE bk;
DELIMITER ::
DROP FUNCTION IF EXISTS supply_sum::
CREATE FUNCTION supply_sum(
	p_supplyID 	INT(11)

)
RETURNS DECIMAL(8, 2)
READS SQL DATA

BEGIN
	DECLARE	v_sum DECIMAL(8,2);
    
    SELECT SUM(price) INTO v_sum
    FROM Order_Line
		WHERE p_supplyID = order_ID;
	RETURN v_sum;
	
END ::
DELIMITER ;


-- ---------------------------------------------------------
USE bk;

SELECT supplyID, P.description, quantity, O.price 
FROM order_line AS O, product AS P
WHERE supplyID = 2
AND P.productID = O.productID

UNION ALL

SELECT 'TOTALSUM:', '', '', supply_sum(2);