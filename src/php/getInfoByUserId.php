<?php
require 'gestorDB.php';

function getInfoByUserId ($params) {
	
	$login = $params['login'];
	$clave = $params['clave']; // Not used yet, but passed

    global $table_Users;
    global $table_Readings;
	global $table_Tasks;

	// OPEN DB
	$DBH = openDB();

    // FROM USERS
    $params = array($login);
    $sql = "SELECT * FROM $table_Users
            WHERE idUser = ?";
    $user = search($sql, $params, $DBH)[0];// ?? "null";

    // FROM READINGS
    $params = array($login);
    $sql = "SELECT * FROM $table_Readings
            WHERE idUser = ?
            ORDER BY Datum DESC
            LIMIT 6
            ";
    $readings = search($sql, $params, $DBH);// ?? "null";

    $user['latest'] = $readings == null ? "void" : $readings;


    // CLOSE DB
    closeDB ($DBH);

    // RETURN INFO
    return json_encode($user);
}

?>