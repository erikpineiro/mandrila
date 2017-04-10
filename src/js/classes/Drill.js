
export default class Drill {
	constructor(args) {

		if (!args) {
			// DEFAULT
			args = {
				// ONLY VALUES THAT MUST BE
				eventID: "VOID", // Means it hasn't been uploaded yet. It's the active Drill
			}
		}

		for (var key in args) this[key] = args[key]

		// NORMALIZE READINGS (Coming from DB). Generalized to >1 reading on each Drill (even if we in v0 only have one reading per drill)
		if (this.readings && this.readings.length > 0) {
			this.readings = this.readings.map((reading) => { 
				if (typeof reading != "string") return reading.readingID
				else return reading
			})
		}

    return this // Allow chaining
	}

}


