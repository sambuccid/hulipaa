const { parser,presenter } = require('../../src/index')
const jp = require('jsonpath')

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


// Experiment to have same tests just defined in a shorter and easier to read way
describe('presenter using jsonpath',() => {
    const defaultInput = {
        word: {
            results: [{
                title: "helloooo",
                path: "path.json",
                numberOfMatches: 1,
            }]
        }
    }
    const testedFunction = presenter

    test.each([
        ['returns list','$',r => r.length == 1],
        ['file name created',{ testWord: '$.word' },r => r[0].fileName == 'testWord.json'],
        ['json content','$',r => r[0].content == JSON.stringify(defaultInput.word)],
        // ['filters no matches',['$..numberOfMatches',0],r => r.length == 0]
    ])('%s',(_desc,objectModifier,testResult) => {
        //modify input with jsonpath
        let input
        if (objectModifier == '$') {
            input = defaultInput
        } else if (Array.isArray(objectModifier)) {
            console.log("aaa")
            input = substituteJsonpathArray(objectModifier,defaultInput)
        } else if (typeof objectModifier === 'object') {
            input = substituteJsonpath(objectModifier,defaultInput)
        }

        let result = testedFunction(input)
        expect(testResult(result)).toBe(true)
    });

    function substituteJsonpath(objectWithJsonpath,input) {
        const finalObject = { ...objectWithJsonpath }
        for (let key in objectWithJsonpath) {
            if (typeof objectWithJsonpath[key] === 'string') {
                const jsonpathPath = objectWithJsonpath[key]
                let value = jp.query(input,jsonpathPath)[0]
                finalObject[key] = value
            } else if (Array.isArray(objectWithJsonpath[key])) {
                finalObject[key] = finalObject[key].map(value => substituteJsonpath(value,input))
            } else {
                finalObject[key] = substituteJsonpath(objectWithJsonpath[key],input)
            }
        }
        return finalObject
    }

});