import Race from "../classes/Race"


var initialState = {
  dbStatus: "",
  races: [],
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
        let races = []
        if (languages) languages.forEach((language)=>{ races = races.concat(language.races) })
        races = races.map((race) => {return new Race(race)})

        return { ...state, dbStatus: "Login_Fulfilled", races, }
      }
    }

    return state
}
