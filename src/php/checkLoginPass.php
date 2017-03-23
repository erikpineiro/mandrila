<?php
require 'gestorDB.php';
// getExerciseByID ($idExercise);
// exit (getExerciseByID ($idExercise));
function checkLoginPass ($params) {
	
	$email = $params['login'];
	$pass = $params['clave'];

	global $table_Users;

	// OPEN DB
	$DBH = openDB();

	// CHECK
  $params = array($email);
  $sql = "SELECT * FROM $table_Users
          WHERE idUser = ?";
  $user = search($sql, $params, $DBH)[0];// ?? "null";


	// CLOSE DB
	closeDB ($DBH);

	// RETURN INFO
  if ($user) {
  	if ($user['Clave'] == $pass) return "1";
  	else return "0"; // login is taken...
  } else {
  	return "2"; // login not in the table (free to use)
  }

}

?>