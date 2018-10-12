/*
GENERATE DATABASE
--
This script will generate the database and
set the default character set.
*/

-- Init. var for DB name:
SET @dbnm:='søppel03';

-- Drop DB if it already exists:
DROP DATABASE IF EXISTS @dbnm;

-- Create the database:
CREATE DATABASE @dbnm
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;