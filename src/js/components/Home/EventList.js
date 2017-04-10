import React from "react";
import { connect } from "react-redux"

import Event from "./Event"

import { datumFromEventID, langCodeFromEventID } from "../../utils/denormalizers"

require('../../../sass/Home.sass');

@connect((store) => {
  return {
    user: store.user, // We need to know selectedLanguage
    languages: store.languages,
    readings: store.readings,
  };
})

export default class EventList extends React.Component {

  render() {

    const { languages, readings, user } = this.props

    var eventsComps
    const pending = languages.dbStatus.includes("Pending");
    if (pending) {
      eventsComps = "loading..."
    } else {
      // Remember that events are normalized, so language.events is an array of eventIDs
      var events = (languages.languages.find((language)=>{ return language.languageID == user.user.selectedLanguage })).events;
      
      // Choose the 6 latest events
      events.sort((event1, event2)=>{
        let date1 = datumFromEventID(event1, readings.readings)
        let date2 = datumFromEventID(event2, readings.readings)
        if (date1 > date2) { return -1;}
        if (date1 < date2) { return 1; }
        return 0;
      })
      events = events.splice(0,6);
      
      eventsComps = events.map((event)=>{ return <Event key={event} eventID={event} /> })
    }

  
    return (
      <div class="Events">
        {eventsComps}
      </div>
      )
  }
}
