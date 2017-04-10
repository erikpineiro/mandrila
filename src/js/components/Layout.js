import React from "react";
import { connect } from "react-redux"

import Left from "./Left";
import Mid from "./Mid";
import Right from "./Right";


require('../../sass/Layout.sass');

@connect((store) => {
  return {
    showing: store.showing,
  }
})
export default class Layout extends React.Component {

  render() {

    console.log("Starting Up");

    return (
      <div id="Layout">
        <Left />
        <div id="RightContainer">
          <Mid {... this.props} />
          <Right {... this.props} />
        </div>
      </div>
    );
  }
}
