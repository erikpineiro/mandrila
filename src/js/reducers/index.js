import { combineReducers } from "redux"

import drills from "./drillsReducer"
import exercises from "./exercisesReducer"
import home from "./homeReducer"
import languages from "./languagesReducer"
import races from "./racesReducer"
import readings from "./readingsReducer"
import showing from "./showingReducer"
import user from "./userReducer"

export default combineReducers({
	drills,
	exercises,
  home,
  languages,
  races,
  readings,
  showing,
  user,
})
