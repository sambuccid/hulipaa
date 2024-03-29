const Hulipaa = require('../generate_results/src/index.js')
const { basename,join } = require('path');

const inputDir = process.argv[2];
const outputDir = process.argv[3];
if (!inputDir || !outputDir) {
    console.error("missing arguments");
    return 1;
}
Hulipaa({
    inputFolder: inputDir,
    outputFolder: outputDir,
    parseData: parsePage,
    generateLink: (fileName,filePath) => `../../${filePath}/${fileName}`
});

// First line is title of page and the rest is the content
function parsePage(pageContent,pagePath) {
    const pageLines = pageContent.split(/\r?\n|\r|\n/g);
    const title = pageLines.shift()
    return {
        title: title,
        path: "/" + join(inputDir,basename(pagePath)),
        text: pageLines.reduce((finalText,line) => finalText + '\n' + line,'')
    }
}
