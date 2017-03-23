import React from "react";

import Left from "./Left";
import Mid from "./Mid";
import Right from "./Right";


// require('!style!css!sass!../../../sass/Layout.sass');
require('../../../sass/Layout.sass');

export default class Layout extends React.Component {

  render() {

    console.log("Starting Up");

    return (
      <div id="Layout">
        <Left />
        <Mid />
        <Right />
      </div>
    );
  }
}
