const { buildIndex } = require('../../src/index.js')
const {
    setUpTestFolder,
    createInputTestFile,
    getFileListInOutputFolder,
    readOutputFile,
    TEST_INPUT_FOLDER,
    TEST_OUTPUT_FOLDER
} = require('../test_helpers/test_helpers.js')


describe('Generation of search results',() => {
    it('creates a result file',() => {
        setUpTestFolder()
        const searchedWord = 'testword'

        // Given I have a file
        const page = JSON.stringify({
            title: "page1",
            path: "justATestPath.json",
            text: `random text with ${searchedWord}`
        })
        createInputTestFile("testFile.json",page)

        // When I run the generate utility searching for an hardcoded word
        buildIndex(TEST_INPUT_FOLDER,TEST_OUTPUT_FOLDER)

        // A file gets generated in json
        const outputFiles = getFileListInOutputFolder()
        expect(outputFiles.length).toEqual(1)
        expect(outputFiles[0]).toEqual(`${searchedWord}.json`)

        // And the content of the file is correct
        const expectedOutputFile = {
            results: [{
                title: "page1",
                path: "../justATestPath.json",
                numberOfMatches: 1
            }]
        }
        const outputFileContent = readOutputFile(outputFiles[0])
        expect(JSON.parse(outputFileContent)).toEqual(expectedOutputFile)
    });
});
