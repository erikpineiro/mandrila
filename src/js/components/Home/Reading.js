import React from "react";

import ReadingBody from "./ReadingBody"

import { connect } from "react-redux"

require('../../../sass/Reading.sass');

export default class Reading extends React.Component {

  render() {

  	let { datum, xps, results, exerciseLevel } = this.props
  	if (xps > 0) xps = "+" + xps
  	
  	// Find out how long ago reading was done
  	console.log(datum)
  	datum = Math.abs(new Date() - datum) // In case someone fiddles with their internal clock
  	const datumTexts = ["<2m", "<10m", "<1h", "<4h", "<1d", "<5d", "<15d", ">15d"]
  	const datumThresholds = [60*2, 60*10, 60*60, 4*60*60, 24*60*60, 5*24*60*60, 15*24*60*60, Infinity	]
  	for (let i=0; i<datumThresholds.length; i++) {
  		if (datum < datumThresholds[i]) {
  			datum = datumTexts[i]
  			break;
  		}
  	}


    return (
      <div class="Reading">
      	<div class="ReadingChild"><p>{xps}</p></div>
				<ReadingBody {...this.props}/>   
      	<div class="ReadingChild"><p>{datum}</p>	</div>
      </div>
      )
  }
}
