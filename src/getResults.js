function getResults(pageData, searchedWord){
    if(!pageData){
      throw new Error("parameter missing")
    }
    if(!searchedWord){
      throw "error, word to search missing"
    }
    
    const occurrences = pageData.text.matchAll(searchedWord)
    
    let numberOfMatches = 0;
    for(let _a of occurrences){
      numberOfMatches++;
    }
    
    const result = {
        results: [{
            title: pageData.title,
            path: adjustPath(pageData.path),
            numberOfMatches:numberOfMatches
        }]
    };
    return result;
}

function adjustPath(oldPath){
    return "../"+oldPath
}

module.exports = getResults;