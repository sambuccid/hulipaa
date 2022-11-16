const fs = require('fs');
const path = require('path');

const getResults = require('./getResults.js')

const searchedWord = "testword"

function buildIndex(inputFolder, outputFolder){
    //make directory
    if (fs.existsSync(outputFolder)){
        fs.rmdirSync(outputFolder, { recursive: true });
    }
    fs.mkdirSync(outputFolder);

    // get data
    const dataFiles = fs.readdirSync(inputFolder)
    const dataFile = fs.readFileSync(path.join(inputFolder, dataFiles[0]), 'utf8')
    const content = parser(dataFile)

    //use case
    const result = getResults(content, searchedWord)
    
    const outputResult = presenter(result);

    //make file
    fs.writeFileSync(path.join(outputFolder, "big-index.json"), outputResult)
}

function parser(data){
    const parsedData = JSON.parse(data)
    validateInputData(parsedData)
    return parsedData
}

function validateInputData(data){
    if (isEmpty(data.title)) {
        throw "Input data is missng title"
    }
    if (isEmpty(data.path)){
        throw "Input data is missng path"
    }
    if(isEmpty(data.text)){
        throw "Input data is missng text"
    }

    function isEmpty(val){
        return val==null || val==="";
    }
}

function presenter(output){
    return JSON.stringify(output);
}

module.exports = {buildIndex, parser, presenter};