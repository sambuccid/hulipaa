const fs = require('fs');
const path = require('path');

const generateResultMap = require('./generateResultMap.js')
const { normaliseAndLowecase } = require('./helper.js')

function buildIndex(inputFolder,outputFolder,parsePage,getLinkPage) {
    //make directory
    if (fs.existsSync(outputFolder)) {
        fs.rmSync(outputFolder,{ recursive: true });
    }
    fs.mkdirSync(outputFolder);

    // get data
    const pageFileNames = fs.readdirSync(inputFolder)
    // TODO iterate over pageFileNames
    const pageFileName = pageFileNames[0]
    const pageFullPath = path.join(inputFolder,pageFileName)
    const pageContent = fs.readFileSync(pageFullPath,'utf8')
    const pageDetails = parsePage(pageContent,pageFullPath)
    validateInputData(pageDetails)
    pageDetails.link = getLinkPage(pageFileName,inputFolder)

    //use case
    const resultMap = generateResultMap(pageDetails)

    const files = presenter(resultMap);

    for (let file of files) {
        fs.writeFileSync(path.join(outputFolder,file.fileName),file.content)
    }
}

function validateInputData(data) {
    if (isEmpty(data.title)) {
        throw "Input data is missng title"
    }
    if (isEmpty(data.path)) {
        throw "Input data is missng path"
    }
    if (isEmpty(data.text)) {
        throw "Input data is missng text"
    }

    function isEmpty(val) {
        return val == null || val === "";
    }
}


function presenter(resultMap) {
    const resultArray = Object.entries(resultMap).map(result => (
        {
            resultWord: result[0], // Key in resultMap
            resultInfos: result[1] // Value in resultMap
        }
    ))

    //TODO remove
    const validResults = resultArray.filter(
        (result) => result?.resultInfos?.results?.[0]?.numberOfMatches > 0)


    const normalisedValidResults = validResults.map(res => ({
        ...res,
        resultWord: normaliseAndLowecase(res.resultWord)
    }))

    const filesArray = normalisedValidResults.map((result) => (
        {
            fileName: `${result.resultWord}.json`,
            content: JSON.stringify(result.resultInfos)
        }
    ))

    return filesArray
}

module.exports = { buildIndex,validateInputData,presenter };