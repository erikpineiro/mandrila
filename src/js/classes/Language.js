
import * as utils from "../utils/simpleFunctions"

export default class Language {
	constructor(args) {

		if (!args) {
			// DEFAULT
			args = {
				// ONLY VALUES THAT MUST BE
				languageID: "VOID", // Means it hasn't been uploaded yet.
				langCode: "EN_GB",
			}
		}

		for (var key in args) this[key] = args[key]

		// DEFAULTS. These need not be set when creating Language. If not set, they get these values
		if (!this.clase) this.clase = 1
		if (!this.xps) this.xps = 0

		// NORMALIZE DRILLS & RACES (Coming from DB)
		if (this.drills) {
			if (typeof this.drills[0] != "string") this.drills = this.drills.map((drill)=>{ return drill.eventID })
			// Otherwise they're already Normalized
		}
		if (this.races) {
			if (typeof this.races[0] != "string") this.races = this.races.map((race)=>{ return race.eventID })
			// Otherwise they're already Normalized
		}

    return this // To chain stuff
	}

	get events() { return [].concat((this.drills || []), (this.races || [])) }

}


