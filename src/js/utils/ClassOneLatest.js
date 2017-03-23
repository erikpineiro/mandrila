
import {getDateTime} from "./simpleFunctions";

export default class OneLatest {
	constructor() {
    this.idTask = "void";
		this.idUser = "void";
		this.level = 0;
    this.datum = "void";
    this.results = [];
	}

	initFromUser(latest){

    if (latest != "void") {
      this.idTask = latest.idTask;
      this.idUser = latest.idUser;
      this.level = latest.TaskLevelAtTheTime;
      this.datum = latest.Datum;
      this.results = JSON.parse(latest.Results);
    }

    return this;
	}

  initFromObjs(task, results) {
    this.idTask = task.idTask;
    this.idUser = task.idUser;
    this.level = task.level;
    this.datum = Date.now();
    this.results = results;

    return this;
  }
}


