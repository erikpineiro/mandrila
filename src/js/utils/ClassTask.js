
export default class Task {
	constructor() {
    this.idTask = "voidID";
		this.scene = "voidScene";
		this.statements = [];
		this.level = 0;
    this.anchor = 0;
    this.idCreator = "0";
    this.nextTask = "0";
		this.previousTask = "0";

		return this;
	}

	initFromDB(data){
	  data = JSON.parse(data);

    const task = data;
    this.idTask = task['idTask'];
    this.idCreator = task['idCreator'];
    this.level = task['Level'];
    this.anchor = task['Anchor'];
    this.nextTask = task['NextTask'];
    this.previousTask = task['PreviousTask'];

    // EXTRACT SCENE & STATEMENTS. All in Content
    const content = JSON.parse(task['Content']);
    this.scene = content['main'];
    this.statements = content['statements'];

    return this;
	}
}


