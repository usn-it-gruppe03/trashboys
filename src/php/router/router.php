<?php

/**
 * Router
 *
 * ! This file must be included in the index.php file.
 *
 * @author Isak K. Hauge
 */

$dom = RelativeRoot::getURL().'src/php/dom/';
$page = RelativeRoot::getURL().'src/php/page/';

require_once $dom . 'head.php';
require_once $dom . 'header.php';
require_once 'src/php/class/User.php';
    
$user = new User();

if (isset($_GET['p'])) {

    $url = $_GET['p'];

    switch ($url) {

        case 'home':
            require_once $page . 'home.php';
            break;

        case 'login':
            require_once $page . 'login.php';
            break;

        case 'register':
            require_once $page . 'register.php';
            break;

        case 'guest':
            require_once $page . 'guest.php';
            break;

        case 'db':
            require_once $page . 'db_test.php';
            break;

        case 'main':
            $user->check_user();
            if ($user->is_checked_in()) {
                if ($user -> is_admin()) {
                    require_once $page . 'admin_dashboard.php';
                }else {
                    require_once $page . 'main.php';
                }
            }else {
                require_once $page . 'access_denied.php';
            }
            break;

        case 'typo':
            require_once $page . 'typo.php';
            break;

        case 'admin_login':
            require_once $page . 'admin_login.php';
            break;

        case 'admin_dashboard':
            require_once $page . 'admin_dashboard.php';
            break;

        default:
            require_once $page . '404.php';
            break;

    }

} else {

    require_once $page . 'home.php';

}

require_once $dom . 'footer.php';