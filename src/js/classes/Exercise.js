
export default class Exercise {
	constructor(args) {

    if (!args) {
      // DEFAULT
      args = {
        // ONLY VALUES THAT MUST BE
        exerciseID: "VOID", // Means it hasn't been uploaded yet. It's the exercise that is being created
      }
    }

    for (var key in args) this[key] = args[key]

    // NORMALIZE REPORTS (Coming from DB)
    if (this.reports && this.reports.length > 0) {
      this.reports = this.reports.map((report) => { 
        if (typeof report != "string") return report.reportID
        else return report
      })
    }

    return this // To allow chaining
	}

  get scene() { 
    return (JSON.parse(this.contents)).main 
    }

  get statements() {
    return (JSON.parse(this.contents)).statements 
  }


}


