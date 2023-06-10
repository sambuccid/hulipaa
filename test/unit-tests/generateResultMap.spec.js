const generateResultMap = require('../../src/generateResultMap')

describe('generateResultMap',() => {
    it('with no parameter provided returns error',() => {
        // When / Then
        expect(generateResultMap).toThrow()
    });
    describe('file with 1 word',() => {
        const wordTest = "wordInFile"
        const inputData = {
            title: "aaaaa",
            path: "pages/page1/aa.json",
            text: wordTest,
            link: "aa.html"
        }
        it('returns a map of the results',() => {
            // Given
            // When
            const res = {}
            generateResultMap(inputData,res);
            // Then
            expect(res).toHaveProperty(wordTest)
        })
        it('all results match the defined format',() => {
            // Given
            // When
            const res = {}
            generateResultMap(inputData,res);
            // Then
            expect(res[wordTest]).toHaveProperty("results")
            expect(res[wordTest].results.length).toBeGreaterThan(0)
            res[wordTest].results.forEach((result) => {
                expect(result).toHaveProperty("title")
                expect(result).toHaveProperty("path")
                expect(result).toHaveProperty("numberOfMatches")
                expect(result).toHaveProperty("link")
            })
        });
        it('extracts the title',() => {
            // Given
            // When
            const res = {}
            generateResultMap(inputData,res);
            // Then
            expect(res[wordTest].results[0].title).toEqual(inputData.title)
        });
        it('returns the path of the data reachable fom the ui',() => {
            // Given
            // When
            const res = {}
            generateResultMap(inputData,res);
            // Then
            expect(res[wordTest].results[0].path).toEqual("../" + inputData.path)
        });
    })
    it('returns the number of occurrences of a word',() => {
        // Given
        const searchedWord = "wordInFile"
        const inputData = {
            title: "aaaaa",
            path: "pages/page1/aa.json",
            text: `${searchedWord} test with the word ${searchedWord} repeased 3 times ${searchedWord}`,
            link: 'aa.html'
        }
        // When
        const res = {}
        generateResultMap(inputData,res);
        // Then
        expect(res[searchedWord].results[0].numberOfMatches).toEqual(3)
    });
    it('the result map contains a word for each word in the file',() => {
        // Given
        const inputData = {
            title: "aaaaa",
            path: "pages/page1/aa.json",
            text: `word1 word2 word3`,
            link: 'aa.html'
        }
        // When
        const res = {}
        generateResultMap(inputData,res);
        // Then
        expect(res).toHaveProperty('word1')
        expect(res).toHaveProperty('word2')
        expect(res).toHaveProperty('word3')
    });
    it('finds different words when separated by symbols',() => {
        // Given
        const inputData = {
            title: "aaaaa",
            path: "pages/page1/aa.json",
            text: `w word2.word3,word4/word5+wÖrd6-word7(word8"word9")word10`,
            link: 'aa.html'
        }
        // When
        const res = {}
        generateResultMap(inputData,res);
        // Then
        const expectedResults = ["w",'word2','word3','word4','word5','wÖrd6','word7','word8','word9',"word10"]
        expect(Object.keys(res).length).toBe(10)
        for (let expectedWord of expectedResults) {
            expect(res).toHaveProperty(expectedWord)
        }
    });
    it('populates results from different files',() => {
        // Given
        const inputData1 = {
            title: "page1",
            path: "pages/page1.json",
            text: `word1 word2 word3`,
            link: 'page1.html'
        }
        const inputData2 = {
            title: "page2",
            path: "pages/page2.json",
            text: `word1 word4 word5`,
            link: 'page2.html'
        }
        // When
        const resultMap = {}
        generateResultMap(inputData1,resultMap);
        generateResultMap(inputData2,resultMap);
        // Then
        //has results from both files
        const expectedResults = ['word1','word2','word3','word4','word5']
        expect(Object.keys(resultMap).length).toBe(5)
        for (let expectedWord of expectedResults) {
            expect(resultMap).toHaveProperty(expectedWord)
        }
        //found that word1 was in both pages
        expect(resultMap.word1.results.length).toBe(2)
        expect(resultMap.word1.results).toContainEqual(expect.objectContaining({
            title: 'page1'
        }))
        expect(resultMap.word1.results).toContainEqual(expect.objectContaining({
            title: 'page2'
        }))
    });
});
