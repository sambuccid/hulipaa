function getResults(pageData){
    if(!pageData){
      throw new Error("parameter missing")
    }
    const result = {
        results: [{
            title: pageData.title,
            path: adjustPath(pageData.path),
            numberOfMatches:0
        }]
    };
    return result;
}

function adjustPath(oldPath){
    return "../"+oldPath
}

module.exports = getResults;