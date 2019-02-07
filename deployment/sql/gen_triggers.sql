USE bk;
DROP TRIGGER IF EXISTS before_price_update;
DELIMITER ::
CREATE TRIGGER before_price_update 
    BEFORE UPDATE ON `Product`
    FOR EACH ROW
    
BEGIN


    INSERT INTO `Price_Log` (`product_ID`, `old_price`, `new_price`, `time`) 
    VALUES (old.`ID`, old.price, new.price, current_timestamp());
    
        
END::
DELIMITER ;