import React from "react";
import { connect } from "react-redux"

import Reading from "./Reading"

import { raceByID, readingByID } from "../../utils/denormalizers"

require('../../../sass/Home.sass');

@connect((store) => {
  return {
    races: store.races,
    readings: store.readings,
  }
})
export default class Race extends React.Component {

  render() {

    const { readings, races } = this.props
    const eventID = this.props.eventID
    const race = raceByID(eventID, races.races)

    const readingComps = race.readings.map((reading)=> { 
      const readingComplete = readingByID(reading, readings.readings)
      return <Reading key={reading} {...readingComplete} /> 
    })

    return (
      <div class="Race">
        {readingComps}
      </div>
      )
  }
}
