import React from "react"

import Home from "./Home/Home"
import DrillRight from "./Drill/DrillRight"

require('../../sass/Layout.sass')


export default class Right extends React.Component {

	component(showing){
  	switch (showing) {
  		case "Home": { return <div></div> }
  		case "Drill": { return <DrillRight /> }
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
      <div class="Right">
        {comp}
      </div>
      )
  }
}
