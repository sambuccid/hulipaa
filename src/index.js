const fs = require('fs');
const path = require('path');

const generateResultMap = require('./generateResultMap.js')

const searchedWord = "testword"

function buildIndex(inputFolder,outputFolder) {
    //make directory
    if (fs.existsSync(outputFolder)) {
        fs.rmSync(outputFolder,{ recursive: true });
    }
    fs.mkdirSync(outputFolder);

    // get data
    const dataFiles = fs.readdirSync(inputFolder)
    const dataFile = fs.readFileSync(path.join(inputFolder,dataFiles[0]),'utf8')
    const content = parser(dataFile)

    //use case
    const resultMap = generateResultMap(content,searchedWord)

    const files = presenter(resultMap);

    for (let file of files) {
        fs.writeFileSync(path.join(outputFolder,file.fileName),file.content)
    }
}

function parser(data) {
    const parsedData = JSON.parse(data)
    validateInputData(parsedData)
    return parsedData
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

    const validResults = resultArray.filter(
        (result) => result.resultInfos.results[0].numberOfMatches > 0)

    const filesArray = validResults.map((result) => (
        {
            fileName: `${result.resultWord}.json`,
            content: JSON.stringify(result.resultInfos)
        }
    ))

    return filesArray
}

module.exports = { buildIndex,parser,presenter };