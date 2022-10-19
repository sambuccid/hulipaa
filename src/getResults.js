function getResults(pageData){
    if(!pageData){
      throw new Error("parameter missing")
    }
    const result = {
        results: [{
            title: pageData.title,
            path:"",
            numberOfMatches:0
        }]
    };
    return result;
}

module.exports = getResults;