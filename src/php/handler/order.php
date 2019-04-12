<?php if (isset($_POST)){
    echo file_get_contents('php://input');
    print_r($_POST);
    echo 'Post is set';
}