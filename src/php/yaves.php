<?php

    // LOCAL DB
	$DBName = 'Hugin';
	$undb = 'root';
	$cldb = 'root';
	$hostdb = 'localhost';

    // ONLINE DB
	$DBName = '136140-antimulti';
	$undb = '136140-wx16215';
	$cldb = 'sanfrancisco';
	$hostdb = 'mysql18.citynetwork.se';


	$DBH = new PDO("mysql:host=".$hostdb.";"."dbname=".$DBName."; charset=utf8", $undb, $cldb);
	
?>
