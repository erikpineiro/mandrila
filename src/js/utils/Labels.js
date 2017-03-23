

const AllLabels = {

	// HomeHeader
	HHLogin: ["Login", "Login"],
	HHSignup: ["Free Sign Up", "Spain"],


};

function Labels(what, languageIndex) {
	return AllLabels[what][languageIndex];
}

export { Labels };