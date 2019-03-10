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

        case 'db':
            require_once $page . 'db_test.php';
            break;

        case 'main':
            require_once $page . 'main.php';
            break;

        case 'typo':
            require_once $page . 'typo.php';
            break;

        default:
            echo '<h1>Page not defined</h1>';
            break;

    }

} else {

    require_once $page . 'home.php';

}

require_once $dom . 'footer.php';