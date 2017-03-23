import React from "react";
import _ from "Underscore";

import Home from "./Main/Home";
import Task from "./Main/Task";

require('../../sass/Layout.sass');

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    
    // BINDERS
  }


  render() {

    var comps;

    console.log(this.props);  

    if (!this.props.task) {
      comps = <Home {...this.props}/>;
    } else {
      comps = <Task {...this.props}/>
    }


    return (
      
        <div class="Main">
          {comps}
        </div>
      
      );
  }
}
