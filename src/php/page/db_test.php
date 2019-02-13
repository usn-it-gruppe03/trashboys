<?php

include 'src/php/class/DB.php';

$mysql = DB::mysqli();

if ($mysql->connect_errno === 0)
    echo 'Connection success';