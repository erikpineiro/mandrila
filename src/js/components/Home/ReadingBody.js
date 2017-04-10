import React from "react";


require('../../../sass/Reading.sass');


export default class ReadingBody extends React.Component {

	resultUnit(result, order){
		const sassClass = "ReadingBodyResult"+(result ? (result==1 ? "Correct" : "Incorrect") : "Unanswered")
		return <div key={order} class={sassClass}></div>
	}

  render() {
  	// console.log(this.props)
  	const { results, exerciseLevel } = this.props
  	var readingBodyBottom = results.map((result, order)=>{ return this.resultUnit(result, order) })

    return (
      <div class="ReadingBody ReadingChild">
      	<div class="ReadingBodyTop">
      		<div class="ReadingBodyExerciseLevel"><p>{"L" + exerciseLevel}</p></div>
      		<div class="ReadingBodyScene"><p>"This is where the scene goes once we have it</p></div>
      	</div>
      	<div class="ReadingBodyResults">
      		{readingBodyBottom}
      	</div>
      </div>
      )
  }
}
