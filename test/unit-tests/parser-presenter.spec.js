const { parser, presenter } = require('../../src/index')

describe('parser', ()=>{
    it('parse the data as json string', ()=>{
        // Given
        const data = '{"title":"helloooo","infos":"hey here there are some infos"}';
        // When
        const result = parser(data)
        // Then
        expect(result).toEqual({
            title: "helloooo",
            infos:"hey here there are some infos"
        })
    });
});

describe('presenter', ()=>{
    it('present the data as json string', ()=>{
        // Given
        const data = {
            title: "helloooo",
            infos:"hey here there are some infos"
        }
        // When
        const result = presenter(data)
        // Then
        expect(result).toEqual('{"title":"helloooo","infos":"hey here there are some infos"}')
    });
});