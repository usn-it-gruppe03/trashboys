USE soppel3;
DROP TRIGGER IF EXISTS before_price_update;
DELIMITER ::
CREATE TRIGGER before_price_update 
    BEFORE UPDATE ON `Product`
    FOR EACH ROW
    
BEGIN


    INSERT INTO `Price_Log` (`product_ID`, `time`, `new_price`, `old_price`) 
    VALUES (old.productID,CURRENT_TIMESTAMP, new.price, old.price);
    
        
END::
DELIMITER ;


    
-- select * from price_log;

-- update product
-- set price = 23.90
-- WHERE productID = 1;
