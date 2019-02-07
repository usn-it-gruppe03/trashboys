<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>DB Connection Test</title>
</head>
<body>

<?php
require 'src/php/class/DB.php';

$mysqli = DB::mysqli();

if ($mysqli->connect_errno === 0) {

    $res = $mysqli->query('SELECT DATABASE() AS `Database`;');
    $row = $res->fetch_assoc();
    $db = $row['Database'];

    $res = $mysqli->query('SELECT USER() AS `User`;');
    $row = $res->fetch_assoc();
    $user = $row['User'];

    echo 'Connection: Success<br>';
    echo 'User: '.$user.'<br>';
    echo 'Database: '.$db.'<br>';
    echo 'MySQL version: '.$mysqli->get_server_info().'<br>';
} else {
    echo 'Connection: Failed<br>';
} ?>

</body>
</html>