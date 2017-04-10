import React from "react";
import { connect } from "react-redux"

import { Textos } from "../../utils/Textos"

import { exerciseByLevel_get } from "../../actions/exerciseActions"
import { languageByID } from "../../utils/denormalizers"

require('../../../sass/Home.sass');


@connect((store) => {
  return {
    languages: store.languages,
    user: store.user,
  };
})
export default class DrillButtons extends React.Component {

  constructor(props){
    super(props)

    this.clickChooseLevel = this.clickChooseLevel.bind(this)    
    this.clickCurrentLevel = this.clickCurrentLevel.bind(this)    
    this.clickTeacher = this.clickTeacher.bind(this)    
    this.getCurrentClase = this.getCurrentClase.bind(this)    
  }

  clickChooseLevel(){}
  clickCurrentLevel(){
    console.log("Get exercise level (" + this.getCurrentClase() + ")")
    this.props.dispatch(exerciseByLevel_get({level: this.getCurrentClase(), login: this.props.user.user.userID}))
  }
  clickTeacher(){}

  getCurrentClase(){
    const selectedLanguage = this.props.user.user.selectedLanguage
    return languageByID(selectedLanguage, this.props.languages.languages).clase
  }

  render() {

    console.log(this.props)
    const langIndex = 0

    return (
      <div class="DrillButtons">
        <button class="DrillButton">Teacher</button>
        <button class="DrillButton" onClick={this.clickCurrentLevel}>@{this.getCurrentClase()}</button>
        <button class="DrillButton">{Textos("DrB_ChooseLevel", langIndex)}</button>
      </div>
    )
  }
}
