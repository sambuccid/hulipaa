const getResults = require('../../src/getResults')

describe('getResult', ()=>{
    it('with no parameter provided returns error', ()=>{
        // When / Then
        expect(getResults).toThrow()
    });
    const inputData = {
        title: "aaaaa",
        path: "pages/page1/aa.json",
        text: "a random text"
    }
    const searchedWord = "aaa";
    it('all results match the defined format', ()=>{
        // Given
        // When
        const res = getResults(inputData, searchedWord);
        // Then
        expect(res).toHaveProperty("results")
        expect(res.results.length).toBeGreaterThan(0)
        res.results.forEach((result)=>{
            expect(result).toHaveProperty("title")
            expect(result).toHaveProperty("path")
            expect(result).toHaveProperty("numberOfMatches")
        })
    });
    it('extracts the title', ()=>{
        // Given
        // When
        const res = getResults(inputData, searchedWord);
        // Then
        expect(res.results[0].title).toEqual(inputData.title)
    });
    it('returns the path of the data reachable fom the ui', ()=>{
        // Given
        // When
        const res = getResults(inputData, searchedWord);
        // Then
        expect(res.results[0].path).toEqual("../"+inputData.path)
    });
    it('returns the number of occurrences of a word', ()=>{
        // Given
        const searchedWord = "test"
        const inData = {
          ...inputData,
          text: "a test with the word test repeased 3 times test"
        }
        // When
        const res = getResults(inData, searchedWord);
        // Then
        expect(res.results[0].numberOfMatches).toEqual(3)
    });
    it('returns an error if the searched word is empty', ()=>{
        // Given
        const emptyWord = ""
        // When
        // Then
        expect(()=>{getResults(inputData, emptyWord)}).toThrow()
    });
});
