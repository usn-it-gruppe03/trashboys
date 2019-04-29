<?php
/**
 *
 * @author Ove Simon Wernersson
 * @version 1.0
 *
 */
include_once("DatabaseObject.php");


class Order_Line extends DatabaseObject
{

    private $order_ID, $product_ID, $quantity, $price, $productName, $string;

    /**
     * Order_Line constructor.
     */
    public function __construct()
    {
        $this->clear();
    }


    function define($order_ID, $product_ID, $quantity) {

        $this->order_ID = $order_ID;
        $this->product_ID = $product_ID;
        $this->quantity = $quantity;

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
        $mysql = DB::mysqli();

        $sql = "SELECT * FROM Order_Line WHERE ID = ?;";
        $stmt = $mysql->prepare($sql);
        $stmt->bind_param('i', $id);

        if($stmt->execute()) {

            $res = $stmt->get_result();

            if ($res->num_rows != 0) {
                $row = $res->fetch_assoc();

                $this->setOrderID((int)$row['order_ID']);
                $this->setPrice($row['price']);
                $this->setProductID((int)$row['product_ID']);
                $this->setQuantity((int)$row['quantity']);

                $this->setType(self::EXISTING);

            }
        }
        $mysql->close();
    }

    private function getProductInfo(): void {
        $mysql = DB::mysqli();

        $sql = "SELECT * FROM Product WHERE ID = ?;";
        $stmt = $mysql->prepare($sql);
        $pId = $this->getProductID();
        $stmt->bind_param('i', $pId);

        if($stmt->execute()) {
            $res = $stmt->get_result();

            if($res->num_rows === 1) {
                $row = $res->fetch_assoc();

                $this->setProductName($row['name']);
                $this->setPrice($row['price']);
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
        $sql = "";
        if($this->getType() === self::EXISTING) {

        } elseif($this->getType() === self::NEW) {

            $this->getProductInfo();

            $sql .= 'INSERT into Order_Line (order_ID, product_ID, quantity, price) VALUES(?,?,?,?);';
            $stmt = $mysql->prepare($sql);
            $oId = (int)$this->getOrderID();
            $pId = (int)$this->getProductID();
            $q = (int)$this->getQuantity();
            $price = (double)$this->getPrice();
            $stmt->bind_param('iiid', $oId, $pId, $q, $price);

            if($stmt->execute()){
                return true;
            } else {
                return false;
            }
        }
        $mysql->close();

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

    }

    /**
     * Clear.
     *
     * This function shall reset/clear all object attributes.
     */
    function clear(): void
    {
        $this->setOrderID(0);
        $this->setPrice(0);
        $this->setProductID(0);
        $this->setQuantity(0);
        $this->setType(self::UNDEFINED);
    }

    public function orderContent(): string {

    }

    /**
     * To string.
     *
     * This function shall display all object attributes in a string.
     *
     * @return string
     */
    public function toString(): string
    {
        $string = '
                  <tr>
                    <td>'.$this->getProductName().'</td>
                    <td>'.$this->getQuantity().'</td>
                    <td>'.$this->getPrice().'</td>
                    <td>'.$this->getPrice()*$this->getQuantity().'</td>
                  </tr>
                 ';

        return $string;
    }

    public static function productInsert($string) {

    }

    /**
     * @return mixed
     */
    public function getOrderID()
    {
        return $this->order_ID;
    }

    /**
     * @param mixed $order_ID
     */
    public function setOrderID($order_ID): void
    {
        $this->order_ID = $order_ID;
    }

    /**
     * @return mixed
     */
    public function getProductID()
    {
        return $this->product_ID;
    }

    /**
     * @param mixed $product_ID
     */
    public function setProductID($product_ID): void
    {
        $this->product_ID = $product_ID;
    }

    /**
     * @return mixed
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * @param mixed $quantity
     */
    public function setQuantity($quantity): void
    {
        $this->quantity = $quantity;
    }

    /**
     * @return mixed
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @param mixed $price
     */
    public function setPrice($price): void
    {
        $this->price = $price;
    }

    /**
     * @param mixed $productName
     */
    public function setProductName($productName): void
    {
        $this->productName = $productName;
    }

    /**
     * @return mixed
     */
    public function getProductName()
    {
        return $this->productName;
    }

    /**
     * @return mixed
     */
    public function getString()
    {
        return $this->string;
    }

    /**
     * @param mixed $string
     */
    public function setString($string): void
    {
        $this->string = $string;
    }



}