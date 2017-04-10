import React from "react";
import { connect } from "react-redux"

import { exerciseByID } from "../../utils/denormalizers"

require('../../../sass/Drill.sass');

export default class Scene extends React.Component {

  render() {

  	console.log(this.props)
  	const { exercise } = this.props
    console.log(exercise)
    console.log(exercise.scene)

    return (
      <div class="Exercise Scene">
      	{exercise.scene}
      </div>
      );
  }
}
