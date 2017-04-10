import axios from "axios";

var baseURL = 'http://localhost:8888/Mandrila/src/php/dbRouting.php'
var params = new URLSearchParams();

export function userLogin(args) {

	params.append('args', JSON.stringify(args));
	params.append('function', 'userByID_GET');

  return {
    type: "USER_LOGIN",
    // payload: axios.post(baseURL, {...payload, function: "userByID_GET"}),
    payload: axios.post(baseURL, params),
  }
}


export function userChangeLanguage(args) {
  return {
    type: "USER_CHANGE_LANGUAGE",
    payload: args,
  }
}

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
