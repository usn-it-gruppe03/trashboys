<?php
/**
 * Class: DatabaseObject
 *
 * @author Isak Hauge
 * @version 2.5
 *
 * Every extending object shall, in their constructor,
 * initialize the following default values for object attributes:
 *      Integers:    0
 *      Floats:      0
 *      Strings:     '' (string length: 0)
 * The reason for this is to enable an easy way of distinguishing
 * between object states e.g. UNDEFINED, NEW, and EXISTING.
 */
abstract class DatabaseObject {

    /**
     * Object Type constants.
     *
     * UNDEFINED:   An incomplete object whose attributes are not defined.
     * NEW:         A complete object that does not exist in the database.
     * EXISTING:    A complete, fetched object that does exist in the database.
     */
    const UNDEFINED = 0;
    const NEW = 1;
    const EXISTING = 2;


    /**
     * Object attributes.
     */
    protected $id;
    protected $type;


    /**
     * Fetch.
     *
     * This function shall fetch an entire object from the database.
     *
     * @param int $id
     */
    abstract function fetch(int $id): void;


    /**
     * Commit.
     *
     * This function shall commit and push changes done to the object to the database.
     */
    abstract function commit(): void;


    /**
     * Is defined.
     *
     * This function shall evaluate whether the object is complete or incomplete.
     *
     * @return bool
     */
    abstract function isDefined(): bool;


    /**
     * Clear.
     *
     * This function shall reset/clear all object attributes.
     */
    abstract function clear(): void;


    /**
     * To string.
     *
     * This function shall display all object attributes in a string.
     *
     * @return string
     */
    abstract function toString(): string;


    /**
     * Get ID.
     *
     * This function shall return the ID of the object.
     *
     * @return int
     */
    function getID(): int {
        return $this->id;
    }


    /**
     * Set ID.
     *
     * This function shall set the ID of the object.
     *
     * @param int $id
     */
    function setID(int $id): void {
        $this->id = $id;
    }


    /**
     * Get type.
     *
     * This function shall return the type of the object.
     *
     * @return int
     */
    function getType(): int {
        return $this->type;
    }


    /**
     * Set type.
     *
     * This function shall set the type of the object.
     *
     * @param int $type
     */
    function setType(int $type): void {
        $this->type = $type;
    }


    /**
     * Delete.
     *
     * This function will delete the table row of the corresponding ID.
     * Note: It will automatically determine the table name.
     *
     * @param int $id
     */
    function delete(int $id): void {

        // Get main.
        $class = get_class($this);

        // Init. first part of the SQL code.
        $sql = 'DELETE FROM';

        // Assign the correct table name.
        switch ($class) {
            case 'Address':
                $sql .= ' `Address` ';
                break;
            case 'Order':
                $sql .= ' `Order` ';
                break;
            case 'OrderLine':
                $sql .= ' `Order_Line` ';
                break;
            case 'PriceLog':
                $sql .= ' `Price_Log` ';
                break;
            case 'ProductBox':
                $sql .= ' `ProductBox` ';
                break;
            case 'Route':
                $sql .= ' `Route` ';
                break;
            case 'User':
                $sql .= ' `User` ';
                break;
            case 'UserType':
                $sql .= ' `User_Type` ';
                break;
            case 'WasteCategory':
                $sql .= ' `Waste_Category` ';
                break;
            case 'WasteCollection':
                $sql .= ' `Waste_Collection` ';
                break;
            case 'Weekday':
                $sql .= ' `Weekday` ';
                break;
            default: assert(false, new Error('Delete handler for ' . $class . ' is not defined.'));
        }

        // Append the last part of the SQL code.
        $sql .= 'WHERE `ID` = ' . $id . ';';

        // Init. DB connection.
        $mysql = DB::mysqli();

        // Prepare statement.
        $stmt = $mysql->prepare($sql);

        // ? If Execution was successful.
        if (!$stmt->execute() || $mysql->affected_rows === 0 ) {
            assert(false, new Error('Could not delete ' . $class . '. MySQL Error: ' . $mysql->error . '. '));
            $mysql->close();
        } else $mysql->close();


    }


}
