import React from "react";
import { connect } from "react-redux"

import Drill from "./Drill"
import Race from "./Race"

require('../../../sass/Home.sass');

export default class Event extends React.Component {

  render() {

    const eventID = this.props.eventID
    var eventComp;
    if (eventID.substr(0,4) == "DRLL") eventComp = <Drill eventID={eventID}/>
    else eventComp = <Race eventID={eventID}/>

    return (
      <div class="Event">
        {eventComp}
      </div>
      )
  }
}
