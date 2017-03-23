import React from "react";

import Left from "./Left";
import Main from "./Main";
import Right from "./Right";

import ClassUserInfo from "../utils/ClassUserInfo";
import ClassTask from "../utils/ClassTask";
import {dbAccess} from "../utils/dbAccess";
import {getDateTime} from "../utils/simpleFunctions";


// require('!style!css!sass!../../sass/Layout.sass');
require('!style!css!sass!../../sass/Layout.sass');

export default class Layout extends React.Component {

  constructor(props) {
    super(props);
    
    // STATE
    this.state = {
      YOstatus: "Default", // "CreateTask", "Settings" // Only status that impact the div Right
      loggedIn: null, // contains info about user if someone logged in. Else null.
      task: null, // ask that is presently being shown
    };

    // BINDERS
    this.logUserIn = this.logUserIn.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.pointsUpdate = this.pointsUpdate.bind(this);
    this.showCreateTask = this.showCreateTask.bind(this);
    this.showSettings = this.showSettings.bind(this);
    this.showTask = this.showTask.bind(this);
    this.taskCancel = this.taskCancel.bind(this);
    this.taskDone = this.taskDone.bind(this);
    this.latestUpdate = this.latestUpdate.bind(this);
  }


  latestUpdate(latest) {
    if (!this.state.loggedIn || !this.state.loggedIn.latest) {
      console.log("Problems");
    } else {
      let temp = this.state.loggedIn;
      temp.latest.pop();
      temp.latest.unshift(latest);
      this.setState({loggedIn: temp});
    }
  }
  logUserIn(loggedIn) {
    // Login & Clave have been checked and are OK
    this.setState({loggedIn, status: "Logged"});
  }
  logUserOut () { 
    // This comment needed to get folding arrow
    this.setState ({loggedIn: null});
  }
  pointsUpdate(points) {
    console.log("pointsUpdate: " + points);
    var temp = this.state.loggedIn;
    temp.points += points;
    this.setState({loggedIn: temp});
    return temp.points;
  }
  showCreateTask () {
    console.log ("Create Task");
    this.setState({YOstatus: "CreateTask"});
  }
  showSettings () {
    console.log ("Show Settings");
    this.setState({YOstatus: "Settings"});
  }
  showTask(task) {
    console.log ("Show Task");
    this.setState({task});
  }
  taskCancel() {
    console.log("Task Cancel");
    this.setState({task: null});
  }
  taskDone() {
    console.log("Task Done");
    this.setState({task: null});
  }


  render() {

    console.log(getDateTime());


    const mainProps = {
      YOhandlerLogUserIn: this.logUserIn,
      YOshowSettings: this.showSettings,
      YOshowCreateTask: this.showCreateTask,
      YOshowDefault: this.showDefault,
      handlerLogout: this.logUserOut,
      handlerShowTask: this.showTask,
      handlerCancelTask: this.taskCancel,
      handlerDoneTask: this.taskDone,
      handlerPointsUpdate: this.pointsUpdate,
      handlerLatestUpdate: this.latestUpdate,
    };

    return (
      <div id="Layout">
        <Left />
        <Main {...this.state} {...mainProps}/>
        <Right {...this.state} {...mainProps}/>
      </div>
    );
  }
}
