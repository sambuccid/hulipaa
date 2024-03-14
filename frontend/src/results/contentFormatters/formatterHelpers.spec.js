import {
    highlightWords,
    getSectionWithMostNumberOfResultsUnprecise
} from './formatterHelpers.js'

describe('highlightWords',() => {
    it('hightlights a word',() => {
        const word = "test"
        const text = "some text with the test word"
        const expected = "some text with the <mark>test</mark> word"

        const actual = highlightWords([word],text)

        expect(actual).toBe(expected)
    })

    it('hightlights multiple words',() => {
        const word1 = "test"
        const word2 = "with"
        const text = "some text with the test word"
        const expected = "some text <mark>with</mark> the <mark>test</mark> word"

        const actual = highlightWords([word1,word2],text)

        expect(actual).toBe(expected)
    })

    it('it does not highlight part of a bigger word',() => {
        const word = 'the'
        const text = 'some text with theme word'
        const expected = 'some text with theme word'

        const actual = highlightWords([word],text)

        expect(actual).toBe(expected)
    })

    it('it does highlight the word with it is close to a comma',() => {
        const word = 'test'
        const text = 'some text with the test, word'
        const expected = 'some text with the <mark>test</mark>, word'

        const actual = highlightWords([word],text)

        expect(actual).toBe(expected)
    })

    it('it does consider dash part of a word',() => {
        const word = 'test-word'
        const text = 'some text with the test-word inside'
        const expected = 'some text with the <mark>test-word</mark> inside'

        const actual = highlightWords([word],text)

        expect(actual).toBe(expected)
    })
})

describe('getSectionWithMostNumberOfResultsUnprecise',() => {
    it('returns all the text if the section length is longer than the text',() => {
        const text = 'test text'
        const searchedWord = 'test'
        const sectionLength = 50
        const expectedResult = text

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(text,[searchedWord],sectionLength)
        const actualStringExtracted = extractString(text,sectionStartIdx,sectionEndIdx)

        expect(actualStringExtracted).toBe(expectedResult)
        expect(sectionEndIdx - sectionStartIdx).toBe(expectedResult.length)
    })

    it('gets the section at the start of the text if the word is not found',() => {
        const text = 'test text'
        const searchedWord = 'word'
        const sectionLength = 4

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(text,[searchedWord],sectionLength)
        const actualStringExtracted = extractString(text,sectionStartIdx,sectionEndIdx)

        expect(actualStringExtracted).toBe('test')
    })

    it('returns the section with 2 words if there are 2 sections, 1 with 1 word and 1 with 2 words',() => {
        const text = 'test word test test word word test'
        const searchedWord = 'word'
        const sectionLength = 15

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(text,[searchedWord],sectionLength)
        const actualStringExtracted = extractString(text,sectionStartIdx,sectionEndIdx)

        expect(actualStringExtracted).toContain('word word')
    })

    it('works even when there is just one result',() => {
        const text = 'test test test test word'
        const searchedWord = 'word'
        const sectionLength = 10

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(text,[searchedWord],sectionLength)
        const actualStringExtracted = extractString(text,sectionStartIdx,sectionEndIdx)

        expect(actualStringExtracted).toContain('word')
    })

    it('works even when there are just two results',() => {
        const text = 'test test test word test word'
        const searchedWord = 'word'
        const sectionLength = 20

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(text,[searchedWord],sectionLength)
        const actualStringExtracted = extractString(text,sectionStartIdx,sectionEndIdx)

        expect(actualStringExtracted).toContain('word test word')
    })

    it('returns the right length of a section even when the found word is at the end',() => {
        const text = 'test test test test word'
        const searchedWord = 'word'
        const sectionLength = 10

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(text,[searchedWord],sectionLength)
        const actualStringExtracted = extractString(text,sectionStartIdx,sectionEndIdx)

        expect(actualStringExtracted.length).toBe(sectionLength)
    })

    it('searches for multiple words',() => {
        const text = 'test word1 word1 test test word1 word2 word3 test'
        const searchedWords = ['word1','word2','word3']
        const sectionLength = 20

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(text,searchedWords,sectionLength)
        const actualStringExtracted = extractString(text,sectionStartIdx,sectionEndIdx)

        expect(actualStringExtracted).toContain('word1 word2 word3')
    })

    it('supports many number of results',() => {
        const text = 'A f B A 3 results | A B A f A 4 results | A f B C C A 5 results  | A f B A C A B 6 results | A f B f C f A f B f C f A 7 results on too long section | no results'
        const searchedWords = ['A','B','C']
        const sectionLength = 19

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(text,searchedWords,sectionLength)
        const actualStringExtracted = extractString(text,sectionStartIdx,sectionEndIdx)

        expect(actualStringExtracted).toContain('A f B A C A B 6')
    })

    it('extract section keeping results in the middle',() => {
        const text = 'test word A B A C word test'
        const searchedWords = ['A','B','C']
        const sectionLength = 18

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(text,searchedWords,sectionLength)
        const actualStringExtracted = extractString(text,sectionStartIdx,sectionEndIdx)

        expect(actualStringExtracted).toContain('word A B A C word')
    })

    it("the minimum start of the section is always 0",() => {
        const text = 'test A B A C test test test test test test test'
        const searchedWords = ['A','B','C']
        const sectionLength = 40

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(text,searchedWords,sectionLength)

        expect(sectionStartIdx).toBe(0)
    })

    function extractString(text,sectionStartIdx,sectionEndIdx) {
        return text.substring(sectionStartIdx,sectionEndIdx)
    }
})