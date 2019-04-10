<?php 
include_once '../class/User.php';
#include_once '../class/Validate.php';
$user = new User();
if (isset($_POST['submit'])){
    extract($_POST);
    //if ($validation->passed()) {
    $number_letter = $_POST["number"];
    $number_letter = explode(" ", $number_letter);
    $number = $number_letter[0];
    $houseletter = $number_letter[1];

    $register = $user->reg_user($fname, $lname, $street, $number, $houseletter, $pass, $email);

      if ($register) {
          //Registration Success
          header("location:../../../index.php?p=login");
      }else {
          //Registration failed
          header("location:../../../index.php?p=register");
      }
    }
  //}
?>