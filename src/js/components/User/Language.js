import React from "react";

// import Language from "./User/Language"

// import { userLogin } from "../actions/userActions"


require('../../../sass/User.sass');

export default class Left extends React.Component {

	constructor() {
		super()
		this.clickedOnLanguage = this.clickedOnLanguage.bind(this)
	}

	clickedOnLanguage() {
		this.props.clickedOnLanguageHandler(this.props.languageID)
	}

  render() {
  	console.log(this.props)
  	const { clase, langCode, xps, isOn } = this.props
  	var sassClass = "Language" + (isOn ? "On" : "Off")
    // sassClass += " " + (isOn ? "NotClickable" : "Clickable")
  	const clickedOnLanguage = isOn ? ()=>{} : this.clickedOnLanguage

    return (
      <div class={sassClass} onClick={clickedOnLanguage}>
        {clase + ", " + langCode + ", " + xps}
      </div>
      );
  }
}
