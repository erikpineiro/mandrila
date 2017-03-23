<?php
// dbRouting used to separate Routing from Actions
// This allows easier testing
// 		if each function-php has its own Get, then we can't call the function directly
//		because when we import function.php we also get the routing (GET function)

// GET THE FUNCTION
 if (!isset($_POST['function'])) exit ("No Function");
 $function = get_magic_quotes_gpc() ? stripslashes($_POST['function']) : $_POST['function'];

 // ENSURE FUNCTION EXISTS
 $acceptedFunctions = array(
 												"checkLoginPass",
 												"getInfoByUserId",
 												"getTaskByLevel",
 												"signUserUp",
 												"submitAnswers"
 												);
 if (!in_array($function, $acceptedFunctions)) exit ("Function does not exist ($function)");


 // PREPARE & CALL THE FUNCTION
 require $function.'.php';

 exit ($function($_POST['args']));
?>