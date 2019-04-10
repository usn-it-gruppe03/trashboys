<?php

require_once '../class/DB.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['route'])){

    // ? If GET value is correct.
    if ($_GET['route'] == 'all'){

        // Instantiate MySQLi object.
        $mysql = DB::mysqli();

        // Init. SQL code.
        $sql_code = 'SELECT `ID`, `no_nn` ';
        $sql_code .= 'FROM `Route` ';
        $sql_code .= 'ORDER BY `ID`;';

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

        echo 'Wrong parameters.';

    }

} else {

    echo 'GET not set.';

}