<?php
	require "DB.php";

	class User {
		protected $mysqli;
		private $id;
		/*Variable for users name*/
		private $full_name;
		private $first_name;
		private $last_name;
		private $email;
		/*Variables for user address*/
		private $address_ID;
		private $street_name;
		private $house_number;
		private $house_letter;
		private $full_address;
		private $zip_code;
		private $postal_location;

		public function __construct(){
			$this->mysqli = DB::mysqli();
		}
/*============================================================================================================================================================================*/
		/*** for registration process ***/
		public function reg_user($firstname, $lastname, $streetname, $streetnumber, $houseletter, $password, $email){
			$sql 			= "SELECT ID FROM `User` WHERE email=?";
			$initialStmt 	= $this->mysqli->prepare($sql);
			$salt 			= "AfghsdfDFjhkl54w21FGn2gf65bdfzdf";
			$password 		.= $salt;

			if ($initialStmt &&
				$initialStmt -> bind_param('s', $email) &&
				$initialStmt -> execute() &&
				$initialStmt -> store_result() &&
				$initialStmt -> bind_result($id)) {

			 	$initialStmt -> fetch();

				if ($id == 0) {

					$connect = $this->mysqli;
					//bind the value of the 1st IN parameter to the session variable @id
					$stmt = $connect->prepare("SET @email = ?");
					$stmt->bind_param('s', $email);
					$stmt->execute();
					// bind the value of the 2nd IN parameter to the session variable @id
					$stmt = $connect->prepare("SET @password = ?");
					$stmt->bind_param('s', $password);
					$stmt->execute();
					// bind the value of the 3rd IN parameter to the session variable @id
					$stmt = $connect->prepare("SET @firstname = ?");
					$stmt->bind_param('s', $firstname);
					$stmt->execute();
					// bind the value of the 4th IN parameter to the session variable @id
					$stmt = $connect->prepare("SET @lastname = ?");
					$stmt->bind_param('s', $lastname);
					$stmt->execute();
					// bind the value of the 5th IN parameter to the session variable @id
					$stmt = $connect->prepare("SET @streetname = ?");
					$stmt->bind_param('s', $streetname);
					$stmt->execute();
					// bind the value of the 6th IN parameter to the session variable @id
					$stmt = $connect->prepare("SET @streetnumber = ?");
					$stmt->bind_param('s', $streetnumber);
					$stmt->execute();
					// bind the value of the 7th IN parameter to the session variable @id
					$stmt = $connect->prepare("SET @houseletter = ?");
					$stmt->bind_param('s', $houseletter);
					$stmt->execute();

					// execute the stored Procedure
					$result = $connect->query('call new_user(@email, @password, @firstname, @lastname, @streetname, @streetnumber, @houseletter, @svar1)');
					
					// getting the value of the OUT parameter
					$r = $connect->query('SELECT @svar1 as getOut');
					$row = $r->fetch_assoc();

					#echo $row['getOut'];
		            return true;
		        }else {
		        	echo "Failure string";
					return false;
				}

			}else {
				echo 'Prepared Statement Error';
			}
		}
/*============================================================================================================================================================================*/		
	/*** for login process ***/
    public function check_login($email, $password){
    	$salt 		= "AfghsdfDFjhkl54w21FGn2gf65bdfzdf";
    	$saltedPw 	= $password . $salt;
        $password 	= hash('sha512', $saltedPw);
        $password 	= hash('sha512', $password);
		$sql 		= 'SELECT ID FROM `User` WHERE email=? AND password=?';

		$stmt = $this->mysqli->prepare($sql);

		if ($stmt &&
			$stmt -> bind_param('ss', $email, $password) &&
			$stmt -> execute() &&
			$stmt -> store_result() &&
			$stmt -> bind_result($id)) {

		 	$stmt -> fetch();

			$sqlCheck 	= "SELECT ID FROM `User` WHERE ID = '$id'"; 
			$result 	= $this->mysqli->query($sqlCheck) or die($this->mysqli->error);

			$sqlCheck2 	= "SELECT ID, first_name, last_name, email, address_ID FROM `User` WHERE ID = '$id'";
			$result2 	= $this->mysqli->query($sqlCheck2) or die($this->mysqli->error);
			$rowId 		= $result2->fetch_assoc();

			#echo $rowId["ID"];
			$this->id 			= $rowId["ID"];
			$this->first_name 	= $rowId["first_name"];
			$this->last_name 	= $rowId["last_name"];
			$this->email 		= $rowId["email"];
			$this->full_name 	= $rowId["first_name"] . " " . $rowId["last_name"];
			$this->address_ID 	= $rowId["address_ID"]; #Use this for finding the users address.
			#echo $this->id;

			$sqlCheck3 	= "SELECT `name`, house_number, letter, zip_code, postal_location FROM `Address` WHERE ID = '$this->address_ID'";
			$result3 	= $this->mysqli->query($sqlCheck3) or die($this->mysqli->error);
			$rowId3 	= $result3->fetch_assoc();

			$this->street_name 		= $rowId3["name"];
			$this->street_number 	= $rowId3["house_number"];
			$this->house_letter 	= $rowId3["letter"];
			$this->full_address 	= $rowId3["name"] . " " . $rowId3["house_number"] . " " . $rowId3["letter"];
			$this->zip_code 		= $rowId3["zip_code"];
			$this->postal_location 	= $rowId3["postal_location"];

			$user_data = $result->fetch_assoc();
			$count_row = $result->num_rows;

			if ($count_row == 1) {
	            $_SESSION['login'] = true; 
	            $_SESSION['id'] 			= $this->id;
	            $_SESSION['full_name'] 		= $this->full_name;
	            $_SESSION['full_address'] 	= $this->full_address;
            #######################################################
	            $_SESSION['first_name'] 	= $this->first_name;
	            $_SESSION['last_name'] 		= $this->last_name;
	            $_SESSION['email'] 			= $this->email;
	            $_SESSION['street_name'] 	= $this->street_name;
	            $_SESSION['street_number'] 	= $this->street_number;
	            $_SESSION['house_letter'] 	= $this->house_letter;
	            $_SESSION['zip_code']	 	= $this->zip_code;
	            $_SESSION['postal_location']= $this->postal_location;
	            return true;
	        }else {
				return false;
			}
		}else {
			echo 'Prepared Statement Error';
		}
	}
/*============================================================================================================================================================================*/
	public function update($fname, $lname, $street, $number, $houseletter, $email, $id, $password, $password_again) {

		$sql_address_id 	= "SELECT `ID` FROM `Address` WHERE `name` = ? AND `house_number` = ? AND `letter` = ?;";
		$initialStmt 		= $this->mysqli->prepare($sql_address_id);
		$salt 				= "AfghsdfDFjhkl54w21FGn2gf65bdfzdf";
    	$salted_pw 			= $password . $salt;
        $password 			= hash('sha512', $salted_pw);
        ##################################################################################################################################
        $salted_pw_again	= $password_again . $salt;
        $password_again 	= hash('sha512', $salted_pw_again);

		#If user updates password &&/|| user details, this will run.
		if ($initialStmt 													  &&
			strlen($password) >= 8 											  &&
			$password === $password_again 									  &&
			$initialStmt -> bind_param('sss', $street, $number, $houseletter) &&
			$initialStmt -> execute() 										  &&
			$initialStmt -> store_result() 									  &&
			$initialStmt -> bind_result($address_id)) {
		##################################################################################################################################	
		 	$initialStmt -> fetch();

			$query 		= "UPDATE `User` SET first_name = ?, last_name = ?, password = ?, email = ?, address_ID = '$address_id' WHERE ID = ?;";
			$password 	= hash('sha512', $password);
			$stmt1 = $this->mysqli->prepare($query);
			$stmt1->bind_param('sssss', $fname, $lname, $password, $email, $id);
			$stmt1->execute();

		 	return true;
		}

	######################################################################################################################################

		#If user updates just user details, this will run.
		if ($initialStmt &&
			$initialStmt -> bind_param('sss', $street, $number, $houseletter) &&
			$initialStmt -> execute() &&
			$initialStmt -> store_result() &&
			$initialStmt -> bind_result($address_id)) {
		##################################################################################################################################	
		 	$initialStmt -> fetch();

			$sql  = "UPDATE `User` SET first_name = ?, last_name = ?, email = ?, address_ID = '$address_id' WHERE ID = ?;";	 	
			$stmt2 = $this->mysqli->prepare($sql);
			$stmt2->bind_param('ssss', $fname, $lname, $email, $id);
			$stmt2->execute();

		 	return true;
		}else {
			return false;
		}
	}

/*============================================================================================================================================================================*/
	public static function salt($length) {
		return bin2hex(random_bytes($length));
	}
/*============================================================================================================================================================================*/	
	/*** starting the session ***/
	public static function get_session(){
	    return $_SESSION['login'];
    }
/*============================================================================================================================================================================*/					
	/*** Get user in current sessions Full name ***/
	public static function get_full_name(){
	    return $_SESSION['full_name'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions Full address ***/
	public static function get_full_address(){
	    return $_SESSION['full_address'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions first name ***/
	public function get_first_name(){
	    return $_SESSION['first_name'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions last name ***/
	public function get_last_name(){
	    return $_SESSION['last_name'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions email ***/
	public function get_email(){
	    return $_SESSION['email'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions streetname ***/
	public function get_street_name(){
	    return $_SESSION['street_name'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions streetnumber ***/
	public function get_street_number(){
	    return $_SESSION['street_number'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions houseletter ***/
	public function get_house_letter(){
	    return $_SESSION['house_letter'];
	}
/*============================================================================================================================================================================*/	
	/*** starting the session ***/
	public function get_sessionId(){
	    return $_SESSION['id'];
	}
/*============================================================================================================================================================================*/
	public function user_logout() {
	    $_SESSION['login'] = FALSE;
		unset($_SESSION);
	    session_destroy();
    }
} #END OF CLASS