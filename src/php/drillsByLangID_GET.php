<?php

if (!function_exists("openDB")) require 'gestorDB.php';

function drillsByLangID_GET ($params = null, $DBH = null) {
	
  $languageID = $params->languageID;

  global $table_Drills;

	// OPEN DB
  $closeDBHere = false;
	if (!$DBH) {
    $DBH = openDB();
    $closeDBHere = true;
  }

  // FROM DRILLS
  $pdoParams = array($languageID);
  $sql = "SELECT * FROM $table_Drills
          WHERE languageID = ?";
  $drills = search($sql, $pdoParams, $DBH);


  // GET READINGS
  include_once 'readingsByDrillOrRaceID_GET.php';
  for ($i=0; $i<count($drills); $i++) {
    $params->originID = $drills[$i]['drillID'];
    $readings = readingsByDrillOrRaceID_GET($params, $DBH);
    $drills[$i]['readings'] = $readings ? $readings : array();
  }

  // CLOSE DB
  if ($closeDBHere) closeDB ($DBH);

  // RETURN INFO
  return $closeDBHere ? json_encode($drills) : $drills;
}

?>