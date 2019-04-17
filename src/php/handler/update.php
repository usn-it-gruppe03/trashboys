<?php
	session_start();
  	include_once '../class/User.php';
	$user = new User();

    if (isset($_POST['submit'])){
        extract($_POST);

        $fname 			= $_POST["fname"];
    	$lname 			= $_POST["lname"];
    	$street 		= $_POST["street"];
        $number_letter  = $_POST["number"];
    	$email 			= $_POST["email"];
        $password       = $_POST["pass"];
        $password_again = $_POST["pass-confirm"];
		$id             = $user->get_sessionId();
        ###############################################
        $number_letter  = explode(" ", $number_letter);
        $number         = $number_letter[0];
        $houseletter    = $number_letter[1];
        if (sizeof($number_letter) === 1) $houseletter = '';
        if (strlen($password_again) === 0) $password_again = "Error";

        $update = $user->update($fname, $lname, $street, $number, $houseletter, $email, $id, $password, $password_again);
	    if ($update) {
	        // Update Success
	       header("location:../../../index.php?p=main");
	    }else {
	        // Update Failed
	    }
    }
  ?>