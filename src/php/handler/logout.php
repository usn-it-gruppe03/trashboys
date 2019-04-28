<?php 
	session_start();
	include_once '../class/User.php';
	header("location:../../../index.php");

	$user = new User();
	$user -> user_logout();
 ?>