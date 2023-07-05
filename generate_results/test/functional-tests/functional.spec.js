const Hulipaa = require('../../src/index.js')
const {
    setUpTestFolder,
    createInputTestFile,
    getFileListInOutputFolder,
    readOutputFile,
    TEST_INPUT_FOLDER,
    TEST_OUTPUT_FOLDER
} = require('../test_helpers/test_helpers.js')
const { basename } = require('path');


describe('Generation of search results',() => {
    it('creates a result file',() => {
        setUpTestFolder()

        // Given I have a file
        const page = `page1
            random text with testword
        `
        const searchedWord = 'random'

        const testFileName = "testFile.json"
        createInputTestFile(testFileName,page)

        // When I run the generate utility searching for an hardcoded word
        Hulipaa(TEST_INPUT_FOLDER,TEST_OUTPUT_FOLDER,parseTestPage,(fileName,filePath) => {
            return `link_${fileName}_${filePath}.html`
        })

        // A file gets generated in json
        const outputFiles = getFileListInOutputFolder()
        expect(outputFiles.length).toBeGreaterThan(0)
        expect(outputFiles[0]).toEqual(`${searchedWord}.json`)

        // And the content of the file is correct
        const expectedOutputFile = {
            results: [{
                title: "page1",
                path: "../testFile.json",
                numberOfMatches: 1,
                link: `link_${testFileName}_${TEST_INPUT_FOLDER}.html`
            }]
        }
        const outputFileContent = readOutputFile(outputFiles[0])
        expect(JSON.parse(outputFileContent)).toEqual(expectedOutputFile)
    });
    it('creates 1 result file for each word in the input file',() => {
        setUpTestFolder()

        // Given I have a file with 4 words
        const page = `page1
            random text with testword
        `

        createInputTestFile("testFile.json",page)

        // When I run the generate utility searching for an hardcoded word
        Hulipaa(TEST_INPUT_FOLDER,TEST_OUTPUT_FOLDER,parseTestPage,() => 'test.html')

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
                path: "../testFile.json",
                numberOfMatches: 1,
                link: 'test.html'
            }]
        }
        for (let outputFile of outputFiles) {
            const outputFileContent = readOutputFile(outputFile)
            expect(JSON.parse(outputFileContent)).toEqual(expectedOutputFile)
        }
    });

    it('creates 1 result file with correct number of occurrences if the same word is repeated multiple times',() => {
        setUpTestFolder()

        // Given I have a file with 4 times the same words
        const page = `page1
            word word,word. ,word
        `

        createInputTestFile("testFile.json",page)

        // When I run the generate utility searching for an hardcoded word
        Hulipaa(TEST_INPUT_FOLDER,TEST_OUTPUT_FOLDER,parseTestPage,() => 'test.html')

        // just 1 file get generated
        const outputFiles = getFileListInOutputFolder()
        expect(outputFiles.length).toEqual(1)
        expect(outputFiles).toContain('word.json')

        // And the content of the file is correct
        const expectedOutputFile = {
            results: [{
                title: "page1",
                path: "../testFile.json",
                numberOfMatches: 4,
                link: 'test.html'
            }]
        }
        for (let outputFile of outputFiles) {
            const outputFileContent = readOutputFile(outputFile)
            expect(JSON.parse(outputFileContent)).toEqual(expectedOutputFile)
        }
    });


    it('creates results for all the input files present',() => {
        setUpTestFolder()

        // Given I have a file with 4 times the same words
        const page1 = `page1
            WÖRD1 word2
        `

        const page2 = `page2
            word1 word3
        `

        createInputTestFile("testFile1.json",page1)
        createInputTestFile("testFile2.json",page2)

        // When I run the generate utility searching for an hardcoded word
        Hulipaa(TEST_INPUT_FOLDER,TEST_OUTPUT_FOLDER,parseTestPage,(fileName) => fileName + '.html')

        // Then it generates results from both files
        const outputFiles = getFileListInOutputFolder()
        expect(outputFiles.length).toEqual(3)
        expect(outputFiles).toContain('word1.json')
        expect(outputFiles).toContain('word2.json')
        expect(outputFiles).toContain('word3.json')

        // And the  common words in both files reference both files
        const expectedCommonWordOutputFile = {
            results: [
                {
                    title: "page1",
                    path: "../testFile1.json",
                    numberOfMatches: 1,
                    link: 'testFile1.json.html'
                },{
                    title: "page2",
                    path: "../testFile2.json",
                    numberOfMatches: 1,
                    link: 'testFile2.json.html'
                }
            ]
        }

        const commonWordOutputFileContent = readOutputFile('word1.json')
        expect(JSON.parse(commonWordOutputFileContent)).toEqual(expectedCommonWordOutputFile)
    });

    function parseTestPage(pageContent,pagePath) {
        const pageLines = pageContent.split(/\r?\n|\r|\n/g);
        const title = pageLines.shift()
        return {
            title: title,
            path: basename(pagePath),
            text: pageLines.reduce((finalText,line) => finalText + '\n' + line,'')
        }
    }
});
