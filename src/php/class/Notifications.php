<?php
/**
 * Created by PhpStorm.
 * User: Simon
 */
require_once 'DB.php';

class Notifications
{
    private $email, $name, $waste_category, $address;
    private $cat_array = array();

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email): void
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name): void
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getWasteCategory()
    {
        return $this->waste_category;
    }

    /**
     * @param mixed $waste_category
     */
    public function setWasteCategory($waste_category): void
    {
        $this->waste_category = $waste_category;
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     */
    public function setAddress($address): void
    {
        $this->address = $address;
    }

    /**
     * @return mixed
     */
    public function getCatArray()
    {
        return $this->cat_array;
    }

    /**
     * @param mixed $cat_array
     */
    public function setCatArray($cat_array): void
    {
        $this->cat_array = $cat_array;
    }


}


