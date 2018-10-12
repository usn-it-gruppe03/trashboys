/*
GENERATE DATABASE
--
This script will generate the database and
set the default character set.
*/

-- Drop DB if it already exists:
DROP DATABASE IF EXISTS soppel3;

-- Create the database:
CREATE DATABASE soppel3
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;