import ShortenedLinesFormatter from './ShortenedLinesFormatter.js'


describe('execute',() => {
    const searchedWord = "searchedword"

    it.each([
        ["is short doesn't cut anything and doesn't add '...'",`short ${searchedWord} of result`,`short <mark>${searchedWord}</mark> of result`],
        ["is long it cuts it to 10 chars adding '...' where it cuts",
            `a long content of the page, the content conains ${searchedWord},is very long and it will need to be cut`,
            `... conains <mark>${searchedWord}</mark>,is very ...`],
        ["contains a long word before the searched word that will need to be cut, it doesn't cut the word but it excludes it",
            `a long_long_word ${searchedWord} a`,
            `... <mark>${searchedWord}</mark> a`],
        ["contains a long word after the searched word that will need to be cut, it doesn't cut the word but it excludes it",
            `a ${searchedWord} long_long_word a`,
            `a <mark>${searchedWord}</mark> ...`],
        ["contains multiple lines, shows just the one with the searched word",
            `there is a line 1\nand ${searchedWord} line\nand line 3`,
            `and <mark>${searchedWord}</mark> line`],
        ["contains the searched word it highlights the searched word, even across multiple lines",
            `there is a line 1\nand ${searchedWord} line\nand line 3 ${searchedWord} a`,
            `and <mark>${searchedWord}</mark> line<br>... line 3 <mark>${searchedWord}</mark> a`],
        ["contains a word and a substring of the word and it highlights just the substring if that's the search term",
            `there is an enlarged word aaaaa${searchedWord}aaaa then aaaaa${searchedWord} and then ${searchedWord}aaaa and after the normal ${searchedWord} a`,
            `... normal <mark>${searchedWord}</mark> a`]
    ])('generates right content for result, when input %s',
        async (_desc,resultText,expectedResult) => {
            const formatter = new ShortenedLinesFormatter()
            const generatedContent = formatter.execute(resultText,[searchedWord])

            expect(generatedContent).toBe(expectedResult)
        });

    it('highlights the searched word correctly ingoring non standard characters in both typed word and content word',async () => {
        const wordInText = 'wördnĳ'
        const searchingWord = 'wordñij'
        const normalisedWordInText = 'wordnij'
        const resultText = `some text ${wordInText} some text`
        // in theory we want to keep the result with the original accents, but it just takes long to do
        const expectedResult = `some text <mark>${normalisedWordInText}</mark> some text`

        const formatter = new ShortenedLinesFormatter()
        const generatedContent = formatter.execute(resultText,[searchingWord])

        expect(generatedContent).toBe(expectedResult)
    });

    it('highlights the searched word correctly when either the typed word or the the word in the content contains upper case values',async () => {
        const wordInText = 'CAPITALCASEword'
        const searchingWord = 'capitalCASEword'
        const lowercaseWordInText = wordInText.toLowerCase()
        const resultText = `some text ${wordInText} some text`
        // In theory we want to preserve the casing of the result, but it's a bit long to do cause of normalisation
        const expectedResult = `some text <mark>${lowercaseWordInText}</mark> some text`

        const formatter = new ShortenedLinesFormatter()
        const generatedContent = formatter.execute(resultText,[searchingWord])

        expect(generatedContent).toBe(expectedResult)
    });

    it('shows one line for each line in the content that has the searched word, up to a max of 2 lines',async () => {
        const resultText = `The content has one result here ${searchedWord}\n` +
            `and in the new line there is another result ${searchedWord}\n` +
            `third line\n` +
            `\n` +
            `${searchedWord} last line with result`

        const expectedResult = `... here <mark>${searchedWord}</mark><br>` +
            `... result <mark>${searchedWord}</mark>`

        const formatter = new ShortenedLinesFormatter()
        const generatedContent = formatter.execute(resultText,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    });


    it('can search for multiple words',async () => {
        const secondSearchedWord = 'secondword'

        const resultText = `The content has 2 results here ${secondSearchedWord} ${searchedWord}\n` +
            `and in the new line there is another result ${searchedWord}\n` +
            `third line\n` +
            `\n` +
            `${secondSearchedWord} last line with result`

        const expectedResult = `... here <mark>${secondSearchedWord}</mark> <mark>${searchedWord}</mark><br>` +
            `... result <mark>${searchedWord}</mark>`

        const formatter = new ShortenedLinesFormatter()
        const generatedContent = formatter.execute(resultText,[searchedWord,secondSearchedWord])

        expect(generatedContent).toBe(expectedResult)
    });

    it('finds the 2 sections of text that contains most of the searched words',async () => {
        const firstSearchedWord = 'first'
        const secondSearchedWord = 'second'

        const resultText = `The content has 2 results here ${secondSearchedWord} ${firstSearchedWord}\n` +
            `and in the new line there is another result ${firstSearchedWord}\n` +
            `third line\n` +
            `${firstSearchedWord} an amazing line with every thing ${firstSearchedWord} ${secondSearchedWord} ${firstSearchedWord}\n` +
            `${secondSearchedWord} last line with result`

        const expectedResult = `... here <mark>${secondSearchedWord}</mark> <mark>${firstSearchedWord}</mark><br>` +
            `... thing <mark>${firstSearchedWord}</mark> <mark>${secondSearchedWord}</mark> <mark>${firstSearchedWord}</mark>`

        const formatter = new ShortenedLinesFormatter()
        const generatedContent = formatter.execute(resultText,[firstSearchedWord,secondSearchedWord])

        expect(generatedContent).toBe(expectedResult)
    });

    it('finds the 2 sections of text that contains most of the searched words even if the sections are on the same line',async () => {
        const firstSearchedWord = 'first'
        const secondSearchedWord = 'second'
        const thirdsSearchedWord = '3'

        const resultText = `The content has 2 results here ${secondSearchedWord} ${firstSearchedWord}\n` +
            `Line with every thing ${secondSearchedWord} ${firstSearchedWord} ${secondSearchedWord} and some more text long that separates ${firstSearchedWord} ${secondSearchedWord} ${firstSearchedWord} ${thirdsSearchedWord}\n` +
            `${secondSearchedWord} last line with result`

        const expectedResult = `... thing <mark>${secondSearchedWord}</mark> <mark>${firstSearchedWord}</mark> <mark>${secondSearchedWord}</mark> and some ...<br>` +
            `...separates <mark>${firstSearchedWord}</mark> <mark>${secondSearchedWord}</mark> <mark>${firstSearchedWord}</mark> <mark>${thirdsSearchedWord}</mark>`

        const formatter = new ShortenedLinesFormatter()
        const generatedContent = formatter.execute(resultText,[firstSearchedWord,secondSearchedWord,thirdsSearchedWord])

        expect(generatedContent).toBe(expectedResult)
    });
});
