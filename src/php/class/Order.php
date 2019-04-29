<?php
    include_once("DatabaseObject.php");
/**
 * Class for maintaining orders from users
 * @author Ove Simon Wernersson
 * @version 1.0
 */

class Order extends DatabaseObject
{

    protected $pk_ID, $user_ID, $time, $email;

    /**
     * Order constructor.
     */
    public function __construct()
    {
        $this->clear();
    }

    /**
     * @description Method to define variables - No need to define variables in constructor
     * @param $id
     */
    function define($id) {

        $this->setUserID($id);
        $this->setPkID();

        $this->setType(self::NEW);
    }

    /**
     * Fetch.
     *
     * This function shall fetch an entire object from the database.
     *
     * @param int $id
     */
    function fetch(int $id): void
    {
        // TODO: Implement fetch() method.

        $mysql = DB::mysqli();
        $sql = 'SELECT * FROM  `Order` WHERE `ID` = ?;';
        $stmt =  $mysql->prepare($sql);
        $stmt->bind_param('i', $id);

        if($stmt->execute()) {
            $res = $stmt->get_result();

            if($res->num_rows === 1) {

                $row = $res->fetch_assoc();
                $this->setPkID(($row['ID']));
                $this->setUserID($row ['user_ID']);
                $this->setTime($row['time']);

                $this->setType(self::EXISTING);

                $stmt->close();
            } else {
                echo "No rows to fetch!";
            }
        }
        $mysql->close();

    }

    /**
     * Commit.
     *
     * This function shall commit and push changes done to the object to the database.
     */
    function commit(): bool
    {

        $mysql = DB::mysqli();

        if($this->getType() === self::EXISTING) {
            $sql = 'UPDATE `Order` SET `user_ID` = ? WHERE ID = ?;';
            $stmt = $mysql->prepare($sql);
            $uId = $this->getUserID();
            $pkId = $this->getPkID();
            $stmt->bind_param('ii', $uId, $pkId);

            if($stmt->execute()) {

            } else {
                echo 'Could not execute: ' . $stmt->error;
            }
            $stmt->close();
        } elseif ($this->getType() === self::NEW) {
            $sql = "INSERT INTO `Order` (user_ID, `time`) VALUES (?, CURRENT_TIMESTAMP);";
            $stmt = $mysql->prepare($sql);
            $uId = $this->getUserID();
            $stmt->bind_param('i', $uId);

            if($stmt->execute()) {
                $mysql->close();
                return true;

            } else {
                $mysql->close();
                return false;
            }


        }
    }

    /**
     * Is defined.
     *
     * This function shall evaluate whether the object is complete or incomplete.
     *
     * @return bool
     */
    function isDefined(): bool
    {
        if($this->getType() === self::UNDEFINED) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Clear.
     *
     * This function shall reset/clear all object attributes.
     */
    function clear(): void
    {
        $this->setType(self::UNDEFINED);
        $this->setUserID(0);
    }

    /**
     * To string.
     *
     * This function shall display all object attributes in a string.
     *
     * @return string
     */
    function toString(): string
    {
        // TODO: Implement toString() method.
    }

    /**
     * Set primary key ID
     *
     * This function is used to get the max ID and then adding one
     */
    public function setPkID(): void
    {
        $mysql = DB::mysqli();

        $sql = "SELECT MAX(ID+1) AS ID FROM `Order` WHERE user_ID = ?;";

        $stmt = $mysql->prepare($sql);
        $stmt->bind_param('i', $this->user_ID);
        if($stmt->execute()) {
            $res = $stmt->get_result();

            if($res->num_rows > 0)  {
                $row = $res->fetch_assoc();
                $this->pk_ID = $row['ID'];
                $mysql->close();
            }else {
                echo 'No rows to fetch!';
                $mysql->close();
            }
        } else {
            echo 'Could not execute';
        }
        $mysql->close();
    }

    /**
     * @param mixed $user_ID
     */
    public function setUserID($user_ID): void
    {
        $this->user_ID = $user_ID;
    }

    /**
     * @param mixed $time
     */
    public function setTime($time): void
    {
        $this->time = $time;
    }

    /**
     * @return mixed
     */
    public function getTime()
    {
        return $this->time;
    }

    /**
     * @return mixed
     */
    public function getPkID()
    {
        return $this->pk_ID;
    }

    /**
     * @return mixed
     */
    public function getUserID()
    {
        return $this->user_ID;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     *
     */
    public function setEmail(): void
    {
        $mysql = DB::mysqli();
        $sql = "SELECT email FROM `User` WHERE ID = ?;";

        $stmt = $mysql->prepare($sql);
        $uId = $this->getUserID();
        $stmt->bind_param('i', $uId);
        if($stmt->execute()) {
            $res = $stmt->get_result();

            if($res->num_rows === 1)  {
                $row = $res->fetch_assoc();
                $this->email = $row['email'];
                $mysql->close();
            }else {
                echo 'No rows to fetch!';
                $mysql->close();
            }
        } else {
            echo 'Could not execute';
        }


    }









}