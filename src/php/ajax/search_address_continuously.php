<?php

require_once '../class/DB.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['name'], $_GET['row_start'], $_GET['row_count'])){

    // Instantiate MySQLi object.
    $mysql = DB::mysqli();

    // Sanitize input value.
    $name = filter_var($_GET['name'], FILTER_SANITIZE_STRING);
    $row_start = filter_var($_GET['row_start'], FILTER_SANITIZE_NUMBER_INT);
    $row_count = filter_var($_GET['row_count'], FILTER_SANITIZE_NUMBER_INT);

    // Init. SQL code.
    $sql_code = 'SELECT `ID`, `name`, `house_number`, `letter`, `zip_code`, `postal_location` FROM `Address` WHERE `name` LIKE "'.$name.'%" LIMIT '.$row_start.','.$row_count.';';

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