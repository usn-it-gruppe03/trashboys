<?php

// Import relative root.
require 'RelativeRoot.php';

/**
 * DB Class.
 *
 * This main shall contain useful DB assets.
 *
 * @author Isak Hauge
 * @version 3
 */
class DB {


    /**
     * Object Attributes
     */
    private $db_key;
    private $connection;




    /**
     * Constructor
     */
    public function __construct() {

        // ? If the key file exist.
        if (is_file(self::get_db_key_url())){

            // Read the content of the database key file.
            $key_file_content = file_get_contents(self::get_db_key_url());


            // ? If the file content is of JSON format.
            if (self::is_json($key_file_content)){

                // Get the DB key file.
                $this->set_db_key(
                    json_decode(
                        file_get_contents(self::get_db_key_url()), true
                    )
                );


                try {

                    // Instantiate mysqli object.
                    $this->connection = new mysqli(
                        $this->get_db_key()['host'],
                        $this->get_db_key()['user'],
                        $this->get_db_key()['pass']
                    );

                    // ? If DB connection failed.
                    if ($this->connection->connect_errno > 0) {

                        // Connection failed.
                        return false;


                    // ? If DB connection was successful.
                    } elseif ($this->connection->connect_errno === 0) {

                        //$conn->set_charset('utf8mb4');

                        // Select DB (returns boolean).
                        $hasSchema = $this->connection->select_db('bk');

                        // ? If database has the defined schema.
                        if ($hasSchema) {

                            // Database has schema.
                            return $this->connection;

                        } else {

                            // TODO: Deploy code.

                        }

                    }

                } catch (mysqli_sql_exception $e) {

                    echo 'ERROR: '.$e->getMessage();

                } catch (\mysql_xdevapi\Exception $e) {

                    echo 'ERROR: '.$e->getMessage();

                }

            }

        } else {

            echo 'ERROR: Database key file not found.';

        }

    }




    /**
     * Get Connection
     */
    public function get_connection() {
        return ($this->is_connected()) ? $this->connection : null;
    }




    /**
     * Is connected
     *
     * @return boolean
     */
    public function is_connected():bool {
        return ($this->connection->ping());
    }




    /**
     * Connect
     */
    public function connect():void {
        if (!$this->is_connected()){
            $this->connection->connect(
                $this->get_db_key()['host'],
                $this->get_db_key()['user'],
                $this->get_db_key()['pass']
            );
        }
    }




    /**
     * MySQLi.
     *
     * This function will primarily return a MySQLi object,
     * but if the connection fail, a boolean value will be
     * returned.
     */
    public static function mysqli() {

        // ? If Database key file exist.
        if (is_file(self::get_db_key_url())){

            // Read JSON file with keys.
            $key_file_content = file_get_contents(self::get_db_key_url());

            // Parse JSON to assoc. array.
            $login_array = json_decode($key_file_content, true);

            try {

                // Instantiate mysqli object.
                $conn = new mysqli(
                    $login_array['host'],
                    $login_array['user'],
                    $login_array['pass']
                );

                // ? If DB connection failed.
                if ($conn->connect_errno > 0) {

                    // Database connection failed.
                    return false;


                // ? If DB connection was successful.
                } elseif ($conn->connect_errno === 0) {

                    // Select DB schema (returns boolean).
                    $hasSchema = $conn->select_db('bk');

                    // ? If database has the defined schema.
                    if ($hasSchema) {

                        // Database has schema.
                        return $conn;

                    } else {

                        // TODO: Deploy SQL code to database.

                    }

                }

            } catch (mysqli_sql_exception $e) {

                echo 'ERROR: '.$e->getMessage();

            } catch (\mysql_xdevapi\Exception $e) {

                echo 'ERROR: '.$e->getMessage();

            }

        }

    }




    /**
     * Getter: Database Key
     *
     * This method will return the database key in the form of an
     * associative array.
     *
     * @return array
     */
    public function get_db_key(): array {

        return $this->db_key;
    }




    /**
     * Setter: Database Key
     *
     * This method will set a new key.
     *
     * @param array $db_key
     */
    public function set_db_key(array $db_key): void {

        $this->db_key = $db_key;
    }




    /**
     * isJSON
     *
     * @param string $value -
     * @return boolean
     */
    public static function is_json(string $value):bool {

        // Test the JSON compatibility.
        json_encode($value);

        // ? Return true if the last JSON job was without error.
        return (json_last_error() === JSON_ERROR_NONE);
    }




    /**
     * Get database key URL
     *
     * @return string
     */
    private static function get_db_key_url(): string {
        return RelativeRoot::getURL().'.security/.dbkey';
    }



}