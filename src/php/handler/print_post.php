<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Print $_POST</title>
</head>
<body>
<?php

if (isset($_POST)){
    echo '<pre>';
    print_r($_POST);
    echo '</pre>';
} else echo '<h1>$_POST is not set.</h1>';

?>
</body>
</html>
