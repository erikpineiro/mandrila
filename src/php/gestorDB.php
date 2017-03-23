<?php

error_reporting(-1);    // ALL MESSAGES
ini_set('display_errors', 'On');

function openDB(){
	try {  
		require 'yaves.php';
		$DBH = new PDO("mysql:host=".$hostdb.";"."dbname=".$DBName."; charset=utf8", $undb, $cldb, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
        $DBH->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        $DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        return $DBH;
		}  
		catch(PDOException $e) {echo $e->getMessage();}
}	
function closeDB($db){$db = null;}
function search($sql, $params, $DBH){

  // Searchs with a specific sql query, that comes explicitely as a string
  // with the parameters needed in an array.
  $STH = $DBH->prepare($sql);
    
  // SEVERAL parameters are OK. Just set the sql query right from the caller
  $nParams = $params == null ? 0 : count($params);
  for ($i = 0; $i < $nParams; $i++){
    $STH->bindParam($i+1, $params[$i]);
    }

  if (!$STH->execute()) {
  	exit('Searching, failure 01');
	} else {
    $i = 0;
    while($row = $STH->fetch(PDO::FETCH_ASSOC)) {
	    $data[$i++] = $row;
	    }
    if ($i === 0) $data = null;
  }
  return $data; 
}
function querySql($sql, $params, $DBH) {
  // Carries out a specific sql query
  $STH = $DBH->prepare($sql);
    
  // SEVERAL parameters are OK. Just set the sql query right from the caller
  $nParams = $params == null ? 0 : count($params);
  for ($i = 0; $i < $nParams; $i++){
    $STH->bindParam($i+1, $params[$i]);
    }

  if (!$STH->execute()) {
    echo 'Query, failure 01';
    return false;
  } else {
    return true;
  }
}


// TABLE NAMES
$table_Tasks = "Tasks";
$table_Users = "Users";
$table_Readings = "Readings";
?>