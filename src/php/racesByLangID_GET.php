<?php

include_once 'gestorDB.php';

function racesByLangID_GET ($params = null, $DBH = null) {
	
  $languageID = $params->languageID;

  global $table_Races;

	// OPEN DB
  $closeDBHere = false;
	if (!$DBH) {
    $DBH = openDB();
    $closeDBHere = true;
  }

  // FROM RACES
  $pdoParams = array($languageID);
  $sql = "SELECT * FROM $table_Races
          WHERE languageID = ?";
  $races = search($sql, $pdoParams, $DBH);


  // GET READINGS
  include_once 'readingsByDrillOrRaceID_GET.php';
  for ($i=0; $i<count($races); $i++) {
    $params->originID = $races[$i]['raceID'];
    $readings = readingsByDrillOrRaceID_GET($params, $DBH);
    $races[$i]['readings'] = $readings ? $readings : array();
  }

  // CLOSE DB
  if ($closeDBHere) closeDB ($DBH);

  // RETURN INFO
  return $closeDBHere ? json_encode($races) : $races;
}

?>