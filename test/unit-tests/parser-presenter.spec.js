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
    it('present the data as json string',() => {
        // Given
        const data = {
            results: [{
                title: "helloooo",
                path: "path.json",
                numberOfMatches: 1,
            }]
        }
        // When
        const result = presenter(data)
        // Then
        expect(result).toEqual(JSON.stringify(data))
    });
    it('filters the data to remove results with no number of matches',() => {
        // Given
        const data = {
            results: [{
                title: "helloooo",
                path: "path.json",
                numberOfMatches: 0,
            }]
        }
        // When
        const result = presenter(data)
        // Then
        expect(result).toEqual(null)
    });
});