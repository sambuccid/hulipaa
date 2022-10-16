const fs = require('fs');
const path = require('path');

const inputDir = process.argv[2];
const outputDir = process.argv[3];
if(!inputDir || !outputDir){
    console.error("missing arguments");
    return 1;
}

buildIndex(inputDir, outputDir);

function buildIndex(inputFolder, outputFolder){
    //make directory
    if (fs.existsSync(outputFolder)){
        fs.rmdirSync(outputFolder, { recursive: true });
    }
    fs.mkdirSync(outputFolder);

    // //get data
    const dataFiles = fs.readdirSync(inputFolder)
    const dataFile = fs.readFileSync(path.join(inputFolder, dataFiles[0]), 'utf8')
    const content = JSON.parse(dataFile);

    const result = {
        results: [{
            title: content.title,
            path:"",
            numberOfMatches:0
        }]
    };

    //make file
    fs.writeFileSync(path.join(outputFolder, "big-index.json"), JSON.stringify(result))
}

module.exports = {buildIndex};