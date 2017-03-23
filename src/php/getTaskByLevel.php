<?php
require 'gestorDB.php';

function getTaskByLevel ($params) {
	
	$login = $params['login'];
	$level = $params['level'];

  global $table_Users;
  global $table_Tasks;
	global $table_Readings;

	// OPEN DB
	$DBH = openDB();

  // GET NEW TASK
  $sqlNOTIN = ($login == "void") ? "" :  " idTask NOT IN (SELECT idTask FROM $table_Readings WHERE idUser = ?) AND ";
  $params = array($login, $level);
  $sql = "SELECT * FROM $table_Tasks 
          WHERE
            $sqlNOTIN
            Level = ?
          ORDER BY RAND() LIMIT 1";
  
  $task = search($sql, $params, $DBH);// ?? "null";
  if ($task == null) $task = "0";
  else $task = $task[0];

  // CLOSE DB
  closeDB ($DBH);

  // RETURN INFO
  return json_encode($task);
}

?>