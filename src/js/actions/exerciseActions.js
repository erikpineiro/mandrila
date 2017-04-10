import axios from "axios";

var baseURL = 'http://localhost:8888/Mandrila/src/php/dbRouting.php'
var params = new URLSearchParams();

export function exerciseByLevel_get(args) {

	params.append('args', JSON.stringify(args));
	params.append('function', 'exerciseByLevel_GET');

  return {
    type: "EXERCISE_GETBYLEVEL",
    // payload: axios.post(baseURL, {...payload, function: "userByID_GET"}),
    payload: axios.post(baseURL, params),
  }
}

export function statementMarkClicked(args) {
	// User has clicked on a statementMark.
	// args: {readingID, statementNumber, isTrue, kind}
	return {
		type: "STATEMENTMARK_CLICKED",
		payload: args,
	}
}

// export function newReadingForExercise(args) {

// 	// Create a local object to contain info
// 	// It will be uploaded when user is done with exercise
// 	// args: {exerciseID}

//   return {
//     type: "READING_CREATE",
//     // payload: axios.post(baseURL, {...payload, function: "userByID_GET"}),
//     payload: args,
//   }
// }


// export function setUserName(name) {
//   return {
//     type: 'SET_USER_NAME',
//     payload: name,
//   }
// }

// export function setUserAge(age) {
//   return {
//     type: 'SET_USER_AGE',
//     payload: age,
//   }
// }
