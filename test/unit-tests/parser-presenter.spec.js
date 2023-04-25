const { parser,presenter } = require('../../src/index')

describe('parser',() => {
    it('parse the data as json string',() => {
        // Given
        const data = '{"title":"helloooo","text":"hey here there are some texts", "path":"aaa.txt"}';
        // When
        const result = parser(data)
        // Then
        expect(result).toEqual({
            title: "helloooo",
            text: "hey here there are some texts",
            path: 'aaa.txt'
        })
    });
});

describe('presenter',() => {
    describe('when run with valid input',() => {
        const resultMap = {
            searchedWord: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    numberOfMatches: 1,
                }]
            }
        }
        let result;
        beforeEach(() => {
            result = presenter(resultMap)
        })

        it('returns the list of files to be created',() => {
            expect(result.length).toBe(1)
        })
        it('returns the name of the file to create',() => {
            expect(result[0]).toHaveProperty("fileName")
            expect(result[0].fileName).toEqual('searchedWord.json')
        })
        it('returns the content of the file as json string',() => {
            expect(result[0]).toHaveProperty("content")
            expect(result[0].content).toEqual(JSON.stringify(resultMap.searchedWord))
        });
    })

    it('filters the result map to remove results with no number of matches',() => {
        // Given
        const resultMapWithNoMatches = {
            searchedWord: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    numberOfMatches: 0,
                }]
            }
        }
        // When
        const result = presenter(resultMapWithNoMatches)
        // Then
        expect(result).toEqual([])
    });
});