

var initialState = {
  showing: "Home", // SU_ChooseLang, SU_TermsOfUse, NoUser, Login, Home(user logged in), Settings, Drill, Race
  data: "", // Different values depending on what is showing
}

export default function reducer(state = initialState, action) {

    switch (action.type) {

      case "EXERCISE_GETBYLEVEL_FULFILLED": {
        const exercise = action.payload.data
        return { ...state, showing: "Drill", data: exercise.exerciseID }
      }


    }

    return state
}
