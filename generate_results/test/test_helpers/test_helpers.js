const fs = require('fs');
const path = require('path');

const TEST_FOLDER = '.testing'
const TEST_INPUT_FOLDER = `${TEST_FOLDER}/test_input`
const TEST_OUTPUT_FOLDER = `${TEST_FOLDER}/test_output`
function setUpTestFolder() {
    if (fs.existsSync(TEST_FOLDER)) {
        fs.rmSync(TEST_FOLDER,{ recursive: true });
    }
    fs.mkdirSync(TEST_FOLDER);

    fs.mkdirSync(TEST_INPUT_FOLDER);
    fs.mkdirSync(TEST_OUTPUT_FOLDER);
}
function createInputTestFile(fileName,fileContent) {
    fs.writeFileSync(path.join(TEST_INPUT_FOLDER,fileName),fileContent)
}
function getFileListInOutputFolder() {
    return fs.readdirSync(TEST_OUTPUT_FOLDER)
}
function readOutputFile(fileName) {
    return fs.readFileSync(path.join(TEST_OUTPUT_FOLDER,fileName),'utf8')
}

module.exports = {
    TEST_FOLDER,
    TEST_INPUT_FOLDER,
    TEST_OUTPUT_FOLDER,
    setUpTestFolder,
    createInputTestFile,
    getFileListInOutputFolder,
    readOutputFile
};