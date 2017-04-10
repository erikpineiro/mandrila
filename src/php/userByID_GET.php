<?php

if (!function_exists("openDB")) require 'gestorDB.php';

function userByID_GET ($params = null, $DBH = null) {

  global $table_Drills;
  global $table_Exercises;
  global $table_Languages;
  global $table_Races;
  global $table_Readings;
  global $table_Users;

  // OPEN DB
  $closeDBHere = false;
  if ($DBH == null) {
   $DBH = openDB();
   $closeDBHere = true;
  }

  $params = json_decode($params);
  
  // TESTING
  if ($params == null || $params->login == "RANDOM") {
    $sql = "SELECT * FROM $table_Users";
    $user = search($sql, null, $DBH)[0];// ?? "null";
    $params->login = $user['userID'];
    $params->clave = $user['clave'];
  }
	
	$login = $params->login;
	$clave = $params->clave; // Not used yet, but passed

  // FROM USERS
  $pdoParams = array($login);
  $sql = "SELECT * FROM $table_Users
          WHERE userID = ?";
  $user = search($sql, $pdoParams, $DBH)[0];// ?? "null";

  // FROM LANGUAGES
  require 'LangsByUserID_GET.php';
  $languages = LangsByUserID_GET($params, $DBH);

  $user['languages'] = $languages;


  // // FROM READINGS
  // $params = array($login);
  // $sql = "SELECT * FROM $table_Readings
  //         WHERE idUser = ?
  //         ORDER BY Datum DESC
  //         LIMIT 6
  //         ";
  // $readings = search($sql, $params, $DBH);// ?? "null";

  // $user['latest'] = $readings == null ? "void" : $readings;


  // CLOSE DB & RETURN INFO
  if ($closeDBHere) {
    closeDB ($DBH);
    return json_encode($user);
  }
  else return $user;

}

?>