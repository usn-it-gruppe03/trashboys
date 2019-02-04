<?php
$dom = 'src/php/dom/';
$page = 'src/php/page/';

require_once $dom . 'head.php';
require_once $dom . 'header.php';

if (isset($_GET['p'])) {

    $url = $_GET['p'];

    switch ($url) {

        case 'home':
            require_once $page . 'home.php';
            break;

        case 'login':
            require_once $page . 'login.php';
            break;

        case 'guest':
            require_once $page . 'guest.php';
            break;

        default:
            echo '<h1>Page not defined</h1>';
            break;

    }

} else {

    echo '<h1>Welcome</h1><h2>Enter following GET REST API in URL: ?p=home</h2>';

}

require_once $dom . 'footer.php';