<?php

error_reporting(-1); // ALL MESSAGES
ini_set('display_errors', 'On');

    
require 'words.php';

// $nUsers = 30;
// $nExercises = 100;
// $nLevels = 10;
$nUsers = 3;
$nExercises = 75;
$nLevels = 10;
$maxNDrillsPerLang = 12;
$maxNRacesPerLang = 12;
$maxLangsPerUser = 3;

// LAME ARRAYS TO KEEP TRACK OF STUFF. So we don't have to access DB to find them
// ARRAY TO KEEP TRACK OF EXERS IN DIFF LANGS
$exercisesInLangs = array ();
foreach ($allLangCodes as $value) { $exercisesInLangs[$value] = array(); }

// ARRAY TO KEEP TRACK OF N_STATEMENTS IN EXERCISE
$nQuestionsInExercise = array();

// CREATE EXERCISE IDs
$exercises = array();
for  ($i =0; $i < $nExercises; $i++) { $exercises[] = "EXER" . generateRandomString(47); }

// CREATE USER IDs
$userIDs = array();
for ($i = 0; $i < $nUsers; $i++) { $userIDs[] = "USER" . generateRandomString(47); }

$DBH = openDB();
echo "DB Open ";

// ADD EXERCISES
for ($i = 0; $i < count($exercises); $i++) {

  $level = rand (0, $nLevels);
  $anchor = rand (0, 30);
  $idCreator = $userIDs[rand (0, $nUsers-1)];
  $id = $exercises[$i];
  $langCode = $allLangCodes[rand(0, count($allLangCodes)-1)];
  $nQuestions = rand(1, 4);
  $statements = array();
  for ($j = 0; $j < $nQuestions; $j++) {
    $true = rand (0,1);
    // $statements[] = getSentences(rand(2,4), $langCode).($true ? " true" : " false");
    $statements[] = (object) array (
      "text" => getSentences(rand(2,4), $langCode).($true ? " true" : " false"),
      "isTrue" => $true
    );
  }
  $content = json_encode ( (object) array (
    'main' => getSentences(4, $langCode),
    'statements' => $statements
  ));

  $exercisesInLangs[$langCode][] = $id;
  $nQuestionsInExercise[$id] = $nQuestions;

  
  $STH = $DBH->prepare("INSERT INTO Exercises (exerciseID, creatorID, level, contents, levelAnchor, langCode) VALUES (?, ?, ?, ?, ?, ?)");
  $STH->bindParam(1, $id);
  $STH->bindParam(2, $idCreator);
  $STH->bindParam(3, $level);
  $STH->bindParam(4, $content);
  $STH->bindParam(5, $anchor);
  $STH->bindParam(6, $langCode);

 if (!$STH->execute()){exit('Problems adding new EXERCISE to DB - '.$STH->errorInfo());}
}

// var_dump($exercisesInLangs);
// var_dump($nQuestionsInExercise);


// ADD USERS
for ($i = 0; $i < count($userIDs); $i++) {
 
  $idUser = $userIDs[$i];
  $clave = "clave";
  $selectedLanguage = "EN_GB";
  $appLanguage = "EN_GB";
  $alias = $aliasPrefix[rand(0, count($aliasPrefix) - 1)].$allNames[rand(0, count($allNames) - 1)];
  
  $STH = $DBH->prepare("INSERT INTO Users (userID, clave, selectedLanguage, appLanguage, alias) VALUES (?, ?, ?, ?, ?)");
  $STH->bindParam(1, $idUser);
  $STH->bindParam(2, $clave);
  $STH->bindParam(3, $selectedLanguage);
  $STH->bindParam(4, $appLanguage);
  $STH->bindParam(5, $alias);

  if (!$STH->execute()){exit('Problems adding new USER to DB - '.$STH->errorInfo());}

  // ADD LANGUAGES
  $nLangs = rand(1, $maxLangsPerUser);
  $langsTaken = array();
  for ($j = 0; $j<$nLangs; $j++) {

    $idLang = "LANG".generateRandomString(47);
    $clase = rand(0,10);
    $xps = 0;

    $done = false;
    while (!$done) {
      $langCode = $allLangCodes[rand(0, count($allLangCodes)-1)];
      if (!in_array($langCode, $langsTaken)) {
        $langsTaken[] = $langCode;
        $done = true;
      }
    }

    $STH = $DBH->prepare("INSERT INTO Languages (languageID, userID, clase, xps, langCode) VALUES (?, ?, ?, ?, ?)");
    $STH->bindParam(1, $idLang);
    $STH->bindParam(2, $idUser);
    $STH->bindParam(3, $clase);
    $STH->bindParam(4, $xps);
    $STH->bindParam(5, $langCode);

    if (!$STH->execute()){exit('Problems adding new LANG to DB - '.$STH->errorInfo());}

    // ADD RACES
    // ATTENTION: ONLY RACES WITH ONE PARTICIPANT....
    $nRaces = rand(1, $maxNRacesPerLang);

    for ($rc=0; $rc<$nRaces; $rc++) {

      $idRace = "RACE".generateRandomString(47);

      $STH = $DBH->prepare("INSERT INTO Races (languageID, eventID) VALUES (?, ?)");
      $STH->bindParam(1, $idLang);
      $STH->bindParam(2, $idRace);
      if (!$STH->execute()){exit('Problems adding new RACE to DB - '.$STH->errorInfo());}

      // ADD READINGS TO RACE
      $nReadings = rand (1, 3);
      for ($r=0; $r<$nReadings; $r++) {
        addReading ($idUser, $langCode, $idRace);
      }
    }

    // ADD DRILLS
    $nDrills = rand(1, $maxNDrillsPerLang);
    for ($d=0; $d<$nDrills; $d++) {
      $idDrill = "DRLL".generateRandomString(47);

      $STH = $DBH->prepare("INSERT INTO Drills (languageID, eventID) VALUES (?, ?)");
      $STH->bindParam(1, $idLang);
      $STH->bindParam(2, $idDrill);
      if (!$STH->execute()){exit('Problems adding new DRILL to DB - '.$STH->errorInfo());}

      // ADD READING TO DRILL
      addReading ($idUser, $langCode, $idDrill);
    }

  }
}


function addReading ($userID, $langCode, $origin){

  global $exercisesInLangs, $nQuestionsInExercise, $DBH, $nLevels;

  $nExersInThisLang = count($exercisesInLangs[$langCode]);
  if ($nExersInThisLang<1) return; // Don't do readings, there are no exers

  $level = rand (0, $nLevels);
  $exerciseID = $exercisesInLangs[$langCode][rand(0, $nExersInThisLang - 1)];
  $idReading = "READ".generateRandomString(47);
  $datum = date("Y-m-d H:i:s", random_timeStamp_inrange(strtotime('2016-01-01'), strtotime('2016-12-31')));
  $results = [];
  $nQuestions = $nQuestionsInExercise[$exerciseID];
  for ($jj = 0; $jj < $nQuestions; $jj++) $results[] = rand (-1,1);
  $results = json_encode($results);
  $rating = rand(1,4);
  $xps = rand(-5, 15);

  $STH = $DBH->prepare("INSERT INTO Readings (readingID, exerciseID, userID, datum, results, eventID, rating, xps, exerciseLevel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
  $STH->bindParam(1, $idReading);
  $STH->bindParam(2, $exerciseID);
  $STH->bindParam(3, $userID);
  $STH->bindParam(4, $datum);
  $STH->bindParam(5, $results);
  $STH->bindParam(6, $origin);
  $STH->bindParam(7, $rating);
  $STH->bindParam(8, $xps);
  $STH->bindParam(9, $level);

  if (!$STH->execute()){exit('Problems adding new READING to DB - '.$STH->errorInfo());}

}






closeDB($DBH);


function openDB(){
	
	try {  
		require '../yaves.php';
		$DBH = new PDO("mysql:host=".$hostdb.";"."dbname=".$DBName."; charset=utf8", $undb, $cldb, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        $DBH->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        return $DBH;
		}  
		catch(PDOException $e) {echo $e->getMessage();}
	}	
function closeDB($db){$db = null;}
function generateRandomString($length = 5) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) $randomString .= $characters[rand(0, strlen($characters) - 1)];
    return $randomString;
    }
function random_timeStamp_inrange($start_date, $end_date) {
    return mt_rand($start_date, $end_date);
    }

?>
