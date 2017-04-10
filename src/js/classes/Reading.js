
export default class Reading {

	constructor(args) {

		if (!args) {
			// DEFAULT
			args = {
				// ONLY VALUES THAT MUST BE
				readingID: "VOID", // Means it hasn't been uploaded yet. It's the active Drill
				exercise: "VOID",
				userID: "VOID",
			}
		}

		for (var key in args) this[key] = args[key]

		// NORMALIZE EXERCISE (Coming from DB)
		if (this.exercise) {
			if (typeof this.exercise != "string") this.exercise = this.exercise.exerciseID
			// Otherwise it's already Normalized
		}

		// MAKE RESULTS AN ARRAY
		if (this.results) {
			this.results = JSON.parse(this.results)
		} else {
			this.results = []
		}

		// FIX DATUM AS DATE OBJECT
		if (this.datum) this.datum = new Date(this.datum)

    return this // To chain stuff
	}

}


