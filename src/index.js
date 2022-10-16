const fs = require('fs');
const path = require('path');

const getResults = require('./getResults.js')

function buildIndex(inputFolder, outputFolder){
    //make directory
    if (fs.existsSync(outputFolder)){
        fs.rmdirSync(outputFolder, { recursive: true });
    }
    fs.mkdirSync(outputFolder);

    // //get data
    const dataFiles = fs.readdirSync(inputFolder)
    const dataFile = fs.readFileSync(path.join(inputFolder, dataFiles[0]), 'utf8')
    const content = parseData(dataFile)

    //use case
    const result = getResults(content)
    
    const outputResult = presenter(result);

    //make file
    fs.writeFileSync(path.join(outputFolder, "big-index.json"), outputResult)
}

function parseData(data){
    return JSON.parse(data);
}

function presenter(output){
    return JSON.stringify(output);
}

module.exports = {buildIndex};