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
    $sql = 'SELECT CONCAT(A.`name`, " ", A.`house_number`, " ", A.`letter`) AS `address`, CONCAT(A.`zip_code`, " ", A.`postal_location`) AS `area`, WCAT.`ID`, WCAT.`name`, WC.`date`, R.`ID` AS `route_number`, R.`no_nn` AS `route_day` ';
    $sql .= 'FROM `Address` AS A, `Waste_Collection` AS WC, `Waste_Category` AS WCAT, `Route` AS R ';
    $sql .= 'WHERE A.`ID` = ? AND A.`route_ID` = WC.`route_ID` AND WC.`waste_ID` = WCAT.`ID` AND WC.`route_ID` = R.`ID`;';

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
