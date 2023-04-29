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

        // Given I have a file
        const page = JSON.stringify({
            title: "page1",
            path: "justATestPath.json",
            text: `random text with testword`
        })
        const searchedWord = 'random'

        createInputTestFile("testFile.json",page)

        // When I run the generate utility searching for an hardcoded word
        buildIndex(TEST_INPUT_FOLDER,TEST_OUTPUT_FOLDER)

        // A file gets generated in json
        const outputFiles = getFileListInOutputFolder()
        expect(outputFiles.length).toBeGreaterThan(0)
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
    it('creates 1 result file for each word in the input file',() => {
        setUpTestFolder()

        // Given I have a file with 4 words
        const page = JSON.stringify({
            title: "page1",
            path: "justATestPath.json",
            text: `random text with testword`
        })

        createInputTestFile("testFile.json",page)

        // When I run the generate utility searching for an hardcoded word
        buildIndex(TEST_INPUT_FOLDER,TEST_OUTPUT_FOLDER)

        // 4 files get generated in json
        const outputFiles = getFileListInOutputFolder()
        expect(outputFiles.length).toEqual(4)
        expect(outputFiles).toContain('random.json')
        expect(outputFiles).toContain('text.json')
        expect(outputFiles).toContain('with.json')
        expect(outputFiles).toContain('testword.json')

        // And the content of each file is correct
        const expectedOutputFile = {
            results: [{
                title: "page1",
                path: "../justATestPath.json",
                numberOfMatches: 1
            }]
        }
        for (let outputFile of outputFiles) {
            const outputFileContent = readOutputFile(outputFile)
            expect(JSON.parse(outputFileContent)).toEqual(expectedOutputFile)
        }
    });
});
