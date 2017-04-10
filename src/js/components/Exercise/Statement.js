import React from "react";

// import { drill } from "../actions/userActions"

import MarkStatement from "./MarkStatement"
import TextStatement from "./TextStatement"

require('../../../sass/Exercise.sass');

export default class Statement extends React.Component {

  render() {

  	// console.log(this.props)

  	const { statementNumber, text, isTrue, exercise, reading } = this.props
    const result = reading.results[statementNumber]
    const statementIsTrue = exercise.statements[statementNumber].isTrue
    const mark = {
      markTrue: (result == 1 && statementIsTrue) || (result == -1 && !statementIsTrue),
      markFalse: (result!=0) && !((result == 1 && statementIsTrue) || (result == -1 && !statementIsTrue)),
    }

    return (
      <div class="Exercise Statement">
        <TextStatement text={text} />
        <div class="MarksStatement">
          <MarkStatement {...this.props} kind="true" {... mark} />
          <MarkStatement {...this.props} kind="false" {... mark} />
        </div>
      </div>
      );
  }
}
