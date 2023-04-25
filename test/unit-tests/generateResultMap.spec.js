const generateResultMap = require('../../src/generateResultMap')

describe('generateResultMap',() => {
    it('with no parameter provided returns error',() => {
        // When / Then
        expect(generateResultMap).toThrow()
    });
    const firstWordTest = "firstWordInFile"
    const inputData = {
        title: "aaaaa",
        path: "pages/page1/aa.json",
        text: `${firstWordTest} random text`
    }
    it('returns a map of the results',() => {
        // Given
        // When
        const res = generateResultMap(inputData);
        // Then
        expect(res).toHaveProperty(firstWordTest)
    })
    it('all results match the defined format',() => {
        // Given
        // When
        const res = generateResultMap(inputData);
        // Then
        expect(res[firstWordTest]).toHaveProperty("results")
        expect(res[firstWordTest].results.length).toBeGreaterThan(0)
        res[firstWordTest].results.forEach((result) => {
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
        expect(res[firstWordTest].results[0].title).toEqual(inputData.title)
    });
    it('returns the path of the data reachable fom the ui',() => {
        // Given
        // When
        const res = generateResultMap(inputData);
        // Then
        expect(res[firstWordTest].results[0].path).toEqual("../" + inputData.path)
    });
    it('returns the number of occurrences of a word',() => {
        // Given
        const searchedWord = "firstWordInFile"
        const inData = {
            ...inputData,
            text: `${searchedWord} test with the word ${searchedWord} repeased 3 times ${searchedWord}`
        }
        // When
        const res = generateResultMap(inData);
        // Then
        expect(res[searchedWord].results[0].numberOfMatches).toEqual(3)
    });
});
