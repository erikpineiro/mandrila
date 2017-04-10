import Drill from "../classes/Drill"


var initialState = {
  dbStatus: "",
  drills: [],
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
        let drills = []
        if (languages) languages.forEach((language)=>{ drills = drills.concat(language.drills) })
        drills = drills.map((drill) => {return new Drill(drill)})

        return { ...state, dbStatus: "Login_Fulfilled", drills, }
      }

      
    }

    return state
}
