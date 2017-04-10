import React from "react";

require('../../../sass/Exercise.sass');

export default class TextStatement extends React.Component {

  render() {

  	// console.log(this.props)

  	const { exerciseNumber, text } = this.props

    return (
      <div class="Exercise TextStatement">
        {text}
      </div>
      );
  }
}
