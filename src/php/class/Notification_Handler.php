<?php
/**
 * Created by PhpStorm.
 * User: Simon
 */
 require 'Notifications.php';
 require '../mailer/templates/Email_Content.php';
 require 'Mailer.php';

 check_notifications_on_user();

 function check_notifications_on_user() {
    $mailer = new Mailer();
    $mysql = DB::mysqli();
    $sql = "select  U.`email`, CONCAT_WS(' ', U.`first_name`, U.`last_name`) AS Fullname, CONCAT_WS(' ',A.`name`, A.`house_number`, A.`letter`) AS Address, WCAT.`name`as Category
                from Address as A, User as U, Waste_Collection as WC, Waste_Category as WCAT
                where A.`route_ID` = WC.`route_ID`
                AND A.`ID` = U.`address_ID`
                AND WCAT.`ID` = WC.`waste_ID`
                AND WC.`date` = date_add(curdate(), INTERVAL 1 DAY)
                AND U.Subscription = 0
                ORDER BY U.`email`";
    $stmt = $mysql->prepare($sql);
    $notifications = new Notifications();
    if($stmt->execute()) {
        $res = $stmt->get_result();
        if($res->num_rows > 0) {
            while($row = $res->fetch_assoc()) {
                $array = array($row['email']);
                 foreach($array as $email) {
                     $notifications->setName($row['Fullname']);
                     $notifications->setAddress($row['Address']);
                     $notifications->setCatArray($row['Category']);
                     $content = Email_Content::reg_not_email($notifications->getName(), $notifications->getAddress(), $notifications->getCatArray());
                     $mailer->sendMail($content, 2, $email);
                 }

            }


        } else {
            echo 'No rows to fetch!';
        }
    }

 }

