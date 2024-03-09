const fs = require('fs');
const path = require('path');

const populateResultMap = require('./populateResultMap.js')

function buildIndex({ inputFolder,outputFolder,parseData,generateLink }) {
    //make directory
    if (fs.existsSync(outputFolder)) {
        fs.rmSync(outputFolder,{ recursive: true });
    }
    fs.mkdirSync(outputFolder);

    const pageFileNames = fs.readdirSync(inputFolder)
    const resultMap = {}
    for (let pageFileName of pageFileNames) {
        // get data
        const pageFullPath = path.join(inputFolder,pageFileName)
        const pageContent = fs.readFileSync(pageFullPath,'utf8')
        const pageDetails = parseData(pageContent,pageFullPath)
        validateInputData(pageDetails)
        pageDetails.link = generateLink(pageFileName,inputFolder)

        // find results
        populateResultMap(pageDetails,resultMap)
    }

    const files = presenter(resultMap);

    for (let file of files) {
        fs.writeFileSync(path.join(outputFolder,file.fileName),file.content)
    }
}

function validateInputData(data) {
    if (isEmpty(data.title)) {
        throw "Input data is missing title"
    }
    if (isEmpty(data.path)) {
        throw "Input data is missing path"
    }
    if (isEmpty(data.text)) {
        throw "Input data is missing text"
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

    const filesArray = resultArray.map((result) => (
        {
            fileName: `${result.resultWord}.json`,
            content: JSON.stringify(result.resultInfos)
        }
    ))

    return filesArray
}

module.exports = { buildIndex,validateInputData,presenter };