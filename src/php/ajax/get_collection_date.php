<?php

require_once '../class/DB.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['id'])){

    // Sanitize input data:
    $id = filter_var($_GET['id'], FILTER_SANITIZE_NUMBER_INT);

    // Instantiate MySQLi object.
    $mysql = DB::mysqli();

    // Init. SQL queries:
    $sql = 'SELECT WCAT.`name`, WC.`date`, WCAT.`ID` ';
    $sql .= 'FROM `User` AS U, `Address` AS A, `Waste_Collection` AS WC, `Waste_Category` AS WCAT ';
    $sql .= 'WHERE U.`ID` = ? AND U.`address_ID` = A.`ID` AND A.`route_ID` = WC.`route_ID` AND WC.`waste_ID` = WCAT.`ID`;';

    // Prepare statement.
    $stmt = $mysql->prepare($sql);

    // Bind parameter.
    $stmt->bind_param('i',$id);

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