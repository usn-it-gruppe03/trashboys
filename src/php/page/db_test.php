<?php

include 'src/php/class/DB.php';

$value = 's';
$mysql = DB::mysqli();
$sql_code = 'SELECT `ID`,`name`,`house_number`,`letter`,`zip_code`,`postal_location` FROM `Address` WHERE `name` LIKE "'.$value.'%";';
$result = $mysql->query($sql_code);

if ($result->num_rows > 0){

    $row = $result->fetch_all(MYSQLI_ASSOC);

    echo 'Search value: '.$value.'<br>';
    echo 'Results: '.sizeof($row).'<br>';
    echo '<pre>';
    print_r($row);
    echo '</pre>';

}