const { normaliseAndLowecase,splitTextInWords } = require('./helper.js')

function populateResultMap(pageData,resultMap) {
  if (!pageData) {
    throw new Error("parameter missing")
  }
  if (!resultMap) {
    throw new Error("parameter missing")
  }

  const normalisedPageContent = normaliseAndLowecase(pageData.text)

  const wordsInFile = splitTextInWords(normalisedPageContent)

  const results = {}
  for (let searchedWord of wordsInFile) {
    if (results[searchedWord] == null) {
      results[searchedWord] = {
        results: [{
          title: pageData.title,
          //TODO this needs to be removed as the provided path will need to be absolute
          path: adjustPath(pageData.path),
          link: pageData.link,
          numberOfMatches: 1,
        }]
      }
    } else {
      results[searchedWord].results[0].numberOfMatches++
    }
  }

  mergeResultMaps(resultMap,results)
}

function mergeResultMaps(resultMap,currentResults) {
  for (let searchedWord in currentResults) {
    if (resultMap[searchedWord] == null) {
      resultMap[searchedWord] = currentResults[searchedWord]
    } else {
      resultMap[searchedWord].results.push(...currentResults[searchedWord].results)
    }
  }
}

// TODO this needs to be removed
function adjustPath(oldPath) {
  return "../" + oldPath
}

module.exports = populateResultMap;