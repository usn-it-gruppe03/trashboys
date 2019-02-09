<?php

require_once '../class/DB.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['name'])){

    // Instantiate MySQLi object.
    $mysql = DB::mysqli();

    // Init. SQL code.
    $sql_code = 'SELECT DISTINCT `name` FROM `Address` WHERE `name` LIKE "'.$_GET['name'].'%";';

    // Prepare statement.
    $stmt = $mysql->prepare($sql_code);

    // ? If execution was successful.
    if ($stmt->execute()){

        // Get results from execution.
        $res = $stmt->get_result();

        // ? If there are any results found.
        if ($res->num_rows > 0) {

            $row = $res->fetch_all(MYSQLI_ASSOC);
            echo json_encode($row);
            $mysql->close();

        }

    }

} else {

    echo 'GET not set.';

}