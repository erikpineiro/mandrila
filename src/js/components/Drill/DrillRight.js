import React from "react";
import { connect } from "react-redux"

import Statement from "../Exercise/Statement"

import { statementMarkClicked } from "../../actions/exerciseActions"
import { exerciseByID, readingByID } from "../../utils/denormalizers"

require('../../../sass/Drill.sass');

@connect((store) => {
  return {
  	showing: store.showing,
    exercises: store.exercises,
    readings: store.readings,
  };
})
export default class DrillRight extends React.Component {

  constructor(props) {
    super(props)
    this.clickedOnStatementMarkHandler = this.clickedOnStatementMarkHandler.bind(this)
  }

  clickedOnStatementMarkHandler(args) {
    this.props.dispatch(statementMarkClicked(args))
  }

  render() {

  	console.log(this.props);
  	const exercise = exerciseByID(this.props.showing.data, this.props.exercises.exercises)
    const reading = readingByID("CURRENT", this.props.readings.readings)
    console.log(reading)
    const propsStatement = { exercise, reading, clickedOnStatementMarkHandler: this.clickedOnStatementMarkHandler }

    const comps = exercise.statements.map((statement, number)=>{ return <Statement 
      key={number}
      {... statement}
      {... propsStatement}
      statementNumber={number}
      /> })

    return (
      <div class="Drill DrillRight">
        {comps}
      </div>
      );
  }
}
