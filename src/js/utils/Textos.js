

const allTextos = {
	// English, Spanish

	//DrillButtons
	DrB_Teacher: ["Teacher", "Maestr@"],
	DrB_ChooseLevel: ["Choose Level", "Escoge Nivel"],

};

function Textos(what, languageIndex) {
	return allTextos[what][languageIndex];
}

export { Textos };