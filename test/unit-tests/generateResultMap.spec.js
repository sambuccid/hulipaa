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
            text: wordTest
        }
        it('returns a map of the results',() => {
            // Given
            // When
            const res = generateResultMap(inputData);
            // Then
            expect(res).toHaveProperty(wordTest)
        })
        it('all results match the defined format',() => {
            // Given
            // When
            const res = generateResultMap(inputData);
            // Then
            expect(res[wordTest]).toHaveProperty("results")
            expect(res[wordTest].results.length).toBeGreaterThan(0)
            res[wordTest].results.forEach((result) => {
                expect(result).toHaveProperty("title")
                expect(result).toHaveProperty("path")
                expect(result).toHaveProperty("numberOfMatches")
            })
        });
        it('extracts the title',() => {
            // Given
            // When
            const res = generateResultMap(inputData);
            // Then
            expect(res[wordTest].results[0].title).toEqual(inputData.title)
        });
        it('returns the path of the data reachable fom the ui',() => {
            // Given
            // When
            const res = generateResultMap(inputData);
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
            text: `${searchedWord} test with the word ${searchedWord} repeased 3 times ${searchedWord}`
        }
        // When
        const res = generateResultMap(inputData);
        // Then
        expect(res[searchedWord].results[0].numberOfMatches).toEqual(3)
    });
    it('the result map contains a word for each word in the file',() => {
        // Given
        const inputData = {
            title: "aaaaa",
            path: "pages/page1/aa.json",
            text: `word1 word2 word3`
        }
        // When
        const res = generateResultMap(inputData);
        // Then
        expect(res).toHaveProperty('word1')
        expect(res).toHaveProperty('word2')
        expect(res).toHaveProperty('word3')
    });
    it('finds different words when separated by symbols',() => {
        // Given
        // const inData = {
        //     ...inputData,
        //     text: `word1 word2 word3`
        // }
        // When
        // const res = generateResultMap(inData);
        // Then
        // expect(res).toHaveProperty('word1')
        // expect(res).toHaveProperty('word2')
        // expect(res).toHaveProperty('word3')
        expect(true).toBe(false)
    });
});
