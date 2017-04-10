import React from "react"
import { connect } from "react-redux"

import Home from "./Home/Home"
import DrillMid from "./Drill/DrillMid"

require('../../sass/Layout.sass')



export default class Mid extends React.Component {

	component(showing){
  	switch (showing) {
  		case "Home": { return <Home /> }
  		case "Drill": { return <DrillMid /> }
  		default: {
  			console.log("showing? (" + showing + ")")
  			break;
  		}
  	}

	}

  render() {

  	const comp = this.component(this.props.showing.showing);
  	console.log(this.props)

    return (
      <div class="Mid">
        {comp}
      </div>
      )
  }
}
