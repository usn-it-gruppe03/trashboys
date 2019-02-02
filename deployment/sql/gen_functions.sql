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





