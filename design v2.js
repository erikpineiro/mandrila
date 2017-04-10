DBActions {
	event_20more_GET // If user wants to see more than 20 default events (drillReadings, races)

	exerciseByLevel_GET
	exerciseByID_GET // To fetch details about an exercise
	exercise_POST
	exercise_PUT // Edits & Reports
	exercise_DELETE

	raceByID_GET // To fetch details about a specific race
	raceByLEvel_POST  // Gets opponents & exercises, then creates a race
	race_PUT

	reading_POST
	reading_PUT

	report_ADD
	report_DELETE
	report_PUT

	userByID_GET
	userLogin_GET // Checks if userName + password are ok
	userNameAvailable_GET // Checks if name of user is available
	usersSearch_GET // When searching for teachers. Maybe: search friends
	user_POST
	user_PUT
	user_DELETE
}

State and Reducers {
	showing:
		showing  // SU_ChooseLang, SU_TermsOfUse, NoUser, Login, Home(user logged in), Settings, Drill, Race
		dbStatus

		EXERCISE_CLOSE() : showing = "Home"
		EXERCISE_BYID_REVIEW_PENDING() : showing = "Drill"
		EXERCISE_GETBYLEVEL_DRILL_PENDING() : showing = "Drill"

		RACE_CLOSE() : showing="Home"
		RACE_GETBYID_REVIEW_PENDING(level) : showing = "Race"
		RACE_GETBYLEVEL_COMPETE_PENDING(level) : showing = "Race"

		USER_SHOW(), showing = "User"
		USER_CLOSE(), showing = "Home"
		USER_LOGIN_OPEN(), showing = "Login"
		USER_LOGOUT(), showing = "NoUser"
		USER_SIGNUP_OPEN(), showing = "NoUser"

	home: //
		dbStatus
		selectedLevel
		textSample

		HOME_OPEN_LEVEL_CHOOSER() : selectedLevel = 0 
		HOME_CLOSE_LEVEL_CHOOSER() : selectedLevel = -1
		HOME_SHOW_LEVEL_EXAMPLE_PENDING(level) : selectedLevel = -1, dbStatus = "ChoosingLevel_Pending"
		HOME_SHOW_LEVEL_EXAMPLE_REJECTED(error) : dbStatus = "ChoosingLevel_Rejected"
		HOME_SHOW_LEVEL_EXAMPLE_FULFILLED(response) : textSample = response, dbStatus = "ChoosingLevel_Fulfilled"
		HOME_SHOW_LEVEL_EXAMPLE_CLOSE() : textSample = "", dbStatus = ""

		HOME_GET_MORE_EVENTS_PENDING() : dbStatus = "GettingMoreEvents_Pending"
		HOME_GET_MORE_EVENTS_REJECTED() : dbStatus = "GettingMoreEvents_Rejected"
		HOME_GET_MORE_EVENTS_FULFILLED() : dbStatus = "GettingMoreEvents_Fulfilled"
		HOME_GET_MORE_EVENTS_CLOSE() : dbStatus = ""
	
	user: 
		dbStatus
		selectedSetting // "" (not showing), "UserInfo", "EditLanguages", "ChangeClase", "EditTeachers"
		teachersSearch
		teachersFound// Array of userFound
		user // of class user, saved on DB

		USER_OPEN(which) : selectedSetting
		USER_CLOSE() : dbStatus = "", selectedSetting = "", userPending = null, teachersSearch="", teachersFound=null
		USER_LOGOUT(): user=null


		// LOGIN
		USER_LOGIN_PENDING(alias, clave) : dbStatus="Login_Pending"
		USER_LOGIN_REJECTED(error) : dbStatus="Login_Rejected"
		USER_LOGIN_FULFILLED(response) : user=response, dbStatus="Login_Fulfilled"
		USER_LOGIN_CLOSE() : dbStatus=""

		// SIGNUP
		USER_SIGNUP_PENDING() : dbStatus="SignUp_Pending"
		USER_SIGNUP_REJECTED(error) : dbStatus="SignUp_Rejected"
		USER_SIGNUP_FULFILLED(response) : user=response, dbStatus="SignUp_Fulfilled" // Automatic login.

		// CLASE
		USER_CLASE_CHANGE_PENDING(language, newClase) :  user.languages[].clase, dbStatus = "ClaseChange_Pending"
		USER_CLASE_CHANGE_REJECTED(error) :  dbStatus = "ClaseChange_Rejected"
		USER_CLASE_CHANGE_FULFILLED(response) :  dbStatus = "ClaseChange_Fulfilled"
		USER_CLASE_CHANGE_CLOSE() :  dbStatus = ""

		// LANGUAGES
		USER_LANGS_ADD_PENDING(language) : user.languages[],  dbStatus = "AddLanguage_Pending" //addLanguage with dbStatus = "pendingAdd"
		USER_LANGS_ADD_REJECTED(error) : user.languages[],  dbStatus = "AddLanguage_Rejected" //remove Language with dbStatus = "pendingAdd"
		USER_LANGS_ADD_FULFILLED(response) : user.languages[],  dbStatus = "AddLanguage_Fulfilled" //change Language with dbStatus = "pendingAdd" to dbStatus = ""
		USER_LANGS_ADD_CLOSE() : dbStatus = "" //remove Language with dbStatus = "pendingAdd"

		USER_LANGS_DELETE_PENDING(language) : user.languages[], dbStatus = "AddLanguage_Pending" //change language to dbStatus = "pendingDELETE"
		USER_LANGS_DELETE_REJECTED() : user.languages[], dbStatus = "AddLanguage_Rejected" //change language with dbStatus = "pendingDELETE" to dbStatus = ""
		USER_LANGS_DELETE_FULFILLED() : user.languages[], dbStatus = "AddLanguage_Fulfilled" //remove language with dbStatus = "pendingDELETE"
		USER_LANGS_DELETE_CLOSE() : user.languages[], dbStatus = "" //change language with dbStatus = "pendingDELETE" to dbStatus = ""

		// APP_LANGUAGE
		USER_LANGS_SETAPPLANG_PENDING(language) : user.languageAPP, dbStatus = "SetLanguageApp_Pending"
		USER_LANGS_SETAPPLANG_REJECTED(error) : dbStatus = "SetLanguageApp_Rejected"
		USER_LANGS_SETAPPLANG_FULFILLED(response) : dbStatus = "SetLanguageApp_Fulfilled"
		USER_LANGS_SETAPPLANG_CLOSE() : dbStatus = ""

		// TEACHERS
		USER_TEACHERS_ADD_PENDING(userID) : user.teachers[], dbStatus="addTeacher_Pending" // Add teacher with dbStatus="pendingADD"
		USER_TEACHERS_ADD_REJECTED(error) : user.teachers[], dbStatus="addTeacher_Rejected" // Remove teacher with dbStatus="pendingADD"
		USER_TEACHERS_ADD_FULFILLED(response) : user.teachers[], dbStatus="addTeacher_Fulfilled" // Change teacher with dbStatus="pendingADD" to dbStatus=""
		USER_TEACHERS_ADD_CLOSE() : user.teachers[], dbStatus=""  // Remove teacher with dbStatus="pendingADD" (if there is one)

		USER_TEACHERS_DELETE_PENDING(userID) : user.teachers[], dbStatus="deleteTeacher_Pending" // Change teacher dbStatus="pendingDELETE"
		USER_TEACHERS_DELETE_REJECTED(error) : user.teachers[], dbStatus="deleteTeacher_Rejected" // Change teacher dbStatus="pendingDELETE" to ""
		USER_TEACHERS_DELETE_FULFILLED(response) : user.teachers[], dbStatus="deleteTeacher_Fulfilled" // Delete teacher with dbStatus="pendingDELETE"
		USER_TEACHERS_DELETE_CLOSE() : user.teachers[], dbStatus="" // Change teacher dbStatus="pendingDELETE" to "" (if there is one)

		USER_TEACHERS_SEARCH_PENDING(string) : teachersSearch, dbStatus="searchTeachers_Pending"
		USER_TEACHERS_SEARCH_REJECTED(error) : dbStatus="searchTeachers_Rejected"
		USER_TEACHERS_SEARCH_FULFILLED(response) : teachersFound = response, dbStatus="searchTeachers_Fulfilled"
		USER_TEACHERS_SEARCH_CLOSE() : teachersSearch = "", teachersFound = null, dbStatus=""

		// USER_INFO
		USER_INFO_ALIAS_WRITTEN_PENDING(alias) : userAliasPending, dbStatus="userAlias_Pending"
		USER_INFO_ALIAS_WRITTEN_REJECTED(error) : dbStatus="userAlias_Rejected"
		USER_INFO_ALIAS_WRITTEN_FULFILLED(response) : dbStatus="userAlias_Fulfilled_OK" / "userAlias_Fulfilled_InUSE"

		USER_INFO_SAVE_PENDING(userInfo) : dbStatus="userInfoSave_Pending"
		USER_INFO_SAVE_REJECTED(error) : dbStatus="userInfoSave_Rejected"
		USER_INFO_SAVE_FULFILLED(response) : user=response, dbStatus="userInfoSave_Fulfilled"
		USER_INFO_SAVE_CLOSE() : dbStatus=""
	
	drilling: 
		readingID // "" => Exercise/Reading not fetched yet
		dbStatus // to keep track of how DB-fetching is going
		offerClaseChange // Flag to Ask user if she wants to change class. After Home / New! Button click
		// submitted // Flag report having been submitted (before reviewing - info db (?))
		reviewing // Flag: is being reviewed
		done  // Flag. After Review. This is were Rating is passed to DB. 

		reset() : submitted=false, reviewing=false, offerClaseChange=false, done=false, readingID=""

		EXERCISE_CLOSE() : reset()

		EXERCISE_BYID_REVIEW_PENDING(readingID) : reset(), reviewing=true, readingID, dbStatus="reviewByID_Pending"
		EXERCISE_BYID_REVIEW_REJECTED(error) : dbStatus="reviewByID_Rejected"
		EXERCISE_GETBYID_REVIEW_FULFILLED(response) : dbStatus="reviewByID_Fulfilled"
		EXERCISE_BYID_REVIEW_CLOSE() : readingID=null, dbStatus=""

		EXERCISE_GETBYLEVEL_DRILL_PENDING(level) : reset(), dbStatus="drillByLevel_Pending"
		EXERCISE_GETBYLEVEL_DRILL_REJECTED(error) : dbStatus="drillByLevel_Rejected"
		EXERCISE_GETBYLEVEL_DRILL_FULFILLED(response) : readingID, dbStatus="drillByLevel_Fullfilled"
		EXERCISE_GETBYLEVEL_DRILL_CLOSE() : readingID=null, dbStatus=""		

		READING_RATE_PENDING(rating) : done=true, dbStatus="done_Pending"
		READING_RATE_REJECTED() : dbStatus="done_Rejected"
		READING_RATE_FULFILLED(response) : dbStatus="done_Fulfilled"
		READING_RATE_CLOSE() : dbStatus=""

		READING_SUBMIT_PENDING() : dbStatus="submit_Pending"
		READING_SUBMIT_REJECTED() : dbStatus="submit_Rejected"
		READING_SUBMIT_FULFILLED(response) : dbStatus="submit_Fulfilled"
		READING_SUBMIT_CLOSE() : reviewing=true, dbStatus=""

	racing:
		race // raceID
		selectedExercise // Race can have more than one exercise.
		maximizedExercises // Array of indexes. Indexes of the exercises that are maximized right now. default=[]
		dbStatus // to keep track of how DB-fetching is going
		timer
		ending //Flag. When timer hits 0 => ending = true. Shows quick info: "Time up!" or similar. 2s later => reviewedRace = race, race = null, ending = false, change showing to reviewRace
		reviewing // Flag: is being reviewed

		resetRacing(): timer=59, ending=false, reviewing=false, selectedExercise=0, dbStatus="", maximizedExercises=[]

		RACE_CLOSE() : resetRacing()

		RACE_GETBYID_REVIEW_PENDING(level) : resetRacing(), reviewing=true, dbStatus="reviewByID_Pending"
		RACE_GETBYID_REVIEW_REJECTED(error) : dbStatus="reviewByID_Rejected"
		RACE_GETBYID_REVIEW_FULFILLED(response) : dbStatus="reviewByID_Fulfilled"
		RACE_GETBYID_REVIEW_CLOSE() : dbStatus=""

		RACE_GETBYLEVEL_COMPETE_PENDING(level) : resetRacing(), dbStatus="competeByLevel_Pending"
		RACE_GETBYLEVEL_COMPETE_REJECTED(error) : dbStatus="competeByLevel_Rejected"
		RACE_GETBYLEVEL_COMPETE_FULFILLED(response) : dbStatus="competeByLevel_Fulfilled"
		RACE_GETBYLEVEL_COMPETE_CLOSE() : dbStatus=""

		RACE_MAX_EXERCISE(nExercise) : maximizedExercises
		RACE_MIN_EXERCISE(nExercise) : maximizedExercises
		RACE_OVER() : ending=true
		RACE_REVIEW() : ending=false, reviewing=true, selectedExercise=0
		RACE_SELECT_EXERCISE(nExercise) : selectedExercise=nExercise
		RACE_SET_TIMER() : timer // params: "-1",one second less "x" set to x seconds

		RACE_PUT_OPPONENTS_PENDING() : dbStatus="putOpponents_Pending" // Needed??
		RACE_PUT_OPPONENTS_REJECTED(error) : dbStatus="putOpponents_Rejected"
		RACE_PUT_OPPONENTS_FULFILLED(response) : dbStatus="" // No need to inform that all is ok here. Just update opponents (done in readings)

	reporting:
		exerciseID // if ="", no reporting going on
		reportedPart // part that is being reported (0: Scene, 1: first Statement, etc)
		reportsMaximized // array of indexes (indexes of reports maximized) def=[] (all minimized)
		newReporting // Flag: new report begin created

		REPORT_OPEN(exerciseID, part) : exerciseID, reportedPart, reportsMaximized=[], newReporting=false
		REPORT_SELECT_REPORT(number): reportNumber
		REPORT_PENDING() : dbStatus="report_Pending"
		EXERCISE_REPORT_REJECTED(error) : dbStatus="report_Rejected"
		EXERCISE_REPORT_FULFILLED(response) : dbStatus="report_Fulfilled"
		EXERCISE_REPORT_CLOSE() : exerciseID=-1, newReporting=false, dbStatus=""

	claseChange:
		status // null, open, pending, rejected, fulfilled

		USER_CLASE_CHANGE_PENDING(language, newClase) :  status="ClaseChange_Pending"
		USER_CLASE_CHANGE_REJECTED(error) :  status="ClaseChange_Rejected"
		USER_CLASE_CHANGE_FULFILLED(response) :  status="ClaseChange_Fulfilled"
		USER_CLASE_CHANGE_CLOSE() :  status=null

	exercises: 
		key: value
		EXERCISE_GETBYID_REVIEW_FULFILLED(response) : // update/create corresponding key with response
		EXERCISE_GETBYLEVEL_DRILL_FULFILLED(response) : // create corresponding key with response

		EXERCISE_REPORT_OPEN(exerciseID, part) : //update corresponding key by updating reporting by creating new report for part (status=pending).
		EXERCISE_REPORT_MARK_OPTION(readingID, part, number, kinds): //update corresponding key by updating report.
		EXERCISE_REPORT_FULFILLED(response) : // update corresponding key by updating report. Status=submitted
	
		RACE_GETBYID_REVIEW_FULFILLED(response) : //create necessary keys with response (create exercises)
		
		USER_LOGOUT(): // Remove all properties

	races: 
		key: value
		RACE_GETBYID_REVIEW_FULFILLED(response) : //update corresponding key with response (must include raceID)
		USER_LOGIN_FULFILLED
		USER_LOGOUT(): // Remove all properties

	readings: 
		key: value
		// Responses. Make sure they always incluse exerciseID, to find the key
		EXERCISE_GETBYID_REVIEW_FULFILLED(response) : // update corresponding key with response
		EXERCISE_GETBYLEVEL_DRILL_FULFILLED(response) : // create corresponding key with response

		RACE_GETBYID_REVIEW_FULFILLED(response) : //update corresponding key with response (create readings, must keep them normalized)
		RACE_GETBYLEVEL_COMPETE_FULFILLED(response) : // create keys, one for each opponent, plus for user herself
		RACE_PUT_OPPONENTS_FULFILLED(response) : // update corresponding keys (only opponents, selfUser is updated with READING_PUTMARK)

		READING_RATE_PENDING(readingID, rating) : // update corresponding key with rating (negative values = pending)
		READING_RATE_FULFILLED(response) : // update corresponding key with response (must include rating, positive values = saved)
		READING_PUTMARK (readingID, nStatement, markedAs) : 	// update corresponding key with parameters
																													// when user is in race, readingMarks must be updated immediately, not on submit.
																													// Otherwise opponents cannot see what's happening. 
																													// But we need not change the State for that. If there are internet problems,
																													// we'll catch them when trying to update the opponents (RACE_PUT_OPPONENTS_REJECTED and RACE_PUT_OPPONENTS_FULFILLED)
		USER_LOGOUT(): // Remove all properties		

	drills:
		key: value
		USER_LOGIN_FULFILLED
		USER_LOGOUT(): // Remove all properties


	languages:
		key: value
		USER_LOGIN_FULFILLED
		USER_LOGOUT(): // Remove all properties


}

Classes {
	dbStatus: {
		error
		fetching
		lastUpdated
	}
	Drill: {
		reading
	}
	Exercise: {
		// DB
		contents
		exerciseID
		level
		levelAnchor
		nextExercise // if there is one (exerciseID)
		previousExercise // if there is one (exerciseID)
		reports // Array of report
		creatorID // userID
		// LOCAL
		scene
		statements // aray of oneSatement
	}
	Language: {
		clase
		events // concat of races & drills
		races // Array of raceIDs
		drills // Array of drillIDs
		langCode
		xps
	}
	statement: {
		statement
		isTrue // 0 no, 1:yes
		markedAs //-1 not marked, 0 as false, 1 as true
	}
	teacher: {
		userID
		dbStatus
	}
	participant: {
		userID
		readings // array of readingID
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
		exerciseLevel // @dateTime
		xpsReading // made on the reading (as opposed to xpsRace)
		dateTime
		wasRace // raceID if it was a race (non-ortogonal) (useful for future SQL queries)
		rating // 0 = not rated. 1...4 (saved rating) -1...-4 (pending rating)
	}
	reporting: {
		current // index of report being filled
		reports // Array of report
	}
	report: {
		exerciseID
		kinds // String that may contain: 0: spelling, 1:grammar, 2: etc
		partReported //0: scene, 1: first statement, 2: 2nd statememt, etc
		payload // comment from reporter: misspelled words, incorrect sentence, etc.
		reportindTime // timeStamp
		status // pending / submitted / fixing / done / fake
		userID // Reporter
	}
	user: {		
		// DB
		userID
		clave
		alias
		birthday
		country
		zip
		description
		teachers// Array of teacher
		languages // Array of language
		selectedLanguage // index of selected language in languages
		languageAPP // language of the app
	}
	userFound: {
		userID
		userInfo
	}
	settings: {
		appLanguage
		readingLanguage
		reminders // any reminders needed?
	}
}

// COMPONENTS
Layout {

	Left {
		User {
			Settings
			Alias
			Hamburger //Logout
			Languages {
				Language {
					// one for each user.languages
					Depends: user.selectedLanguage
					language.sass

					Level
					XPS
					LanguageCode
				}
			}
		}
		NoUser {
			LoginButton
			SignupBox {
				Title
				InputAlias
				InputPassword1
				InputPassword2
				SignupSubmit
			}
		}
		Login {
			SignupButton
			LoginBox {
				Title
				InputAlias
				InputPassword
				InCaseForget
				ForgotPassword
				LoginSubmit
			}
		}
	}
	Mid {
		Home1 {
			EventList {
				Events {
					DrillEvent {
						XPSMade
						EventBodyDrill {
							Level
							SceneIntro
							Results
						}
						TimeSince
					}
					RaceEvent {
						XPSMade
						EventBodyRace {
							Results
						}
						TimeSince
					}
				}
				MoreEventsButton
			}
			DrillButtons {
				DrillTeacher
				DrillThis
				DrillAny
			}
			RaceButton {}
			ChooseLevel {
				LevelBox
				ExampleBox {
					TextSample
					NewSample_CancelButton
				}
			}
		}
		Drilling1 {
			StatusMessages
			Scene {
				MaxMinToggle
				Content
				ReportButton
			}
		}
		Racing1 {
			StatusMessages
			RaceZeroPage {
				Language
				RaceAtLevel
				StatusInformation
				CancelRaceButton
			}
			Scenes {
				// one Scene for each scene
				Scene {
					MaxMinToggle
					Content
					ReportButton
				}
			}
		}
		Reporting {
			Title
			CloseButton
			Content // Different if Statement @ Review => Show true / false
			Reports {
				// one for each report
				Report {
					Title // #Report, DateTime. OR "New Report"
					KindsReported {
						// one for each kind reported (Spelling, Grammar, etc)
						Kind
					}
					KindsToReport {
						Kind
					}
					Comments
					Submit_CancelReportButtons {
						StatusMessages
						SubmitReport
						CancelReport
					}
				}
			}
			AddNewReportButton
		}
		User {
			CloseButton
			UserInfo {}
			EditLanguages {}
			EditTeachers {}
			ChooseClase {}
		}
	}
	Right {
		Home2 {
			// About, Adds, Tips, whatever
			HTML
		}
		Drilling2 {
			StatusMessages
			XPSDrillScored // Only when reviewing and Only for self
			Statements {
				// one Statement per statement
				Statement {
					Marks {
						// One Mark for True and one for false
						Mark {
							Mark
							CorrectMark // Only when reviewing & if chosen
							XPSEarned // Only when reviewing & if chosen
						}
					}
					ReportButton
					Content
				}
			}
			Rating {
				StatusMessages
				Label, Stars
			}
			Done_NewButtons // Only when reviewing
			Submit_CancelDrillButtons {
				StatusMessages
				SubmitDrill
				CancelDrill
				// Only when drilling
			}
		}
		Race2 {
			Instructions // Big if preparing race. Small if racing. But can be maximized/minimized if racing
			StatusMessages
			XPSRaceScored // Only when reviewing and Only for self
			Scores {
				// One for each player, including self
				Score {
					Identifier
					ScoreExercise {
						// One for each exercise
						ResultsRaceLive {
							// One for each result
							ResultRaceLive
						}
					}
				}
			}
			Timer // Only when racing
			Statements {
				// one for each statement
				Statement // Same as in Drilling2
			}
			Rating // Same as in Drilling
			Done_NewButtons
		}
	}

}

// FOLDER STRUCTURE
src
	js {
		actions {}
		reducers {}
		components {
			Layout
				Left
				Mid
				Right
			Home
				Home
				EventList
				Events
					DrillEvent
						EventBodyDrill
						ResultsDrillEvent
					RaceEvent
						EventBodyRace
						ResultsRaceEvent
					Common
						XPSMade
						LevelEvent
						SceneIntroEvent
						TimeSinceEvent
				MoreEventsButton
				DrillButtons
					DrillButton // one for each: DrillTeacher, DrillThis, DrillAny
				RaceButton
				ChooseLevel
					LevelBox
					SampleBox
					TextSample
					NewSample_CancelButton
			Drill
			Race
			Common
		}
	}

	Components_SASS {
		App
		Home
			homeSass:
			Components:
				Home
				EventList
				Events
					DrillEvent
						EventBodyDrill
						ResultsDrillEvent
					RaceEvent
						EventBodyRace
						ResultsRaceEvent
					XPSMade
					LevelEvent
					SceneIntroEvent
					TimeSinceEvent
				MoreEventsButton
				DrillButtons
					DrillTeacher
					DrillThis
					DrillAny
				RaceButton
				ChooseLevel
					LevelBox
					SampleBox
					TextSample
					NewSample_CancelButton

		User
		Exercises
			Drill
			Race
}




