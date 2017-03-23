<?php
require 'gestorDB.php';

function signUserUp ($params) {
	
  $idUser = $params['idUser'];
  $clave = $params['clave'];
  $birthday = $params['birthday'];

  global $table_Users;

	// OPEN DB
	$DBH = openDB();


  // UPDATE READINGS
  $params = array($idUser, $clave, $birthday);
  $sql = "INSERT INTO $table_Users (idUser, Clave, Birthday)
          VALUES (?, ?, ?)";
  
  $task = querySql($sql, $params, $DBH);// ?? "null";
  if (!$task) echo "signUserUp Error";

  // CLOSE DB
  closeDB ($DBH);

  // RETURN OK (won't be ok if sql wasn't ok)
  return "1";
}

?>