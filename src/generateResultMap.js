function generateResultMap(pageData) {
  if (!pageData) {
    throw new Error("parameter missing")
  }

  const searchedWord = pageData.text.substring(0,pageData.text.indexOf(' '))

  const occurrences = pageData.text.matchAll(searchedWord)

  let numberOfMatches = 0;
  for (let _a of occurrences) {
    numberOfMatches++;
  }

  const result = {}
  result[searchedWord] = {
    results: [{
      title: pageData.title,
      path: adjustPath(pageData.path),
      numberOfMatches: numberOfMatches
    }]
  }
  return result;
}

function adjustPath(oldPath) {
  return "../" + oldPath
}

module.exports = generateResultMap;