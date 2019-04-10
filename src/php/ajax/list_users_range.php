<?php

require_once '../class/DB.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['row_start'], $_GET['row_count'])){

    // Filter input.
    $row_start = filter_var($_GET['row_start'], FILTER_SANITIZE_NUMBER_INT);
    $row_count = filter_var($_GET['row_count'], FILTER_SANITIZE_NUMBER_INT);

    // Instantiate MySQLi object.
    $mysql = DB::mysqli();

    // Init. SQL code.
    $sql_code = 'SELECT U.`ID`, U.`first_name`, U.`last_name`, U.`subscription`, UT.`name` AS `user_type`, ';
    $sql_code .= 'concat(';
    $sql_code .= 'A.`name`, " ", ';
    $sql_code .= 'A.`house_number`, " ", ';
    $sql_code .= 'A.`letter`, " ", ';
    $sql_code .= 'A.`zip_code`, " ", ';
    $sql_code .= 'A.`postal_location`, " "';
    $sql_code .= ') AS `address` ';
    $sql_code .= 'FROM `User` AS U, `User_Type` AS UT, `Address` AS A ';
    $sql_code .= 'WHERE U.`address_ID` = A.`ID` AND U.`user_type_ID` = UT.`ID` ';
    $sql_code .= 'LIMIT '.$row_start.', '.$row_count.';';

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