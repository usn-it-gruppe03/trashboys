USE bk;
DROP TRIGGER IF EXISTS before_price_update;
DELIMITER ::
CREATE TRIGGER before_price_update 
    BEFORE UPDATE ON `Product`
    FOR EACH ROW
    
BEGIN


    INSERT INTO `Price_Log` (`product_ID`, `time`, `new_price`, `old_price`) 
    VALUES (product_ID, CURRENT_TIMESTAMP, new_price, old_price);
    
        
END::
DELIMITER ;

