import Language from "../classes/Language"


var initialState = {
  dbStatus: "",
  languages: [new Language ()],
}

export default function reducer(state = initialState, action) {

    switch (action.type) {

      // Follows User_Login at Startup
      case "USER_LOGIN_PENDING": {
        return {...state, dbStatus: "Login_Pending"}
      }
      case "USER_LOGIN_REJECTED": {
        return {...state, dbStatus: "Login_Rejected", error: action.payload}
      }

      case "USER_LOGIN_FULFILLED": {
        let languages = action.payload.data.languages
        // Create languages
        if (!languages) {
          languages = [new Language ()] // It should never happen. Just in case
        } else {
          languages = languages.map((language) => {return new Language(language)})
        }

        return { ...state, dbStatus: "Login_Fulfilled", languages, }
      }
    }

    return state
}
