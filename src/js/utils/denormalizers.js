
// DENORMALIZERS. HELP US FIND OBJECTS


// EXERCISE RELATED
function exerciseByID(id, exercises) {
  const temp = exercises.find((exercise)=> { return exercise.exerciseID == id })
  if (!temp) notFound("EXERCISE", id, exercises)
  return temp  
}


// LANGUAGE-RELATED
function langCodeFromEventID (id, languages) { return languageByEventID(id, languages).langCode }
function languageByEventID (id, languages) {
  var answer
  languages.forEach((language)=> {
    if (language.events.indexOf(id) != -1) {
      answer = language
    }
  })
  if (!answer) {
    console.log("NOT FOUND (" + id + ")")
    console.log(languages)    
  }
  return answer
}
function languageByID(id, languages) {
  const temp = languages.find((language)=> { return language.languageID == id })
  if (!temp) notFound("LANGUAGE", id, languages)
  return temp  
}

// READING-RELATED
function datumFromEventID (id, readings) { return readingByEventID (id, readings).datum }
function readingByEventID (id, readings) {
  const temp = readings.find((reading)=>{ return reading.eventID == id })
  if (!temp) notFound("READING", id, readings)
  return temp  
}
function readingByID (id, readings) {
  const temp = readings.find((reading)=> { return reading.readingID == id })
  if (!temp) notFound("READING", id, readings)
  return temp  
}

// RACE-RELATED
function raceByID (id, races) {
  const temp = races.find((race)=>{ return race.eventID == id })
  if (!temp) notFound("RACE", id, readings)
  return temp  
}



export { exerciseByID, readingByEventID, datumFromEventID, langCodeFromEventID, languageByID, readingByID, raceByID }

// INTERNAL
function notFound(kind, search, array) {
  console.log(kind + " NOT FOUND")
  console.log(search)
  console.log(array)
}