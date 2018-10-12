USE soppel3;
DROP TRIGGER IF EXISTS before_price_update;
DELIMITER ::
CREATE TRIGGER before_price_update 
    BEFORE UPDATE ON product
    FOR EACH ROW
    
BEGIN


    INSERT INTO price_log (productID, updated, price) 
    VALUES (old.productID,CURRENT_TIMESTAMP, old.price);
    
        
END::
DELIMITER ;


    
-- select * from price_log;

-- update product
-- set price = 23.90
-- WHERE productID = 1;
