<?php

require_once '../class/DB.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['id'])){

    // Instantiate MySQLi object.
    $mysql = DB::mysqli();

    // Init. SQL code.
    $sql_code = 'SELECT OL.`product_ID`, P.`name`, OL.`quantity`, OL.`price`, (OL.`price` * OL.`quantity`) AS `total` ';
    $sql_code .= 'FROM `Order_Line` AS OL, `Product` AS P ';
    $sql_code .= 'WHERE OL.`product_ID` = P.`ID` AND OL.`order_ID` = ?;';

    // Prepare statement.
    $stmt = $mysql->prepare($sql_code);

    // Bind parameters.
    $stmt->bind_param('i', $_GET['id']);

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