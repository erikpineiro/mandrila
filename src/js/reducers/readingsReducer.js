import Reading from "../classes/Reading"
import Exercise from "../classes/Exercise"


var initialState = {
  dbStatus: "",
  readings: [],
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
        let readings = []
        if (languages) languages.forEach((language)=>{ 
          // From Drills
          language.drills.forEach((drill)=>{ readings = readings.concat(drill.readings) }) 
          // From Races
          language.races.forEach((race)=>{ readings = readings.concat(race.readings) }) 
        })

        readings = readings.map((reading) => {return new Reading(reading)})
        return { ...state, dbStatus: "Login_Fulfilled", readings, }
      }

      // CREATE new reading for an exercise (used for a Drill)
      case "EXERCISE_GETBYLEVEL_FULFILLED": {
        // Payload is exercise-object from DB
        console.log(action)
        const tempExercise = new Exercise (action.payload.data)
        let results = []
        for (let i = 0; i<tempExercise.statements.length; i++) results.push(0)
        const readingArgs = { exerciseID: tempExercise.exerciseID, readingID: "CURRENT", results: JSON.stringify(results) }
        const readings = [...state.readings, new Reading(readingArgs)]
        console.log("created new reader")
        console.log(readings)
        return { ...state, readings }
      }

      // Reading Actions
      case "STATEMENTMARK_CLICKED": {
        const { statementNumber, readingID, kind, isTrue } = action.payload
        const clickedOnTrue = kind == "true"
        const readings = [...state.readings]
        let currentReading = readings.find((reading) => {return reading.readingID == readingID}) // By reference
        const statementIsTrue = isTrue // exercise.statements[statementNumber].isTrue
        const oldResult = currentReading.results[statementNumber]
        const oldClickedOnTrue = (oldResult == 1 && statementIsTrue) || (oldResult == -1 && !statementIsTrue)
        console.log(oldClickedOnTrue, clickedOnTrue)
        console.log(oldResult)
        let result
        if (oldResult == 0) {
          result = statementIsTrue ? (clickedOnTrue ? 1 : -1) : (clickedOnTrue ? -1 : 1)
        } else if (oldClickedOnTrue) {
          if (clickedOnTrue) result = 0 //toggle off (clicked twice on "true")
          else result = statementIsTrue ? -1 : 1
        } else {
          // Must have clicked on false (we don't get here unles user clicks on True or False)
          if (!clickedOnTrue) result = 0 //toggle off (clicked twice on "false")
          else result = statementIsTrue ? 1 : -1
        }
        console.log(currentReading.results)
        console.log(result)
        currentReading.results[statementNumber] = result
        console.log(currentReading.results)

        return { ...state, readings }
      }
    }

    return state
}
