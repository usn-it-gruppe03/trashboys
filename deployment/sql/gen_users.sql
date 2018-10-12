-- Alternativ måte og tildele brukere rettigheter blir merket med (Alternativ)
-- Create role: 'admin'
CREATE ROLE 'admin';
--
CREATE USER 'Nataniel'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin123';
--
grant insert on person to 'admin';
grant update on person to 'admin';
grant select on person to 'admin';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.person TO 'Nataniel'@'localhost';
--
grant insert on user_type to 'admin';
grant update on user_type to 'admin';
grant select on user_type to 'admin';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.user_type TO 'Nataniel'@'localhost';
--
grant insert on supply to 'admin';
grant update on supply to 'admin';
grant select on supply to 'admin';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.supply TO 'Nataniel'@'localhost';
--
grant insert on order_line to 'admin';
grant update on order_line to 'admin';
grant select on order_line to 'admin';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.order_line TO 'Nataniel'@'localhost';
--
grant insert on product to 'admin';
grant update on product to 'admin';
grant select on product to 'admin';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.product TO 'Nataniel'@'localhost';
--
grant insert on price_log to 'admin';
grant update on price_log to 'admin';
grant select on price_log to 'admin';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.price_log TO 'Nataniel'@'localhost';
--
grant insert on waste to 'admin';
grant update on waste to 'admin';
grant select on waste to 'admin';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.waste TO 'Nataniel'@'localhost';
--
grant insert on collection to 'admin';
grant update on collection to 'admin';
grant select on collection to 'admin';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.collection TO 'Nataniel'@'localhost';
--
grant insert on route to 'admin';
grant update on route to 'admin';
grant select on route to 'admin';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.route TO 'Nataniel'@'localhost';
--
grant insert on street to 'admin';
grant update on street to 'admin';
grant select on street to 'admin';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.street TO 'Nataniel'@'localhost';

-- Create role: 'users'
CREATE ROLE 'users';
--
CREATE USER 'Anders'@'localhost' IDENTIFIED WITH mysql_native_password BY 'bruker123';

-- Med dette så får brukere mulighet til og se informasjon ang hva som blir hentet,
-- når det blir hentet, og hvilken rute gaten deres er på.
grant select on collection to 'users';
grant select on route to 'users';
grant select on street to 'users';
-- (Alternativ)
GRANT SELECT ON trash.collection TO 'Anders'@'localhost';
GRANT SELECT ON trash.route TO 'Anders'@'localhost';
GRANT SELECT ON trash.street TO 'Anders'@'localhost';

-- brukere har mulighet for å oppdatere/sette sin egen informasjon
grant insert on person to 'users';
grant update on person to 'users';
-- (Alternativ)
GRANT INSERT, UPDATE ON trash.person TO 'Anders'@'localhost';
GRANT INSERT, UPDATE ON trash.person TO 'Anders'@'localhost';

-- Brukere kan sette bestillinger, lese, og oppdatere bestillinger.
grant insert on order_line to 'users';
grant update on order_line to 'users';
grant select on order_line to 'users';
-- (Alternativ)
GRANT SELECT, INSERT, UPDATE ON trash.order_line TO 'Anders'@'localhost';

-- Brukere kan se varetabellen
grant select on product to 'users';

-- ********************************************** Oppgave Tekst *******************************************************

-- Besvarelsen skal inneholde et forslag til brukergrupper/roller, og rettigheter til databasetabellene.
-- Dersom det ikke er naturlig med ulike rettigheter til de ulike tabellene i databasen,
-- skal dere som minimum lage en brukergruppe med rettigheter til å registrere og vedlikeholde data i databasen,
-- og en annen gruppe som bare har innsynsrettigheter (leserettigheter) til databasen.

-- SQL-kommandoer for å opprette brukergruppene og gi rettigheter skal samles i et eget SQL-skript.
-- Dette skal også inneholde kommandoer for å opprette én bruker for hver av brukergruppene/rollene.

-- Obs! MySQL/MariaDD støtter ikke roller (ROLE), så dette kan du bare løse "på papir" uten å få testet i databasen.
-- Du kan likevel teste ved å gi rettigheter direkte til brukere i stedet.


GRANT SELECT, INSERT, UPDATE ON trash.person TO 'user'@'localhost';