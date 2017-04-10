import User from "../classes/User"


var initialState = {
  dbStatus: "",
  selectedSetting: "", // "" (not showing), "UserInfo", "EditLanguages", "ChangeClase", "EditTeachers"
  teachersSearch: "",
  teachersFound: null,// Array of userFound / null: not searched yet, []: nothing found
  user: new User ("NEW_USER"), // of class user, saved on DB
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
      case "USER_LOGIN_PENDING": {
        return {...state, dbStatus: "Login_Pending"}
      }
      case "USER_LOGIN_REJECTED": {
        return {...state, dbStatus: "Login_Rejected", error: action.payload}
      }

      case "USER_LOGIN_FULFILLED": {
        console.log(new User(action.payload.data));
        return {
          ...state,
          dbStatus: "Login_Fulfilled",
          user: new User(action.payload.data),
        }
      }

      case "USER_CHANGE_LANGUAGE": {
        let user = state.user
        user.selectedLanguage = action.payload.selectedLanguage
        return { ...state, user }
      }
    }

    return state
}
