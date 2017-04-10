
export default class Race {
	constructor(args) {

		if (!args) {
			// DEFAULT
			args = {
				// ONLY VALUES THAT MUST BE
				eventID: "VOID", // Means it hasn't been uploaded yet. It's the active Drill
			}
		}

		for (var key in args) this[key] = args[key]

		// NORMALIZE READINGS (Coming from DB).
		if (this.readings && this.readings.length > 0) {
			this.readings = this.readings.map((reading) => { 
				if (typeof reading != "string") return reading.readingID
				else return reading
			})
		}

    return this // Allow chaining
	}

}


