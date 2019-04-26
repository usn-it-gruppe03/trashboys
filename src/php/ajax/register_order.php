<?php

require_once '../class/DB.php';
require_once '../function/global/functions.php';

include_once '../class/Order.php';
include '../class/Order_Line.php';
include_once '../class/User.php';

$order = new Order();
$user = new User();
$orderLine = new Order_Line();

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// Init. input variable.
$input = file_get_contents('php://input');

// Make the JSON to a PHP array
$orderArr = json_decode($input, true);

$string = '';


if($order->isDefined()) {
    for($i = 0; $i < sizeof($orderArr); $i++) {
        $id = $orderArr[$i]['id'];
        $quantity = $orderArr[$i]['quantity'];

        //$orderLine->define($order->getPkID(), $id, $quantity);
        //$orderLine->commit();

        $string .= 'ID: ' . $id . ' Quantity: ' . $quantity . PHP_EOL;
        file_put_contents('../test.txt', $string);
    }
} else {
    $order->define($user->get_sessionId());
    $order->commit();

    for($i = 0; $i < sizeof($orderArr); $i++) {
        $id = $orderArr[$i]['id'];
        $quantity = $orderArr[$i]['quantity'];

        //$orderLine->define($order->getPkID(), $id, $quantity);
        //$orderLine->commit();
        $string .= 'ID: ' . $id . ' Quantity: ' . $quantity . PHP_EOL;
        file_put_contents('../test.txt', $string);
    }
}



// DEBUGGING
if (is_json($input)){

    echo $input;

} else {

    echo 'Input string is not of JSON type.';

}