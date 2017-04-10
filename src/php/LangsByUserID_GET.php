<?php

include_once 'gestorDB.php';

function LangsByUserID_GET ($params, $DBH = null) {
	
	$login = $params->login;
	$clave = $params->clave; // Not used yet, but passed

  global $table_Languages;

	// OPEN DB
  $closeDBHere = false;
	if (!$DBH) {
    $DBH = openDB();
    $closeDBHere = true;
  }

  // FROM LANGUAGES
  $pdoParams = array($login);
  $sql = "SELECT * FROM $table_Languages
          WHERE userID = ?";
  $langs = search($sql, $pdoParams, $DBH); // ALL USERS MUST at least have one Language


  // GET DRILLS & RACES
  // include_once 'drillsByLangID_GET.php';
  // include_once 'racesByLangID_GET.php';
  include_once 'eventsByLangID_GET.php';

  for ($i=0; $i<count($langs); $i++) {
    
    // DRILLS
    $params->languageID = $langs[$i]['languageID'];
    $drills = eventsByLangID_GET($params, $DBH, "drills");
    $langs[$i]['drills'] = $drills ? $drills : array();

    // RACES
    $races = eventsByLangID_GET($params, $DBH, "races");
    // $races = racesByLangID_GET($params, $DBH);
    $langs[$i]['races'] = $races ? $races : array();
  }

  // CLOSE DB
  if ($closeDBHere) closeDB ($DBH);

  // RETURN INFO
  return $closeDBHere ? json_encode($langs) : $langs;
}

?>