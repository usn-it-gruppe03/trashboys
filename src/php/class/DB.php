<?php

// Import relative root.
require 'RelativeRoot.php';

/**
 * DB Class.
 *
 * This class shall contain useful DB assets.
 *
 * @author Isak Hauge
 * @version 2
 */
class DB {

    /**
     * MySQLi.
     *
     * This function will primarily return a MySQLi object,
     * but if the connection fail, a boolean value will be
     * returned.
     *
     * @return mixed
     */
    public static function mysqli(){

        // Read JSON file with keys.
        $key = file_get_contents(RelativeRoot::getURL().".security/.dbkey");

        // Parse JSON to assoc. array.
        $login = json_decode($key, true);

        // Instantiate mysqli object.
        $conn = new mysqli(

            $login['host'],
            $login['user'],
            $login['pass']

        );

        // ? If DB connection failed.
        if ($conn->connect_errno > 0) {

            $conn->close();
            return false;

            // ? If DB connection was successful.
        } elseif ($conn->connect_errno === 0) {

            $conn->set_charset('utf8mb4');

            // Select DB (returns boolean).
            $hasDB = $conn->select_db('bk');

            if ($hasDB) {

                return $conn;

            } else {

                // TODO: Deploy code.

            }

        }

    }

}