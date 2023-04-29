function generateResultMap(pageData) {
  if (!pageData) {
    throw new Error("parameter missing")
  }

  const results = {}
  const wordsInFile = pageData.text.split(' ')

  for (let searchedWord of wordsInFile) {

    if (results[searchedWord] == null) {
      results[searchedWord] = {
        results: [{
          title: pageData.title,
          path: adjustPath(pageData.path),
          numberOfMatches: 1
        }]
      }
    } else {
      results[searchedWord].results[0].numberOfMatches++
    }

  }
  return results;
}

function adjustPath(oldPath) {
  return "../" + oldPath
}

module.exports = generateResultMap;