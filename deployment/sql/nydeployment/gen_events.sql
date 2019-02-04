-- ************************************************* -- 
				-- EVENT 1 -- 
-- ************************************************* -- 
-- Eksempel av bruk:
-- Hver mandag (f.eks 2018-10-8) vil den sette neste dato automatisk
-- Så hver uke oppdaterer den automatisk neste hentedato.

USE bk;
DELIMITER ::
CREATE EVENT update_collection_time 
	ON SCHEDULE EVERY 1 DAY STARTS '2018-10-12 23:58:00' 
	DO BEGIN
	
		UPDATE `Waste_Collection` AS WC, `Route` AS R
		SET `date` = DATE_ADD(`date`, INTERVAL 7 DAY)
			WHERE UPPER(DAYNAME(`date`))=DAYNAME(curdate())
			AND WC.route_ID = R.routeID;
		
	    
	END::

DELIMITER ;
