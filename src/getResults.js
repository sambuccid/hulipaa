function getResults(pageData){
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