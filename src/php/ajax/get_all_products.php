<?php

require_once '../class/DB.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['products'])){

    // Sanitize input data:
    $query = filter_var($_GET['products'], FILTER_SANITIZE_STRING);

    if ($query == 'all'){

        // Instantiate MySQLi object.
        $mysql = DB::mysqli();

        // Init. SQL queries:
        $sql = 'SELECT P.`ID`, P.`name`, P.`price`, WCAT.`name` AS `category`, P.`waste_category_ID` AS `category_ID` ';
        $sql .= 'FROM `Product` AS P, `Waste_Category` AS WCAT ';
        $sql .= 'WHERE P.`waste_category_ID` = WCAT.`ID`;';

        // Prepare statement.
        $stmt = $mysql->prepare($sql);

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


    }

} else {

    echo 'GET not set.';

}
