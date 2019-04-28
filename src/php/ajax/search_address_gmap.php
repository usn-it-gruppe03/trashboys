<?php

require_once '../class/DB.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['name'], $_GET['number'])){

    // Sanitize input data:
    $name = filter_var($_GET['name'], FILTER_SANITIZE_STRING);
    $number = filter_var($_GET['number'], FILTER_SANITIZE_NUMBER_INT);

    // Instantiate MySQLi object.
    $mysql = DB::mysqli();

    // Init. SQL queries:
    $sql = 'SELECT * ';
    $sql .= 'FROM `Address` AS A ';

    // ? If letter parameter is defined.
    if (isset($_GET['letter'])){

        // Init. letter variable.
        $letter = $_GET['letter'];

        // Append logic where letter is included.
        $sql .= 'WHERE A.`name` = ? AND A.`house_number` = ? AND A.`letter` = ?;';

        // Prepare statement.
        $stmt = $mysql->prepare($sql);

        // Bind parameter.
        $stmt->bind_param('sis',$name,$number,$letter);

    } else {

        // Append logic where letter is not included.
        $sql .= 'WHERE A.`name` = ? AND A.`house_number` = ?;';

        // Prepare statement.$_GET['letter'])
        $stmt = $mysql->prepare($sql);

        // Bind parameter.
        $stmt->bind_param('si',$name, $number);

    }

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