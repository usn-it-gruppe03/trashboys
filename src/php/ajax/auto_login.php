<?php

#require_once '../class/DB.php';
require_once '../class/User.php';

$user = new User();

// Set the response header.
header("Content-type: application/json; charset=utf-8");

// ? If GET value is set.
if (isset($_GET['identifier']) && isset($_GET['securitytoken'])    ){

    // Sanitize input data:
    $identifier     = filter_var($_GET['identifier'], FILTER_SANITIZE_STRING);
    $securitytoken  = filter_var($_GET['securitytoken'], FILTER_SANITIZE_STRING);

    // ? If execution was successful.
    if ($user->check_cookie($identifier, $securitytoken)){
        echo "true";
    }else {
        echo "false";
    }

} else {

    echo 'GET not set.';

}