<?php
	require "DB.php";

	class User {
		protected $mysqli;
		private $id;
		/*Variable for user name*/
		private $full_name;
		/*Variables for user address*/
		private $address_ID;
		private $full_address;

		public function __construct(){
			$this->mysqli = DB::mysqli();
		}
/*============================================================================================================================================================================*/
		/*** for registration process ***/
		public function reg_user($firstname, $lastname, $streetname, $streetnumber, $houseletter, $password, $email){
			$sql = "SELECT ID FROM `User` WHERE email=?";
			$initialStmt = $this->mysqli->prepare($sql);
			$salt = "AfghsdfDFjhkl54w21FGn2gf65bdfzdf";
			$password .= $salt;

			if ($initialStmt &&
				$initialStmt -> bind_param('s', $email) &&
				$initialStmt -> execute() &&
				$initialStmt -> store_result() &&
				$initialStmt -> bind_result($id)) {

			 	$initialStmt -> fetch();

				if ($id == 0) {

					$connect = $this->mysqli;
					$set = "SET @email = ?, SET @password = ?, SET @firstname = ?, SET @lastname = ?, SET @streetname = ?, SET @streetnumber = ?, SET @houseletter = ?";
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
    	$salt = "AfghsdfDFjhkl54w21FGn2gf65bdfzdf";
    	$saltedPw = $password . $salt;
        $password = hash('sha512', $saltedPw);
		$sql = 'SELECT ID FROM `User` WHERE email=? AND password=?';

		$stmt = $this->mysqli->prepare($sql);

		if ($stmt &&
			$stmt -> bind_param('ss', $email, $password) &&
			$stmt -> execute() &&
			$stmt -> store_result() &&
			$stmt -> bind_result($id)) {

		 	$stmt -> fetch();

			$sqlCheck = "SELECT ID FROM `User` WHERE ID = '$id'"; 
			$result = $this->mysqli->query($sqlCheck) or die($this->mysqli->error);

			$sqlCheck2 = "SELECT ID, first_name, last_name, address_ID FROM `User` WHERE ID = '$id'";
			$result2 = $this->mysqli->query($sqlCheck2) or die($this->mysqli->error);
			$rowId = $result2->fetch_assoc();

			#echo $rowId["ID"];
			$this->id = $rowId["ID"];
			$this->full_name = $rowId["first_name"] . " " . $rowId["last_name"];
			$this->address_ID = $rowId["address_ID"]; #Use this for finding the users address.
			#echo $this->id;

			$sqlCheck3 = "SELECT `name`, house_number, letter FROM `Address` WHERE ID = '$this->address_ID'";
			$result3 = $this->mysqli->query($sqlCheck3) or die($this->mysqli->error);
			$rowId3 = $result3->fetch_assoc();

			$this->full_address = $rowId3["name"] . " " . $rowId3["house_number"] . " " . $rowId3["letter"];

			$user_data = $result->fetch_assoc();
			$count_row = $result->num_rows;

			if ($count_row == 1) {
	            $_SESSION['login'] = true; 
	            $_SESSION['id'] = $this->id;
	            $_SESSION['full_name'] = $this->full_name;
	            $_SESSION['full_address'] = $this->full_address;
	            return true;
	        }else {
				return false;
			}
		}else {
			echo 'Prepared Statement Error';
		}

	}

/*============================================================================================================================================================================*/
	public static function salt($length) {
		return bin2hex(random_bytes($length));
	}
/*============================================================================================================================================================================*/	
	/*** starting the session ***/
	public function get_session(){
	    return $_SESSION['login'];
    }
/*============================================================================================================================================================================*/					
	/*** Get user in current sessions Full name ***/
	public function get_full_name(){
	    return $_SESSION['full_name'];
	}

/*============================================================================================================================================================================*/
	/*** Get user in current sessions Full address ***/
	public function get_full_address(){
	    return $_SESSION['full_address'];
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
?>