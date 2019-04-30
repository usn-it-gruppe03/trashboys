<?php

require_once '../class/DB.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['id'],$_GET['sub'])){

    // Sanitize input data:
    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);
    $sub = filter_var($_GET['sub'], FILTER_SANITIZE_NUMBER_INT);

    // Instantiate MySQLi object.
    $mysql = DB::mysqli();

    // Init. SQL queries:
    $sql = 'UPDATE `User` ';
    $sql .= 'SET `subscription` = '.$sub.' ';
    $sql .= 'WHERE `ID` = '.$id.';';

    // Prepare statement.
    $stmt = $mysql->prepare($sql);

    // ? If execution was successful.
    if ($stmt->execute()){

        if ($stmt->affected_rows > 0){
            echo 'true';
        } else echo 'false';

    }

} else {

    echo 'GET not set.';

}