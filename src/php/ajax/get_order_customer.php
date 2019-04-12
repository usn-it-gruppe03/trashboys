<?php

require_once '../class/DB.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['id'])){

    // Instantiate MySQLi object.
    $mysql = DB::mysqli();

    // Init. SQL code.
    $sql_code = 'SELECT O.`user_ID`, O.`time`, U.`first_name`, U.`last_name`, concat(';
	$sql_code .= 'A.`name`, " ",';
    $sql_code .= 'A.`house_number`, " ",';
    $sql_code .= 'A.`letter`, " ",';
    $sql_code .= 'A.`zip_code`, " ",';
    $sql_code .= 'A.`postal_location`';
    $sql_code .= ') AS `address` ';
    $sql_code .= 'FROM `Order` AS O, `User` AS U, `Address` AS A ';
    $sql_code .= 'WHERE O.`user_ID` = U.`ID` AND U.`address_ID` = A.`ID` AND O.`ID` = ?;';

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