<?php
/**
 * USE AS INSPIRATION ONLY *
 * CREATE YOUR OWN VARIANT *
 */
class Address extends DatabaseObject {

    /**
     * Object attributes.
     */
    private $name, $houseNumber, $letter, $zip, $postalLocation, $routeFK;


    /**
     * Address constructor.
     */
    public function __construct() {

        // Create default values.
        $this->clear();

    }


    /**
     * Define.
     *
     * This method shall define a new object.
     *
     * @param $name
     * @param $houseNumber
     * @param $letter
     * @param $zip
     * @param $postalLocation
     * @param $routeFK
     */
    public function define($name, $houseNumber, $letter, $zip, $postalLocation, $routeFK) {

        $this->setName($name);
        $this->setHouseNumber($houseNumber);
        $this->setLetter($letter);
        $this->setZIP($zip);
        $this->setPostalLocation($postalLocation);
        $this->setRouteFK($routeFK);

        $this->setType(self::NEW);

    }


    /**
     * Fetch.
     *
     * This function shall fetch an entire object from the database.
     *
     * @param int $id
     */
    function fetch($id): void {

        include 'DB.php';
        $mysql = DB::mysqli();
        $sql = 'SELECT * FROM `Address` WHERE `ID` = ?;';
        $stmt = $mysql->prepare($sql);
        $stmt->bind_param('i',$id);

        // ? If execution is successful.
        if ($stmt->execute()) {

            // Get results from execution.
            $res = $stmt->get_result();

            // ? If there are any results.
            if ($res->num_rows === 1) {

                // Fetch assoc. array.
                $row = $res->fetch_assoc();

                // Define object attributes:
                $this->setID((int) $row['ID']);
                $this->setName((string) $row['name']);
                $this->setHouseNumber((int) $row['house_number']);
                $this->setLetter((string) $row['letter']);
                $this->setZIP((string) $row['zip_code']);
                $this->setPostalLocation((string) $row['postal_location']);
                $this->setRouteFK((int) $row['route_FK']);

                // Set object type.
                $this->setType(self::EXISTING);

            }

        } else {

            // Assert error message.
            assert(false, new Error('Could not fetch Address. MySQL Error: ' . $mysql->error . '. '));

        }

    }


    /**
     * Commit.
     *
     * This function shall commit and push changes done to the object to the database.
     */
    function commit(): void {

        $this->setType(self::UNDEFINED);

        $this->setID(-1);
        $this->setName('');
        $this->setHouseNumber(-1);
        $this->setLetter('');
        $this->setZIP('');
        $this->setPostalLocation('');
        $this->setRouteFK(-1);

    }


    /**
     * Is defined.
     *
     * This function shall evaluate whether the object is complete or incomplete.
     *
     * @return bool
     */
    function isDefined(): bool {

        switch ($this->getType()) {

            case self::UNDEFINED:
                return false;
            case self::NEW:
                return (
                    strlen($this->getName()) > 0 &&
                    $this->getHouseNumber() > 0 &&
                    strlen($this->getLetter()) > 0 &&
                    strlen($this->getZIP()) > 0 &&
                    strlen($this->getPostalLocation()) > 0 &&
                    $this->getRouteFK() > 0
                );
            case self::EXISTING:
                return (
                    $this->getID() > 0 &&
                    strlen($this->getName()) > 0 &&
                    $this->getHouseNumber() > 0 &&
                    strlen($this->getLetter()) > 0 &&
                    strlen($this->getZIP()) > 0 &&
                    strlen($this->getPostalLocation()) > 0 &&
                    $this->getRouteFK() > 0
                );

        }

    }


    /**
     * Clear.
     *
     * This function shall reset/clear all object attributes.
     */
    function clear(): void {

        $this->setType(self::UNDEFINED);

        $this->setID(0);
        $this->setName('');
        $this->setHouseNumber(0);
        $this->setLetter('');
        $this->setZIP('');
        $this->setPostalLocation('');
        $this->setRouteFK(0);

    }


    /**
     * To string.
     *
     * This function shall display all object attributes in a string.
     *
     * @return string
     */
    function toString(): string {

        switch ($this->getType()) {
            case self::UNDEFINED:
                return  'Type: UNDEFINED<br>' .
                    'ID: null<br>' .
                    'Name: null<br>' .
                    'House number: null<br>' .
                    'Letter: null<br>' .
                    'ZIP code: null<br>' .
                    'Postal location: null<br>' .
                    'Route (FK): null<br>';
            case self::NEW:
                return  'Type: NEW<br>' .
                    'ID: AUTO_INCREMENT<br>' .
                    'Name: '. $this->getName() .'<br>' .
                    'House number: '. $this->getHouseNumber() .'<br>' .
                    'Letter: '. $this->getLetter() .'<br>' .
                    'ZIP code: '. $this->getZIP() .'<br>' .
                    'Postal location: '. $this->getPostalLocation() .'<br>' .
                    'Route (FK): '. $this->getRouteFK() .'<br>';
            case self::EXISTING:
                return  'Type: EXISTING<br>' .
                    'ID: '. $this->getID() .'<br>' .
                    'Name: '. $this->getName() .'<br>' .
                    'House number: '. $this->getHouseNumber() .'<br>' .
                    'Letter: '. $this->getLetter() .'<br>' .
                    'ZIP code: '. $this->getZIP() .'<br>' .
                    'Postal location: '. $this->getPostalLocation() .'<br>' .
                    'Route (FK): '. $this->getRouteFK() .'<br>';
        }

    }


    /**
     * @return string
     */
    public function getName(): string {

        return $this->name;

    }


    /**
     * @param string $name
     */
    public function setName(string $name): void {

        $this->name = $name;

    }


    /**
     * @return int
     */
    public function getHouseNumber(): int {

        return $this->houseNumber;

    }


    /**
     * @param int $houseNumber
     */
    public function setHouseNumber(int $houseNumber): void {

        $this->houseNumber = $houseNumber;

    }


    /**
     * @return string
     */
    public function getLetter(): string {

        return $this->letter;

    }


    /**
     * @param string $letter
     */
    public function setLetter(string $letter): void {

        $this->letter = $letter;

    }


    /**
     * @return string
     */
    public function getZIP(): string {

        return $this->zip;

    }


    /**
     * @param string $zip
     */
    public function setZIP(string $zip): void {

        $this->zip = $zip;
    }


    /**
     * @return string
     */
    public function getPostalLocation(): string {

        return $this->postalLocation;

    }


    /**
     * @param string $postalLocation
     */
    public function setPostalLocation(string $postalLocation): void {

        $this->postalLocation = $postalLocation;

    }


    /**
     * @return int
     */
    public function getRouteFK(): int {

        return $this->routeFK;

    }


    /**
     * @param int $routeFK
     */
    public function setRouteFK(int $routeFK): void {

        $this->routeFK = $routeFK;

    }

}