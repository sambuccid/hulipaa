import {
    normaliseAndLowecase,
} from './helpers.js'


describe('normaliseAndLowecase',() => {
    it('removes accents',() => {
        const word = 'wördñ'
        const expectedWord = 'wordn'

        const actualWord = normaliseAndLowecase(word)

        expect(actualWord).toBe(expectedWord)
    })
    it('separates united letters',() => {
        const word = 'wĳrd'
        const expectedWord = 'wijrd'

        const actualWord = normaliseAndLowecase(word)

        expect(actualWord).toBe(expectedWord)
    })
    it('removes capital letters',() => {
        const word = 'WORd'
        const expectedWord = 'word'

        const actualWord = normaliseAndLowecase(word)

        expect(actualWord).toBe(expectedWord)
    })
})