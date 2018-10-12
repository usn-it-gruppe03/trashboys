USE søppel03;

INSERT INTO route (routeID, weekday, dayname) VALUES
(1, 'Mandag', 'MONDAY'),
(2, 'Tirsdag', 'TUESDAY'),
(3, 'Onsdag', 'WEDNESDAY'),
(4, 'Torsdag', 'THURSDAY'),
(5, 'Fredag', 'FRIDAY');

-- ************************************************************

INSERT INTO street (routeID, street_name) VALUES
	(1, 'Bøgata'),
	(1, 'Underhaugsvegen'),
	(1, 'Haugerudbakken'),
	(1, 'Gullbringvegen'),
	(1, 'Frivollvegen'),
	(1, 'Folkestadvegen'),
	(1, 'Lektorvegen'),
	(1, 'Kleppenvegen'),
	(1, 'Grivivegen'),
	(1, 'Sisjordvegen'),
	(1, 'Stasjonsvegen'),
	(1, 'Møllevegen'),
	(1, 'Framstadvegen'),
	(1, 'Lundevegen'),
	(1, 'Gamleveg'),
	(1, 'Gvarvvegen'),
	(1, 'Ivar Gundersens veg'),
	(1, 'Valenvegen'),
	(1, 'Grivimoen'),
	(1, 'Gåravegen'),
	(1, 'Mannebruvegen'),
	(1, 'Røysumvegen'),
	(1, 'Sperrudvegen'),
	(1, 'Flatinvegen'),
	(1, 'Rallevegen'),
	(1, 'Reshjemvegen'),
	(1, 'Ufsvegen'),
	(1, 'Skjeldbreidvegen'),
	(1, 'Stokklandvegen'),
	(1, 'Roheimvegen'),
	(1, 'Engenevegen'),
	(2, 'Langkåsvegen'),
	(2, 'Oterholt'),
	(2, 'Eikavegen'),
	(2, 'Lifjellvegen'),
	(2, 'Folkestadfeltet'),
	(2, 'Hegnunvegen'),
	(2, 'Vindbekkvegen'),
	(2, 'Ågetveitvegen'),
	(3, 'Breisås'),
	(4, 'Livegen'),
	(4, 'Breskelivegen'),
	(4, 'Rueguto'),
	(4, 'Sønstebøvegen'),
	(4, 'Vreimsida'),
	(4, 'Mastedalsvegen'),
	(4, 'Garvikvegen'),
	(4, 'Espedalsvegen'),
	(4, 'Forbergvegen'),
	(4, 'Bakåsvegen'),
	(4, 'Midtbøvegen'),
	(5, 'Seljordvegen'),
	(5, 'Berglandvegen'),
	(5, 'Nordbøvegen'),
	(5, 'Gregarsveg'),
	(5, 'Kyrkjevegen'),
	(5, 'Rokkemakervegen'),
	(5, 'Stadskleivvegen'),
	(5, 'Roevegen'),
	(5, 'Breskhaugbakken'),
	(5, 'Uvdalsvegen'),
	(5, 'Dagstjønnvegen'),
	(5, 'Tjønnåsvegen');






-- ************************************************************

INSERT INTO waste (category) VALUES
('Våtorganisk avfall'),
('Restavfall'),
('Papp/Papir/Drikkekartong'),
('Plastemballasje'),
('Farlig avfall og små elektronikk');

-- ************************************************************


INSERT INTO collection (category, routeID, collection_date) VALUES
('Våtorganisk avfall', 1, '2018.10.15'),
('Våtorganisk avfall', 2, '2018.10.16'),
('Våtorganisk avfall', 3, '2018.10.17'),
('Våtorganisk avfall', 4, '2018.10.18'),
('Våtorganisk avfall', 5, '2018.10.19'),
('Restavfall', 1, '2018.10.15'),
('Restavfall', 2, '2018.10.16'),
('Restavfall', 3, '2018.10.17'),
('Restavfall', 4, '2018.10.18'),
('Restavfall', 5, '2018.10.19'),
('Papp/Papir/Drikkekartong', 1, '2018.10.15'),
('Papp/Papir/Drikkekartong', 2, '2018.10.16'),
('Papp/Papir/Drikkekartong', 3, '2018.10.17'),
('Papp/Papir/Drikkekartong', 4, '2018.10.18'),
('Papp/Papir/Drikkekartong', 5, '2018.10.19'),
('Plastemballasje', 1, '2018.10.15'),
('Plastemballasje', 2, '2018.10.16'),
('Plastemballasje', 3, '2018.10.17'),
('Plastemballasje', 4, '2018.10.18'),
('Plastemballasje', 5, '2018.10.19'),
('Farlig avfall og små elektronikk', 1, '2018.10.15'),
('Farlig avfall og små elektronikk', 2, '2018.10.16'),
('Farlig avfall og små elektronikk', 3, '2018.10.17'),
('Farlig avfall og små elektronikk', 4, '2018.10.18'),
('Farlig avfall og små elektronikk', 5, '2018.10.19');

-- ************************************************************

INSERT INTO user_type (typeID, description) VALUES
(1, 'Admin'),
(0, 'User');

-- ************************************************************

INSERT INTO person (u_email, u_password, f_name, s_name, street_name, street_number) VALUES
('Donsher90@ezehe.com', sha2('ZtaAaqcqD3yjnLLd', 512), 'Bob', 'Narley', 'Gamleveg', 107),
('jospirupsu@ezehe.com', sha2('v8xPxcuayAEz2cdQ', 512), 'Last', 'Name', 'Breisås', 31),
('nipsadarki@ezehe.com', sha2('HGFxPUZL942vg8xw', 512), 'Bond', 'James', 'Livegen', 90),
('mefyorerde@ezehe.com', sha2('4wq3ana8K8HZvzR8', 512), 'Martin', 'Notluther', 'Rokkemakervegen', 56),
('bispibukna@ezehe.com', sha2('483yfBCgm3XJ2qVT', 512), 'Ron', 'Possible', 'Framstadvegen', 101);




-- ************************************************************


INSERT INTO product (description, price) VALUES
('Pose - Matavfall', 19.90),
('Pose - Plastavfall', 24.90),
('Pose - Restavfall', 24.90),
('Beholder - Plastdunk ', 299.90),
('Pose - Kombipakke', 99.90);

-- ************************************************************


INSERT INTO supply (customer) VALUES
('Donsher90@ezehe.com'),
('nipsadarki@ezehe.com'),
('mefyorerde@ezehe.com'),
('Donsher90@ezehe.com'),
('Donsher90@ezehe.com');

-- ************************************************************


INSERT INTO order_line (supplyID, productID, quantity, price) VALUES
(1, 1, 14, 19.90),
(1, 3, 5, 22.90),
(2, 2, 2, 9.90),
(2, 1, 1, 10.90),
(3, 4, 3, 44.90),
(3, 5, 9, 99.90),
(4, 1, 6, 50.90),
(4, 2, 2, 13.90),
(5, 3, 4, 14.90),
(5, 4, 1, 118.90);




