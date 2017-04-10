import React from "react";
import { connect } from "react-redux"

import Scene from "../Exercise/Scene"

import { exerciseByID } from "../../utils/denormalizers"

require('../../../sass/Drill.sass');

@connect((store) => {
  return {
  	showing: store.showing,
    exercises: store.exercises,
  };
})
export default class DrillMid extends React.Component {

  render() {

  	console.log(this.props);
  	const exercise = exerciseByID(this.props.showing.data, this.props.exercises.exercises)

    return (
      <div class="Drill DrillMid">
        <Scene exercise={exercise}/>
      </div>
      );
  }
}
