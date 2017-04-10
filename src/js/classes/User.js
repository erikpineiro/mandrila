import Language from "./Language"

import * as utils from "../utils/simpleFunctions"

export default class User {
	constructor(args) {


    // args must be an object or a string!
    if (args=="NEW_USER") args = this.getNewUser()
    else if (typeof args == "string") args = this.initFromDB(args)

    let props = [
      // MUST be set
      "alias",
      "clave",
      "languages",
      "userID",
      // Can be EMPTY
      "country",
      "description",
      "appLanguage",
      "selectedLanguage", // languageID
      "teachers",
      "zip",
      ]

    props.forEach((prop) => {this[prop] = args[prop]})

    // SPECIAL CASE. Normalize Languages. Keep Only array of IDs
    this.languages = this.languages.map((language) => { return language.languageID })

    // SPECIAL CASE. No selectedLanguage (especially importan when testing, not sure this is possible in production. User gets one language by default)
    if (!this.selectedLanguage || this.selectedLanguage.substr(0,4) != "LANG") this.selectedLanguage = this.languages[0]


    return this // To chain stuff
	}

  getNewUser() {
    let alias1 = ["Ester", "Elvira", "Darío", "Björn", "Løve", "Erik", "Maria"]
    let alias2 = ["Fromm", "Hegel", "Curie", "Simone", "Austen", "Montessori", "Myrdal"]
    return {
      alias: alias1[utils.randomInt(0, alias1.length-1)] + "_" + alias2[utils.randomInt(0, alias2.length-1)],
      clave: "clave",
      userID: utils.randomString(17),
      languages: [new Language()],
    }
  }

	initFromDB(data){
	  data = JSON.parse(data)
    let answer = {}

    return answer;
      // Info about Provider comes in [0]
      // const provider = data;
      // this.login = provider['idUser'];
      // this.clave = provider['Clave'];
      // this.level = provider['Level'];
      // this.website = provider['Website'];
      // this.points = provider['Points'];
      // this.birthDay = provider['Birthday'];
      
      // if (Array.isArray(provider['latest'])) {
      //   provider['latest'].forEach((one) => {
      //     this.latest.push( (new ClassOneLatest().initFromUser(one)) );
      //   });
	}

  // initFromSignUp({valueLogin, valuePass, valueBirthday}) {
  //   this.login = valueLogin;
  //   this.clave = valuePass;
  //   this.birthDay = valueBirthday;

  //   return this;
  // }
}


