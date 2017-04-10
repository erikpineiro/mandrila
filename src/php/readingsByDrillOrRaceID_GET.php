<?php

include_once 'gestorDB.php';

function readingsByDrillOrRaceID_GET ($params = null, $DBH = null) {
	
  $eventID = $params->eventID;

  global $table_Readings;

	// OPEN DB
  $closeDBHere = false;
	if (!$DBH) {
    $DBH = openDB();
    $closeDBHere = true;
  }

  // FROM READINGS
  $pdoParams = array($eventID);
  $sql = "SELECT * FROM $table_Readings
          WHERE eventID = ?";
  $readings = search($sql, $pdoParams, $DBH);

  // CLOSE DB
  if ($closeDBHere) closeDB ($DBH);

  // RETURN INFO
  return $closeDBHere ? json_encode($readings) : $readings;
}

?>