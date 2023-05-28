const { validateInputData,presenter } = require('../../src/index')
const jp = require('jsonpath')

describe('validateInputData',() => {
    it('validates that the parsed page contains the title',() => {
        const data = {
            path: 'path.js',
            text: 'asasdads'
        }

        expect(() => validateInputData(data)).toThrow()
    });
    it('validates that the parsed page contains a path',() => {
        const data = {
            title: 'page',
            text: 'asasdads'
        }

        expect(() => validateInputData(data)).toThrow()
    });
    it('validates that the parsed page contains the text',() => {
        const data = {
            title: 'page',
            path: 'path.js'
        }

        expect(() => validateInputData(data)).toThrow()
    });
    it('validates that the text in the parsed page is not empty',() => {
        const data = {
            title: 'page',
            path: 'path.js',
            text: ''
        }

        expect(() => validateInputData(data)).toThrow()
    });
});

describe('presenter',() => {
    describe('when run with valid input',() => {
        const resultMap = {
            searchedWord: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    link: 'aa.html',
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
            expect(result[0].fileName).toEqual('searchedword.json')
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
                    link: 'aa.html',
                    numberOfMatches: 0,
                }]
            }
        }
        // When
        const result = presenter(resultMapWithNoMatches)
        // Then
        expect(result).toEqual([])
    });
    it('returns list with one file for each result in resultMap',() => {
        // Given
        const resultMapWithNoMatches = {
            searchedWord: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    link: 'aa.html',
                    numberOfMatches: 1,
                }]
            },
            searchedWord2: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    link: 'aa.html',
                    numberOfMatches: 2,
                }]
            },
            searchedWord3: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    link: 'aa.html',
                    numberOfMatches: 3,
                }]
            }
        }
        // When
        const result = presenter(resultMapWithNoMatches)
        // Then
        expect(result.length).toEqual(3)
    });
    it('normalises results by transforming carachters to normal string without accents',() => {
        // Given
        const resultMap = {
            wordﬀandñ: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    link: 'aa.html',
                    numberOfMatches: 1,
                }]
            }
        }
        // When
        const result = presenter(resultMap)
        // Then
        expect(result.length).toEqual(1)
        expect(result[0]).toHaveProperty("fileName")
        expect(result[0].fileName).toEqual('wordffandn.json')
    });
    it('converts the words in lower case',() => {
        // Given
        const resultMap = {
            UPPERCASEword: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    link: 'aa.html',
                    numberOfMatches: 1,
                }]
            }
        }
        // When
        const result = presenter(resultMap)
        // Then
        expect(result.length).toEqual(1)
        expect(result[0]).toHaveProperty("fileName")
        expect(result[0].fileName).toEqual('uppercaseword.json')
    });
    it('filters number of matches event with multiple results',() => {
        // Given
        const resultMapWithNoMatches = {
            searchedWord: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    link: 'aa.html',
                    numberOfMatches: 1,
                }]
            },
            searchedWord2: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    link: 'aa.html',
                    numberOfMatches: 0,
                }]
            },
            searchedWord3: {
                results: [{
                    title: "helloooo",
                    path: "path.json",
                    link: 'aa.html',
                    numberOfMatches: 3,
                }]
            }
        }
        // When
        const result = presenter(resultMapWithNoMatches)
        // Then
        expect(result.length).toEqual(2)
    });
});


// Experiment to have same tests just defined in a shorter and easier to read way
describe('presenter using jsonpath',() => {
    const defaultInput = {
        word: {
            results: [{
                title: "helloooo",
                path: "path.json",
                link: 'aa.html',
                numberOfMatches: 1,
            }]
        }
    }
    const testedFunction = presenter

    test.each([
        ['returns list','$',r => r.length == 1],
        ['file name created',{ testWord: '$.word' },r => r[0].fileName == 'testword.json'],
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