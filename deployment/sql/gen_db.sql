/*
GENERATE DATABASE
--
This script will generate the database and
set the default character set.
*/

-- Drop DB if it already exists:
DROP DATABASE IF EXISTS `bk`;

-- Create the database:
CREATE DATABASE `bk`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;