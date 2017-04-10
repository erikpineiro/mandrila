<?php
    
$textTotal = "Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of. We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. Sitting mistake towards his few country ask. You delighted two rapturous six depending objection happiness something the. Off nay impossible dispatched partiality unaffected. Norland adapted put ham cordial. Ladies talked may shy basket narrow see. Him she distrusts questions sportsmen. Tolerably pretended neglected on my earnestly by. Sex scale sir style truth ought. Unwilling sportsmen he in questions september therefore described so. Attacks may set few believe moments was. Reasonably how possession shy way introduced age inquietude. Missed he engage no exeter of. Still tried means we aware order among on. Eldest father can design tastes did joy settle. Roused future he ye an marked. Arose mr rapid in so vexed words. Gay welcome led add lasting chiefly say looking. Marianne or husbands if at stronger ye. Considered is as middletons uncommonly. Promotion perfectly ye consisted so. His chatty dining for effect ladies active. Equally journey wishing not several behaved chapter she two sir. Deficient procuring favourite extensive you two. Yet diminution she impossible understood age. Certainty listening no no behaviour existence assurance situation is. Because add why not esteems amiable him. Interested the unaffected mrs law friendship add principles. Indeed on people do merits to. Court heard which up above hoped grave do. Answer living law things either sir bed length. Looked before we an on merely. These no death he at share alone. Yet outward the him compass hearted are tedious. Far curiosity incommode now led smallness allowance. Favour bed assure son things yet. She consisted consulted elsewhere happiness disposing household any old the. Widow downs you new shade drift hopes small. So otherwise commanded sweetness we improving. Instantly by daughters resembled unwilling principle so middleton. Fail most room even gone her end like. Comparison dissimilar unpleasant six compliment two unpleasing any add. Ashamed my company thought wishing colonel it prevent he in. Pretended residence are something far engrossed old off. Your it to gave life whom as. Favourable dissimilar resolution led for and had. At play much to time four many. Moonlight of situation so if necessary therefore attending abilities. Calling looking enquire up me to in removal. Park fat she nor does play deal our. Procured sex material his offering humanity laughing moderate can. Unreserved had she nay dissimilar admiration interested. Departure performed exquisite rapturous so ye me resources. Inhabiting discretion the her dispatched decisively boisterous joy. So form were wish open is able of mile of. Waiting express if prevent it we an musical. Especially reasonable travelling she son. Resources resembled forfeited no to zealously. Has procured daughter how friendly followed repeated who surprise. Great asked oh under on voice downs. Law together prospect kindness securing six. Learning why get hastened smallest cheerful. Woody equal ask saw sir weeks aware decay. Entrance prospect removing we packages strictly is no smallest he. For hopes may chief get hours day rooms. Oh no turned behind polite piqued enough at. Forbade few through inquiry blushes you. Cousin no itself eldest it in dinner latter missed no. Boisterous estimating interested collecting get conviction friendship say boy. Him mrs shy article smiling respect opinion excited. Welcomed humoured rejoiced peculiar to in an. Attachment apartments in delightful by motionless it no. And now she burst sir learn total. Hearing hearted shewing own ask. Solicitude uncommonly use her motionless not collecting age. The properly servants required mistaken outlived bed and. Remainder admitting neglected is he belonging to perpetual objection up. Has widen too you decay begin which asked equal any. ";

$allNames = array("Lolita", "Inga", "Leonardo", "Sylvia", "Shari", "Danae", "Christie", "Mohammed", "Caroline", "Rima", "Brianne", "Lori", "Elise", "Erik", "Anita", "Tiny", "Olinda", "Delta", "Kindra", "Larraine", "Lena", "Taren", "Madelyn", "Jestine", "Adaline", "Nichol", "Barrie", "Iris", "Sandie", "Garry", "Porsche", "Carli", "Season", "Coralie", "Sandra", "Gregoria", "Francisco", "Penny", "Glenn", "Alanna", "Allena", "Beatris", "Bulah", "Emory", "Maudie", "Wilton", "Chun", "Sunshine", "Cristina", "Enid");

error_reporting(-1);	// ALL MESSAGES
ini_set('display_errors', 'On');



$nUsers = 30;
$nTasks = 100;
$nLevels = 10;


// Create Random Users
$allUsers = array();
for ($i = 0; $i < $nUsers; $i++) {
    $allUsers[] = $allNames[$i];
}

// Create Random Tasks
for  ($i =0; $i < $nTasks; $i++) {
    $allTasks[] = generateRandomString(20); //id
    }


$DBH = openDB();
echo "DB OPEN";
// ADD USERS
for ($i = 0; $i < count($allUsers); $i++) {
    $id = $allUsers[$i];
    $clave = "clave";
    $points = rand(0, 100);
    $level = rand (0, $nLevels);
    $STH = $DBH->prepare("INSERT INTO Users (idUser, Clave, Points, Level) VALUES (?, ?, ?, ?)");
    $STH->bindParam(1, $id);
    $STH->bindParam(2, $clave);
    $STH->bindParam(3, $points);
    $STH->bindParam(4, $level);
	if (!$STH->execute()){exit('Problems adding new User to DB - '.$STH->errorInfo());}
}

// ADD EXERS
for ($i = 0; $i < count($allTasks); $i++) {

    $nQuestions = rand (1, 4);
    $statements = array();
    for ($j = 0; $j < $nQuestions; $j++) {
        $true = rand (0,1);
        $statements[] = array($true, trim (substr($textTotal, rand(0, 300), rand(50,100))).($true ? "true" : "false"));
    }
    // $statements = "";
    // for ($j = 0; $j < $nQuestions; $j++) {
    //     $true = rand (0,1)? "*@#" : "!#€";
    //     $statements .= $true.trim (substr($textTotal, rand(0, 300), rand(50,100))).($true ? "true" : "false");
    // }
    $content = json_encode ( (object) array (
        'main' => trim (substr($textTotal, rand(0, 200), rand(70,150))),
        'statements' => $statements
        ) );
    
    $level = rand (0,$nLevels);
    $anchor = rand (0,30);
    $idCreator = $allUsers[rand (0, $nUsers-1)];
        $idTask = $allTasks[$i];
    
    $STH = $DBH->prepare("INSERT INTO Tasks (IdTask, IdCreator, Level, Content, Anchor) VALUES (?, ?, ?, ?, ?)");
    $STH->bindParam(1, $idTask);
    $STH->bindParam(2, $idCreator);
    $STH->bindParam(3, $level);
    $STH->bindParam(4, $content);
    $STH->bindParam(5, $anchor);

	if (!$STH->execute()){exit('Problems adding new Task to DB - '.$STH->errorInfo());}
    
    // ADD READINGS
    // X per Task
    $nReadings = 1; // rand (1, 4);
    
    for ($j = 0; $j < $nReadings; $j++) {
        $idReader = $allUsers[rand (0, $nUsers-1)];
        $results = [];
        for ($jj = 0; $jj < $nQuestions; $jj++) $results[] = rand (-1,1);
        $results = json_encode($results);
        $dateTime = date("Y-m-d", random_timeStamp_inrange (strtotime('2016-01-01'), strtotime('2016-12-31')));
        
        $STH = $DBH->prepare("INSERT INTO Readings (IdTask, IdUser, Datum, Results, TaskLevelAtTheTime) VALUES (?, ?, ?, ?, ?)");
        $STH->bindParam(1, $idTask);
        $STH->bindParam(2, $idReader);
        $STH->bindParam(3, $dateTime);
        $STH->bindParam(4, $results);
        $STH->bindParam(5, $level);

        if (!$STH->execute()){exit('Problems adding new Reading to DB - '.$STH->errorInfo());}
    }
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
