<?php

include_once 'gestorDB.php';

function eventsByLangID_GET ($params = null, $DBH = null, $kind = "drills") {
	
  $languageID = $params->languageID;

  global $table_Drills;
  global $table_Races;
  $table = $kind == "drills" ? $table_Drills : $table_Races;

	// OPEN DB
  $closeDBHere = false;
	if (!$DBH) {
    $DBH = openDB();
    $closeDBHere = true;
  }

  // FROM DRILLS
  $pdoParams = array($languageID);
  $sql = "SELECT * FROM $table
          WHERE languageID = ?";
  $events = search($sql, $pdoParams, $DBH);


  // GET READINGS
  include_once 'readingsByDrillOrRaceID_GET.php';
  for ($i=0; $i<count($events); $i++) {
    $params->eventID = $events[$i]['eventID'];
    $readings = readingsByDrillOrRaceID_GET($params, $DBH);
    $events[$i]['readings'] = $readings ? $readings : array();
  }

  // CLOSE DB
  if ($closeDBHere) closeDB ($DBH);

  // RETURN INFO. Two kinds of possible return, to cover both direct call from app & call from another php function.
  return $closeDBHere ? json_encode($events) : $events;
}

?>