import React from "react";
import { connect } from "react-redux"

import Language from "./User/Language"

import { userLogin, userChangeLanguage } from "../actions/userActions"


require('../../sass/Layout.sass');


@connect((store) => {
  return {
    user: store.user,
    languages: store.languages,
  };
})

export default class Left extends React.Component {

  constructor(props) {
    super(props);
    this.props.dispatch(userLogin({login: "RANDOM"}))

    this.clickedOnLanguageHandler = this.clickedOnLanguageHandler.bind(this)
  }

  clickedOnLanguageHandler(languageID) {
    this.props.dispatch(userChangeLanguage({selectedLanguage: languageID}))
  }

  render() {
    console.log(this.props)
  	const { user, languages } = this.props
    var langComps = languages.languages.map((language)=>{ 
      return <Language 
        key={language.languageID} 
        {...language} 
        isOn={user.user.selectedLanguage == language.languageID}
        clickedOnLanguageHandler={this.clickedOnLanguageHandler}
        /> 
    })

    return (
      <div class="Left">
        {user.user.alias}
        {langComps}
      </div>
      );
  }
}
