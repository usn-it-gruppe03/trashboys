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
    $sql_code = 'SELECT O.`ID`, U.`first_name`, U.`last_name`, O.`time` ';
    $sql_code .= 'FROM `Order` AS O, `User` AS U ';
    $sql_code .= 'WHERE O.`user_ID` = U.`ID` ORDER BY O.`time` ';
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