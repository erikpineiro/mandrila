import React from "react";

import Settings from "./Right/Settings";
import CreateTask from "./Right/CreateTask";

require('../../sass/Layout.sass');

export default class Right extends React.Component {

  constructor(props) {
    super(props);
    
    // STATE

    // BINDERS
  }



  render() {

    // Dynamic Components
    // Cases:
    // 1. USer NOT Logged in: Show info about why to login
    // 2. User Logged in. this.props.YOstatus (coming from layout)
    //    "Default": Offer possibility to open Settings & Create Task
    //    "Settings": Show Settings
    //    "Create Task": Show Create Task 
    const userLoggedin = this.props.loggedIn;
    var comps = userLoggedin ? "User Logged In" : "User NOT Logged In";

    if (userLoggedin) {
      const YOstatus = this.props.YOstatus;
      switch (YOstatus) {
        case "Default":
          comps = 
            <div>
              <div class="divButton">Show Settings</div>
              <div class="divButton">Create New Task</div>
            </div>;
          break;
        case "Settings":
          comps = <Settings />
          break;
        case "CreateTask":
          comps = <CreateTask />
          break;
        default:
          console.log("Unknown YOSatus (" + YOSatus + ")");
          break;
      }
    }

    return (
      <div class="Right">
        {comps}
      </div>
      );
  }
}
