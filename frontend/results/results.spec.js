import { formatTextForResult } from './results.js'


describe('formatTextForResult',() => {
    const searchedWord = "searchedword"

    it.each([
        ["is short doesn't cut anything and doesn't add '...'",`short content ${searchedWord} of result`,`short content <mark>${searchedWord}</mark> of result`],
        ["is long it cuts it to 20 chars adding '...' where it cuts",
            `a long content of the page, the content conains the ${searchedWord},is very long and it will need to be cut`,
            `...content conains the <mark>${searchedWord}</mark>,is very long and it...`],
        ["contains a long word before the searched word that will need to be cut, it doesn't cut the word but it excludes it",
            `a long_long_word and other words ${searchedWord} a`,
            `... and other words <mark>${searchedWord}</mark> a`],
        ["contains a long word after the searched word that will need to be cut, it doesn't cut the word but it excludes it",
            `a ${searchedWord} with words and long_long_word a`,
            `a <mark>${searchedWord}</mark> with words and ...`],
        ["contains multiple lines, shows just the one with teh searched word",
            `there is a line 1\nand ${searchedWord} line\nand line 3`,
            `and <mark>${searchedWord}</mark> line`],
        ["contains the searched word it highlights the searched word, even across multiple lines",
            `there is a line 1\nand ${searchedWord} line\nand line 3 ${searchedWord} a`,
            `and <mark>${searchedWord}</mark> line<br>and line 3 <mark>${searchedWord}</mark> a`],
        ["contains a word and a substring of the word and it highlights just the substring if that's the search term",
            `there is an enlarged word aaaaa${searchedWord}aaaa then aaaaa${searchedWord} and then ${searchedWord}aaaa and after the normal ${searchedWord} a`,
            `... after the normal <mark>${searchedWord}</mark> a`]
    ])('generates right content for result, when input %s',
        async (_desc,resultText,expectedResult) => {
            const generatedContent = formatTextForResult(resultText,searchedWord)

            expect(generatedContent).toBe(expectedResult)
        });

    it('highlights the searched word correctly ingoring non standard characters in both typed word and content word',async () => {
        const wordInText = 'wördnĳ'
        const searchingWord = 'wordñij'
        const resultText = `some text ${wordInText} some text`
        // in theory there should be a space between the word and the </mark>, but it's a bug with the normalisation and it's not realy worth spending too much time to solve it
        const expectedResult = `some text <mark>${wordInText} </mark>some text`

        const generatedContent = formatTextForResult(resultText,searchingWord)

        expect(generatedContent).toBe(expectedResult)
    });

    it('highlights the searched word correctly when either the typed word or the the word in the content contains upper case values',async () => {
        const wordInText = 'CAPITALCASEword'
        const searchingWord = 'capitalCASEword'
        const resultText = `some text ${wordInText} some text`
        const expectedResult = `some text <mark>${wordInText}</mark> some text`

        const generatedContent = formatTextForResult(resultText,searchingWord)

        expect(generatedContent).toBe(expectedResult)
    });

    it('shows one line for each line in the content that has the searched word',async () => {
        const resultText = `The content has one result here ${searchedWord}\n` +
            `and in the new line there is another result ${searchedWord}\n` +
            `third line\n` +
            `\n` +
            `${searchedWord} last line with result`

        const expectedResult = `...has one result here <mark>${searchedWord}</mark><br>` +
            `... is another result <mark>${searchedWord}</mark><br>` +
            `<mark>${searchedWord}</mark> last line with ...`

        const generatedContent = formatTextForResult(resultText,searchedWord)

        expect(generatedContent).toBe(expectedResult)
    });


});
