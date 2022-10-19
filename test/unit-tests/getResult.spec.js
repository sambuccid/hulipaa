const getResults = require('../../src/getResults')

describe('getResult', ()=>{
    it('with no parameter provided returns error', ()=>{
        // When / Then
        expect(getResults).toThrow()
    });
    const inputData = {
        title: "aaaaa",
        path: "pages/page1/aa.json"
    }
    it('all results match the defined format', ()=>{
        // Given
        // When
        const res = getResults(inputData);
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
        const res = getResults(inputData);
        // Then
        expect(res.results[0].title).toEqual(inputData.title)
    });
    it('return the path of the data reachable fom the ui', ()=>{
        // Given
        // When
        const res = getResults(inputData);
        // Then
        expect(res.results[0].path).toEqual("../"+inputData.path)
    });
});
