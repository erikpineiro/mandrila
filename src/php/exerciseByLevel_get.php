<?php
require 'gestorDB.php';

function exerciseByLevel_GET ($params) {
	
  global $table_Exercises;
	global $table_Readings;

  // OPEN DB
  $closeDBHere = false;

  if (!isset($DBH)) {
    $DBH = openDB();
    $closeDBHere = true;
  }

  $params = json_decode($params);
  
  $login = $params->login;
  $level = $params->level;


  // GET NEW EXERCISE
  $sqlNOTIN = ($login == "void") ? "" :  " exerciseID NOT IN (SELECT exerciseID FROM $table_Readings WHERE userID = ?) AND ";
  $params = ($login == "void") ? array($level) : array($login, $level);
  $sql = "SELECT * FROM $table_Exercises
          WHERE
            $sqlNOTIN
            level = ?
          ORDER BY RAND() LIMIT 1";
  
  $exercise = search($sql, $params, $DBH);// ?? "null";
  if ($exercise == null) $exercise = "0";
  else $exercise = $exercise[0];

  // CLOSE DB
  if ($closeDBHere) closeDB ($DBH);

  // RETURN INFO
  return $closeDBHere ? json_encode($exercise) : $exercise;

}

?>