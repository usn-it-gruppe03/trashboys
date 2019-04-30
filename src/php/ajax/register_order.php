<?php
session_start();

require_once '../class/DB.php';
require_once '../function/global/functions.php';

include_once '../class/Mailer.php';
include_once '../class/User.php';
require '../class/Order.php';
require '../class/Order_Line.php';
require '../mailer/templates/Email_Content.php';


$order = new Order();
$orderLine = new Order_Line();
$mailer = new Mailer();
$bool = false;
$orderContent = (string)'';

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
            echo 'TRUE:'.$order->getPkID();
            $emailContent = Mailer::order_email_content($orderContent);
            $mailer->sendMail($emailContent, 1, 'ovesimonwernersson@gmail.com' );
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
                $orderContent .= $orderLine->toString();
                $bool = true;
            } else {
                $bool = false;
            }
        }
        if($bool === true) {
            echo 'TRUE;'.$order->getPkID();
            $email = User::get_email();
            $fullName = User::get_full_name();
            $emailContent = Email_Content::reg_order_email($orderContent, $fullName, $order->getPkID(), User::get_full_address(), date("d/m-Y"));
            $mailer->sendMail($emailContent, 1, $email);

        } else {
            echo 'FALSE';
        }
    }else {
        echo 'FALSE';
    }

}