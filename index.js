const { buildIndex } = require('./src/index.js')

const inputDir = process.argv[2];
const outputDir = process.argv[3];
if (!inputDir || !outputDir) {
    console.error("missing arguments");
    return 1;
}

buildIndex(inputDir,outputDir,(fileName,filePath) => {
    return `../${filePath}/${fileName}`
});

module.exports = { buildIndex };