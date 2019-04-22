<?php

require_once '../function/global/functions.php';

if (isset($_POST))
    echof($_POST);
else echo '<h1>POST IS NOT SET</h1>';