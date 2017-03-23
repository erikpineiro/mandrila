State {
	// In hierarchical order: The top ones have precedence over deciding what to show
	app: {
		state // StartingUp / Settings / Home / Drill / ReviewDrill / Race / ReviewRace. Future: See HomeWork
	}
	settings: {
		selectedSetting // "" (not showing), "UserInfo", "EditLanguages", "ChangeClase", "EditTeachers"
		teachersFound// Array of userFound
	}
	home: {
		choosingLevel { // Used when user chooses specific level for drill
			example
			selectedLevel //0: nothing selected
		}
	}
	drill: {
		drill //of class reading
		dbStatus // to keep track of how DB-fetching is going
		offerClaseChange // Flag to Ask user if she wants to change class. After Home / New! Button click
		reporting // Flag to Show Reporting Window
		reviewing // Flag about exercise being reviewed after submission
		submitted // Flag report having been submitted (before reviewing - info db (?))
	}
	race: {
		race // of class race
		selectedScene
		dbStatus // to keep track of how DB-fetching is going
		reporting // Flag
		timer
		ending //boolean. Shows quick info: "Time up!" or similar
		reviewing
	}
	reviewedDrill: {
		// Comes here from either Home or Drill
		drill //of class drill... Contains reading
		dbStatus // to keep track of how DB-fetching is going
		reporting // Flag
	}
	reviewedRace: {
		race //of class race
		selectedScene
		dbStatus // to keep track of how DB-fetching is going
		reporting // Flag
	} // of class Race
	user: {
		dbStatus
		user // of class user, saved on DB
	}
}

DBActions {
	exerciseByLevel_GET
	exerciseByID_GET // To fetch details about an exercise
	exercise_PUT
	exercise_UPDATE // Edits & Reports
	exercise_REMOVE

	raceByID_GET // To fetch details about a race
	raceByLevel_GET // Gets opponents & exercises (at least two AJAX calls)

	reading_PUT
	reading_UPDATE

	report_ADD
	report_REMOVE
	report_UPDATE

	userByID_GET
	usersSearch_GET // When searching for teachers. Maybe: search friends
	user_PUT
	user_UPDATE
	user_REMOVE
}

Actions {
	APP_DRILL_OPEN(exercise) // Also from New! after Drill Review
	APP_DRILL_CLOSE() // Closes drill, Goes Home
	APP_LOGIN(userID, clave) : _PENDING, _REJECTED, _FULFILLED
	APP_RACE_OPEN(race) 
	APP_RACE_CLOSE() // Closes race, Goes Home (Home button in Race)
	APP_SELECT_LANGUAGE() // Changes current language
	APP_SETTINGS_CHOOSE() // Show page that lets user go to any settings-page
	APP_SETTINGS_CLOSE()

	DRILL_CANCEL()
	DRILL_CHOOSELEVEL_OPEN()
	DRILL_CHOOSELEVEL_CLOSE()
	DRILL_CHOOSELEVEL_SHOWEXAMPLE(level)
	DRILL_DONE() : _PENDING, _REJECTED, _FULFILLED // After Review. This is were Rating is passed to DB. 
	DRILL_UPDATE_MARK(nStatement, markedAs)
	DRILL_SUBMIT(drillInfo) : _PENDING, _REJECTED, _FULFILLED
	// DRILL_RANK(rank) : _PENDING, _REJECTED, _FULFILLED
	DRILL_REVIEW() // After submission is Fulfilled

	EXERCISE_RATE(exerciseID, rating) : _PENDING, _REJECTED, _FULFILLED
	EXERCISE_REPORT(report) : _PENDING, _REJECTED, _FULFILLED


	RACE_CANCEL()
	RACE_OPEN(clase) : _PENDING, _REJECTED, _FULFILLED
	// RACE_OPEN_TOGGLEREMINDER()
	RACE_SELECT_SCENE(nScene)
	RACE_UPDATE_MARK(nScene, nStatement, markedAs)
	RACE_OVER() // When timer is 0. Shows info Race is over
	RACE_REVIEW() // Shows review
	RACE_SET_TIMER() // params: "-1",one second less "x" set to x seconds
									 // Update opponents here instead of own action (RACE_UPDATE_OPPONENTS() : _PENDING, _REJECTED, _FULFILLED)
	RACE_UPDATE_ONEMARK(drillNr, statementNr, mark, result) : _PENDING, _REJECTED, _FULFILLED


	REPORT_OPEN(exercise)
	REPORT_TOGGLE_ITEM(item)
	REPORT_DONE()

	SETTINGS_CLASE_CHANGE(language, newClase) : _PENDING, _REJECTED, _FULFILLED // Makes the change in users DB
	SETTINGS_LANGS_ADD(language) : _PENDING, _REJECTED, _FULFILLED
	SETTINGS_LANGS_REMOVE(language) : _PENDING, _REJECTED, _FULFILLED
	SETTINGS_LANGS_SETAPPLANG (language) : _PENDING, _REJECTED, _FULFILLED
	SETTINGS_OPEN (which)
	SETTINGS_TEACHERS_ADD(userID) : _PENDING, _REJECTED, _FULFILLED
	SETTINGS_TEACHERS_REMOVE(userID) : _PENDING, _REJECTED, _FULFILLED
	SETTINGS_TEACHERS_SEARCH(string) : _PENDING, _REJECTED, _FULFILLED
	SETTINGS_TEACHERS_SELECT(userID)
	SETTINGS_INFO_ALIAS_WRITTEN(alias) : _PENDING, _REJECTED, _FULFILLED
	SETTINGS_INFO_SAVE(userInfo) : _PENDING, _REJECTED, _FULFILLED

	USER_SELECT_READING_LANGUAGE(language) : _PENDING, _REJECTED, _FULFILLED

}

State and Reducers {
	app: {
		state:
			// StartingUp / Settings / Home / Drill / ReviewDrill / Race / ReviewRace. Future: See HomeWork
			APP_DRILL_OPEN_PENDING() / value: "Drill". // App will henceforward look into state.drill to decide view
			APP_DRILL_CLOSE() / value:"Home"
			// APP_LOGIN(userID, clave) : _PENDING, _REJECTED, _FULFILLED
			APP_RACE_OPEN() / value: "Race" // App will henceforward look into state.race to decide view
			APP_RACE_CLOSE() // Closes race, Goes Home (Home button in Race)
			APP_SETTINGS_CHOOSE() value: "Settings" // Show page that lets user go to any settings-page
			APP_SETTINGS_CLOSE()

		state // StartingUp / Settings / Home / Drill / ReviewDrill / Race / ReviewRace. Future: See HomeWork
	}
	settings: {
		selectedSetting:
			SETTINGS_OPEN(which) values: EditLanguages, EditUserInfo, EditTeachers, ChangeClase

		teachersFound// Array of userFound
	}
	home: {
		choosingLevel { // Used when user chooses specific level for drill
			example
			selectedLevel //0: nothing selected
		}
	}
	drill: {
		drill //of class reading
		dbStatus // to keep track of how DB-fetching is going
		offerClaseChange // Flag to Ask user if she wants to change class. After Home / New! Button click
		reporting // Flag to Show Reporting Window
		reviewing // Flag about exercise being reviewed after submission
		submitted // Flag report having been submitted (before reviewing - info db (?))
	}
	race: {
		race // of class race
		selectedScene
		dbStatus // to keep track of how DB-fetching is going
		reporting // Flag
		timer
		ending //boolean. Shows quick info: "Time up!" or similar
		reviewing
	}
	reviewedDrill: {
		// Comes here from either Home or Drill
		drill //of class drill... Contains reading
		dbStatus // to keep track of how DB-fetching is going
		reporting // Flag
	}
	reviewedRace: {
		race //of class race
		selectedScene
		dbStatus // to keep track of how DB-fetching is going
		reporting // Flag
	} // of class Race
	user: {
		user, appLanguage -> SETTINGS_LANGS_SETAPPLANG_PENDING (language)

		dbStatus
	}
}

Classes {
	dbStatus: {
		error
		fetching
		fulfilled
	}
	drill: {
		reading
	}
	exercise: {
		exerciseID
		reports // Array of report
		scene
		statements // aray of oneSatement
		userID // Creator
	}
	language: {
		clase
		xps
		events // drills & races
	}
	statement: {
		statement
		isTrue // 0 no, 1:yes
		markedAs //-1 not marked, 0 as false, 1 as true
	}
	teacher: {
		userID	
	}
	participant: {
		userID
		readings // array of reading
		position 
		xpsRace // special for Race (from position, #participants etc)
	}
	race: {
		raceID
		participants // Array of participant
	}
	reading: {
		readingID
		exerciseID
		userID // Reader
		scene // duplicated from exercise. To show in home-page
		results: [] //1: correct, 0: incorrect, -1:not answered
		userClase // @dateTime
		exerciseClase // @dateTime
		xpsReading // made on the reading (as opposed to xpsRace)
		dateTime
		wasRace // raceID if it was a race (non-ortogonal) (useful for future SQL queries)
		rated // 0: exercise not rated, 1: rated 1 star, etc.
	}
	reporting: {
		current // report being filled
		reports // Array of report
		dbStatus
	}
	report: {
		exerciseID
		userID // Reporter
		partReported //0: scene, 1: first statement, 2: 2nd statememt, etc
		reported // timeStamp
		solved // timeStamp
	}
	user: {
		userID
		clave
		alias
		userInfo {
			birthday
			country
			zip
			description
		}
		settings {
			appLanguage
			readingLanguage
			reminders // any reminders needed?
		}
		teachers// Array of teacher
		languages // Array of language
	}
	userFound: {
		userID
		userInfo
	}
}


Layout {

	Left {
		State {}
		Function {}
		Components {}

	}

}


