<?php 
include_once '../class/User.php';
require_once '../class/Mailer.php';
require_once '../mailer/templates/Email_Content.php';
$user = new User();
$mail = new Mailer();
if (isset($_POST['submit'])){
    extract($_POST);
    $number_letter = $_POST["number"];
    $number_letter = explode(" ", $number_letter);
    $number = $number_letter[0];
    $houseletter = $number_letter[1];

    $register = $user->reg_user($fname, $lname, $street, $number, $houseletter, $pass, $email);

      if ($register) {
          $content = Email_Content::reg_user($fname);
          $mail->sendMail($content, 0, $email);
          //Registration Success
          header("location:../../../index.php?p=login");
      }else {
          //Registration failed
          header("location:../../../index.php?p=register");
      }
    }
?>