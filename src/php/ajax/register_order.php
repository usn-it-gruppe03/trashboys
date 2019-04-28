<?php

require_once '../class/DB.php';
require_once '../function/global/functions.php';

require '../class/Order.php';
require '../class/Order_Line.php';


$order = new Order();
$orderLine = new Order_Line();
$mailer = new Mailer();
$bool = false;

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// Init. input variable.
$input = file_get_contents('php://input');

// Make the JSON to a PHP array
$orderArr = json_decode($input, true);

// Check if the object is defined, if not define it.
if($order->isDefined()) {

    if($order->commit()) {
        for($i = 0; $i < sizeof($orderArr); $i++) {
            $id = $orderArr[$i]['id'];
            $quantity = $orderArr[$i]['quantity'];

            $orderLine->define($order->getPkID(), $id, $quantity);
            if($orderLine->commit()) {

                $bool = true;
            } else {
                $bool = false;
            }
        }

        if($bool === true) {
            echo 'TRUE';
        } else {
            echo 'FALSE';
        }
    } echo 'FALSE';

} else {
    $uId = $orderArr[0]['user'];
    $order->define($uId);
    if($order->commit()) {
        for($i = 0; $i < sizeof($orderArr); $i++) {
            $id = $orderArr[$i]['id'];
            $quantity = $orderArr[$i]['quantity'];

            $orderLine->define($order->getPkID(), $id, $quantity);
            if($orderLine->commit()) {
                $bool = true;
            } else {
                $bool = false;
            }
        }
        if($bool === true) {
            echo 'TRUE';
        } else {
            echo 'FALSE';
        }
    }else {
        echo 'FALSE';
    }

}



// DEBUGGING
if (is_json($input)){

    echo $input;

} else {

    echo 'Input string is not of JSON type.';

}