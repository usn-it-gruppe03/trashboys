<?php

require_once '../class/DB.php';
require_once '../function/global/functions.php';

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// Init. input variable.
$input = file_get_contents('php://input');

if (is_json($input)){

    echo $input;

} else {

    echo 'Input string is not of JSON type.';

}