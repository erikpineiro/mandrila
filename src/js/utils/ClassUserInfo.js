import {randomString, randomInt} from "./simpleFunctions";
import ClassOneLatest from "./ClassOneLatest";

export default class UserInfo {
	constructor() {
		this.email = "voidEmail";
		this.login = "voidName";
		this.website = "voidWebsite";
		this.level = 0;
		this.points = 0;
    this.anchor = 0;
    this.clave = "voidClave";
    this.birthDay = "voidBirthday";
    this.latest = [];

		return this;
	}

	initFromDB(data){
	  data = JSON.parse(data);

    // Info about Provider comes in [0]
    const provider = data;
    this.login = provider['idUser'];
    this.clave = provider['Clave'];
    this.level = provider['Level'];
    this.website = provider['Website'];
    this.points = provider['Points'];
    this.birthDay = provider['Birthday'];
    
    if (Array.isArray(provider['latest'])) {
      provider['latest'].forEach((one) => {
        this.latest.push( (new ClassOneLatest().initFromUser(one)) );
      });
    }



    return this;
	}

  initFromSignUp({valueLogin, valuePass, valueBirthday}) {
    this.login = valueLogin;
    this.clave = valuePass;
    this.birthDay = valueBirthday;

    return this;
  }
}


