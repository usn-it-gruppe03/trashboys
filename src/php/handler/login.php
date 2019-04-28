<?php 
session_start();
include_once '../class/User.php';
include_once '../class/RelativeRoot.php';
$user = new User();

if (isset($_POST['submit'])) {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $login = $user->check_login($email, $password);
    if ($login) {
        //Login Success
        if(isset($_POST['remember_me'])) {
            $user->create_cookie();
        }
        header("location:../../../index.php?p=main");
    }else {
        //Login failed
        header("location:../../../index.php?p=login");
    }
}
?>