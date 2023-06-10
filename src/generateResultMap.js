function generateResultMap(pageData) {
  if (!pageData) {
    throw new Error("parameter missing")
  }

  const symbolsRegexp = new RegExp('[A-Za-zÀ-ÖØ-öø-ÿ0-9]+','g')

  const wordsInFile = [...pageData.text.matchAll(symbolsRegexp)]

  const results = {}
  for (let searchedWord of wordsInFile) {

    if (results[searchedWord] == null) {
      results[searchedWord] = {
        results: [{
          title: pageData.title,
          path: adjustPath(pageData.path),
          link: pageData.link,
          numberOfMatches: 1,
        }]
      }
    } else {
      //TODO check if it's the same page or not
      // if not add a result to the results array
      results[searchedWord].results[0].numberOfMatches++
    }

  }
  return results;
}

function adjustPath(oldPath) {
  return "../" + oldPath
}

module.exports = generateResultMap;