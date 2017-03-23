<?php
require 'gestorDB.php';

function submitAnswers ($params) {
	
  $idUser = $params['idUser'];
  $results = $params['results'];
  $levelUser = $params['levelUser'];
  $anchorUser = $params['anchorUser'];
  $levelTask = $params['levelTask'];
	$anchorTask = $params['anchorTask'];
  $idTask = $params['idTask'];
  $clave = $params['clave'];

  $datum = date("Y-m-d H:i:s");

  global $table_Users;
  global $table_Tasks;
	global $table_Readings;

	// OPEN DB
	$DBH = openDB();

  // CHECK LOGIN & CLAVE (So no changes can be made to other players)

  // UPDATE READINGS
  $params = array($idUser, $idTask, $datum, $results, $levelUser, $anchorUser, $levelTask, $anchorTask);
  $sql = "INSERT INTO $table_Readings (idUser, idTask, Datum, Results, UserLevelAtTheTime, UserAnchorAtTheTime,  TaskLevelAtTheTime, TaskAnchorAtTheTime)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
  $task = querySql($sql, $params, $DBH);// ?? "null";
  if (!$task) echo "submitAnswers Error";

  // CLOSE DB
  closeDB ($DBH);

  // RETURN OK (won't be ok if sql wasn't ok)
  return "1";
}

?>