<?php
	require "DB.php";

	class User extends DatabaseObject {
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
			$password 	 	= hash('sha512', $password);

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
	            $this->session_variables($this);
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
			$stmt1 		= $this->mysqli->prepare($query);
			$stmt1->bind_param('sssss', $fname, $lname, $password, $email, $id);
			$stmt1->execute();

			$sql_session 	 = "SELECT `name`, house_number, letter, zip_code, postal_location FROM `Address` WHERE ID = '$address_id'";
			$result_session  = $this->mysqli->query($sql_session) or die($this->mysqli->error);
			$row_id_session	 = $result_session->fetch_assoc();

			
			$sql_session2 	 = "SELECT first_name, last_name, email FROM `User` WHERE ID = '$id'";
			$result_session2 = $this->mysqli->query($sql_session2) or die($this->mysqli->error);
			$row_id_session2 = $result_session2->fetch_assoc();

			$this->first_name 		= $row_id_session2["first_name"];
			$this->last_name 		= $row_id_session2["last_name"];
			$this->email 			= $row_id_session2["email"];
			$this->full_name 		= $row_id_session2["first_name"] . " " . $row_id_session2["last_name"];
	######################################################################################################################################
			$this->street_name 		= $row_id_session["name"];
			$this->street_number 	= $row_id_session["house_number"];
			$this->house_letter 	= $row_id_session["letter"];
			$this->full_address 	= $row_id_session["name"] . " " . $row_id_session["house_number"] . " " . $row_id_session["letter"];
			$this->zip_code 		= $row_id_session["zip_code"]; 
			$this->postal_location 	= $row_id_session["postal_location"];
			$this->update_session_variables($this);

		 	return true;
		}

	######################################################################################################################################

		#If user updates just user details, this will run.
		if ($initialStmt &&
			$initialStmt -> bind_param('sss', $street, $number, $houseletter) &&
			$initialStmt -> execute() &&
			$initialStmt -> store_result() &&
			$initialStmt -> bind_result($address_id)) {
	######################################################################################################################################	
		 	$initialStmt -> fetch();

			$sql  = "UPDATE `User` SET first_name = ?, last_name = ?, email = ?, address_ID = '$address_id' WHERE ID = ?;";	 	
			$stmt2 = $this->mysqli->prepare($sql);
			$stmt2->bind_param('ssss', $fname, $lname, $email, $id);
			$stmt2->execute();

			$sql_session 	 = "SELECT `name`, house_number, letter, zip_code, postal_location FROM `Address` WHERE ID = '$address_id'";
			$result_session  = $this->mysqli->query($sql_session) or die($this->mysqli->error);
			$row_id_session	 = $result_session->fetch_assoc();

			
			$sql_session2 	 = "SELECT first_name, last_name, email FROM `User` WHERE ID = '$id'";
			$result_session2 = $this->mysqli->query($sql_session2) or die($this->mysqli->error);
			$row_id_session2 = $result_session2->fetch_assoc();

			$this->first_name 		= $row_id_session2["first_name"];
			$this->last_name 		= $row_id_session2["last_name"];
			$this->email 			= $row_id_session2["email"];
			$this->full_name 		= $row_id_session2["first_name"] . " " . $row_id_session2["last_name"];
	######################################################################################################################################
			$this->street_name 		= $row_id_session["name"];
			$this->street_number 	= $row_id_session["house_number"];
			$this->house_letter 	= $row_id_session["letter"];
			$this->full_address 	= $row_id_session["name"] . " " . $row_id_session["house_number"] . " " . $row_id_session["letter"];
			$this->zip_code 		= $row_id_session["zip_code"]; 
			$this->postal_location 	= $row_id_session["postal_location"];
			$this->update_session_variables($this);

		 	return true;
		}else {
			return false;
		}
	}

/*============================================================================================================================================================================*/
	public static function random_string($length) {
		return bin2hex(random_bytes($length));
	}
/*============================================================================================================================================================================*/
	public function session_variables($obj) {
		$_SESSION['login'] 			= true; 
        $_SESSION['id'] 			= $obj->id;
        $_SESSION['full_name'] 		= $obj->full_name;
        $_SESSION['full_address'] 	= $obj->full_address;
	#######################################################
        $_SESSION['first_name'] 	= $obj->first_name;
        $_SESSION['last_name'] 		= $obj->last_name;
        $_SESSION['email'] 			= $obj->email;
        $_SESSION['street_name'] 	= $obj->street_name;
        $_SESSION['street_number'] 	= $obj->street_number;
        $_SESSION['house_letter'] 	= $obj->house_letter;
        $_SESSION['zip_code']	 	= $obj->zip_code; #endring her
        $_SESSION['postal_location']= $obj->postal_location; #endring her
	}
/*============================================================================================================================================================================*/
	public function update_session_variables($obj) {
        $_SESSION['full_name'] 		= $obj->full_name;
        $_SESSION['full_address'] 	= $obj->full_address;
	#######################################################
        $_SESSION['first_name'] 	= $obj->first_name;
        $_SESSION['last_name'] 		= $obj->last_name;
        $_SESSION['email'] 			= $obj->email;
        $_SESSION['street_name'] 	= $obj->street_name;
        $_SESSION['street_number'] 	= $obj->street_number;
        $_SESSION['house_letter'] 	= $obj->house_letter;
        $_SESSION['zip_code']	 	= $obj->zip_code;
        $_SESSION['postal_location']= $obj->postal_location;
	}
/*============================================================================================================================================================================*/
	public function create_cookie() {
		$identifier     = $this->random_string(32);
        $securitytoken  = '$this->random_string(32)';
        $user_id        = $this->get_sessionId();
        $securitytoken  = hash('sha512', $securitytoken);

        $cookie_sql     = "INSERT INTO Cookies (user_ID, identifier, securitytoken) VALUES (?, ?, ?)";
        $insert         = $this->mysqli->prepare($cookie_sql);
        $insert->bind_param('sss', $user_id, $identifier, $securitytoken);
        $insert->execute();
        setcookie("identifier",$identifier,time()+(3600*24*365), "/"); //Valid for 1 year
        setcookie("securitytoken",$securitytoken,time()+(3600*24*365), "/"); //Valid for 1 year
	}
/*============================================================================================================================================================================*/
	public function check_user() {
	
		if(isset($_COOKIE['identifier']) && isset($_COOKIE['securitytoken'])) {
			$identifier 	= $_COOKIE['identifier'];
			$cookie_token 	= $_COOKIE['securitytoken'];
			$sql 			= "SELECT user_ID, securitytoken FROM Cookies WHERE identifier = ?";
			$stmt 			= $this->mysqli->prepare($sql);

			$stmt -> bind_param('s', $identifier);
			$stmt -> execute();
			$stmt -> store_result();
			$stmt -> bind_result($user_id, $securitytoken_row);
			$stmt -> fetch();
		
			if($cookie_token !== $securitytoken_row) {
				#Obviously, the Security Token is stolen.
				
			}else { //Token is correct
				//Log the user in
				$_SESSION['id'] = $user_id;
				//If session gets deleted, re-insert the session variables.
				$select_from_user = "SELECT first_name, last_name, email, address_ID FROM `User` WHERE ID = ?";
				$stmt 			  = $this->mysqli->prepare($select_from_user);
				$stmt -> bind_param('s', $user_id);
				$stmt -> execute();
				$stmt -> store_result();
				$stmt -> bind_result($first_name, $last_name, $email, $address_id);
				$stmt -> fetch();
				$full_name = $first_name . ' ' . $last_name;
				###############################################################################################################################
				$select_from_address = "SELECT `name`, house_number, letter, zip_code, postal_location FROM `Address` WHERE ID = ?";
				$stmt2 			  	 = $this->mysqli->prepare($select_from_address);
				$stmt2 -> bind_param('s', $address_id);
				$stmt2 -> execute();
				$stmt2 -> store_result();
				$stmt2 -> bind_result($street_name, $house_number, $house_letter, $zip_code, $postal_location);
				$stmt2 -> fetch();
				$full_address = $street_name . " " . $house_number . " " . $house_letter;

				###############################################################################################################################
		        $_SESSION['full_name'] 		= $full_name;
		        $_SESSION['full_address'] 	= $full_address;
				#######################################################
		        $_SESSION['first_name'] 	= $first_name;
		        $_SESSION['last_name'] 		= $last_name;
		        $_SESSION['email'] 			= $email;
		        $_SESSION['street_name'] 	= $street_name;
		        $_SESSION['street_number'] 	= $house_number;
		        $_SESSION['house_letter'] 	= $house_letter;
		        $_SESSION['zip_code']	 	= $zip_code;
		        $_SESSION['postal_location']= $postal_location;
			}
		}
	}
/*============================================================================================================================================================================*/	
	/**
	 * Returns true if user is admin, else false
	 */
	function is_admin() {
		$user_id 	= $this->get_sessionId();
		$sql 		= "SELECT user_type_ID FROM `User` WHERE ID = ? ";
        $select 	= $this->mysqli->prepare($sql);

        $select 	-> bind_param('s', $user_id);
        $select 	-> execute();
        $select 	-> store_result();
        $select 	-> bind_result($user_type_id);
        $select 	-> fetch();

        if ($user_type_id === 1) {
        	return true;
        }else {
        	return false;
        }
	}
/*============================================================================================================================================================================*/
	/**
     * Fetch.
     *
     * This function shall fetch an entire object from the database.
     *
     * @param int $id
     */
     function fetch(int $id): void {

     }

/*============================================================================================================================================================================*/
    /**
     * Commit.
     *
     * This function shall commit and push changes done to the object to the database.
     */
     function commit(): void {

     }
/*============================================================================================================================================================================*/

    /**
     * Is defined.
     *
     * This function shall evaluate whether the object is complete or incomplete.
     *
     * @return bool
     */
     function isDefined(): bool {

     }
/*============================================================================================================================================================================*/

    /**
     * Clear.
     *
     * This function shall reset/clear all object attributes.
     */
     function clear(): void {

     }
/*============================================================================================================================================================================*/

    /**
     * To string.
     *
     * This function shall display all object attributes in a string.
     *
     * @return string
     */
     function toString(): string {
     	
     }
/*============================================================================================================================================================================*/
/**
 * Returns true when the user is checked in, else false
 */
	function is_checked_in() {
		return isset($_SESSION['id']);
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
	public static function get_first_name(){
	    return $_SESSION['first_name'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions last name ***/
	public static function get_last_name(){
	    return $_SESSION['last_name'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions email ***/
	public static function get_email(){
	    return $_SESSION['email'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions streetname ***/
	public static function get_street_name(){
	    return $_SESSION['street_name'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions streetnumber ***/
	public static function get_street_number(){
	    return $_SESSION['street_number'];
	}
/*============================================================================================================================================================================*/
	/*** Get user in current sessions houseletter ***/
	public static function get_house_letter(){
	    return $_SESSION['house_letter'];
	}
/*============================================================================================================================================================================*/
	/*** starting the session ***/
	public static function get_zip_code(){ #endring her
	    return $_SESSION['zip_code'];
	}
/*============================================================================================================================================================================*/
	/*** starting the session ***/
	public static function get_postal_location(){ #endring her
	    return $_SESSION['postal_location'];
	}
/*============================================================================================================================================================================*/
	/*** starting the session ***/
	public static function get_sessionId(){
	    return $_SESSION['id'];
	}
/*============================================================================================================================================================================*/
	public function user_logout() {
	    $_SESSION['login'] = FALSE;
		unset($_SESSION);
	    session_destroy();

	    //Remove Cookies
		setcookie("identifier","",time()-(3600*24*365), "/"); 
		setcookie("securitytoken","",time()-(3600*24*365), "/");
    }
} #END OF CLASS