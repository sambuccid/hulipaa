const fs = require('fs');
const path = require('path');


function buildIndex(inputFolder, outputFolder){
    //make directory
    if (fs.existsSync(outputFolder)){
        fs.rmdirSync(outputFolder, { recursive: true });
    }
    fs.mkdirSync(outputFolder);

    //get data
    const dataFiles = fs.readdirSync(inputFolder)
    const dataFile1 = fs.readFileSync(path.join(inputFolder, dataFiles[0]), 'utf8')

    //make file
    fs.writeFileSync(path.join(outputFolder, "big-index.json"),dataFile1)
}

module.exports = {buildIndex};