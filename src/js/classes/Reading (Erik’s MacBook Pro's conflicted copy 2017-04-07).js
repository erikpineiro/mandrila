
export default class Reading {

	// When creating a new reading for an exericse (when user wants to drill, for instance)
	// we create it with readingID = "CURRENT"
	// This readingID will be updated to proper one when reading is saved in DB

	constructor(args) {

		if (!args) {
			// DEFAULT
			args = {
				// ONLY VALUES THAT MUST BE
				readingID: "VOID", // Means it hasn't been uploaded yet. It's the active Drill
				exerciseID: "VOID",
				userID: "VOID",
			}
		}

		for (var key in args) this[key] = args[key]

		// NORMALIZE EXERCISE (Coming from DB)
		if (this.exercise) {
			if (typeof this.exercise != "string") this.exercise = this.exercise.exerciseID
			// Otherwise it's already Normalized
		}

    return this // To chain stuff
	}

}


