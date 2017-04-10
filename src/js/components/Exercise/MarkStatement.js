import React from "react";

import { statementMarkClicked } from "../../actions/exerciseActions"

require('../../../sass/Exercise.sass');

export default class MarkStatement extends React.Component {

  constructor() {
    super()
    this.clickedMark = this.clickedMark.bind(this)
  }

  clickedMark() {
    console.log("statementMarkClicked")
    const { clickedOnStatementMarkHandler } = this.props

    clickedOnStatementMarkHandler({
      readingID: "CURRENT",
      statementNumber: this.props.statementNumber,
      isTrue:  this.props.isTrue,
      kind: this.props.kind,
    })
  }

  render() {

  	// console.log(this.props)

  	const { statementNumber, isTrue, kind, markTrue, markFalse } = this.props
  	var mark = kind == "true" ? markTrue : markFalse
  	var classMark = mark ? "MarkStatementTextOn" : "MarkStatementTextOff"
    const clickableClass = " Clickable"

    return (
      <div class="Exercise MarkStatement">
        <span class={classMark + clickableClass} onClick={this.clickedMark}>{kind}</span>
      </div>
      );
  }
}
