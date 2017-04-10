import React from "react";
import { connect } from "react-redux"

import Reading from "./Reading"

import { readingByEventID } from "../../utils/denormalizers"


require('../../../sass/Home.sass');

// Reasons to have intel here:
// Drill knows it's a drill and can find specific info
// Can pass reading info further to common component Reading.
@connect((store) => {
  return {
    readings: store.readings,
  }
})
export default class Drill extends React.Component {

  render() {

    const eventID = this.props.eventID
    const { readings } = this.props.readings
    const reading = readingByEventID(eventID, readings)

    return (
      <div class="Drill">
        <Reading {...reading}/>
      </div>
      )
  }
}
