import React from "react";

import EventList from "./EventList";
import DrillButtons from "./DrillButtons";

require('../../../sass/Home.sass');

export default class Home extends React.Component {

  render() {

    return (
      <div class="Home">
      	<EventList {...this.props}/>
      	<DrillButtons {...this.props}/>

      </div>
      );
  }
}
