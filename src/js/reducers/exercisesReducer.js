import Exercise from "../classes/Exercise"


var initialState = {
  dbStatus: "",
  exercises: [],
}

export default function reducer(state = initialState, action) {

    switch (action.type) {

      // OBS: Exercises from Readings are not init @ login. No need to download all info about all exercises in events.
      //      Only those that user is interested about


      case "EXERCISE_GETBYLEVEL_PENDING": {
        return {...state, dbStatus: "GetExercise_Pending"}
      }
      case "EXERCISE_GETBYLEVEL_REJECTED": {
        return {...state, dbStatus: "GetExercise_Rejected", error: action.payload}
      }

      case "EXERCISE_GETBYLEVEL_FULFILLED": {
        const exercise = new Exercise(action.payload.data)
        let exercises = [].concat(state.exercises)
        exercises.push(exercise);

        return { ...state, dbStatus: "Login_Fulfilled", exercises, }
      }


    }

    return state
}
