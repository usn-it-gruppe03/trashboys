<?php

header("Content-type: application/json; charset=utf-8");

require_once '../class/DB.php';

if (isset($_GET['value'])){

    $value = $_GET['value'];
    $mysql = DB::mysqli();
    $sql_code = 'SELECT `ID`,`name`,`house_number`,`letter`,`zip_code`,`postal_location` FROM `Address` WHERE `name` LIKE "'.$value.'%";';
    $res = $mysql->query($sql_code);

    if ($res->num_rows > 0) {

        $string = '';
        $row = $res->fetch_all(MYSQLI_ASSOC);
        echo utf8_encode(json_encode($row));

    }

} else {
    echo 'GET not set.';
}