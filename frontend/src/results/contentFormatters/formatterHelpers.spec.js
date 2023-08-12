import {
    highlightWords
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
