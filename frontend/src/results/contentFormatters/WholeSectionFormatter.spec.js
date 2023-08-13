import WholeSectionFormatter from './WholeSectionFormatter.js'


describe('execute',() => {
    const searchedWord = "searchedword"

    it('returns all the text if it is short',() => {
        const content = "content very short"
        const expectedResult = "content very short"

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })

    it('substitutes new lines with \\n with space',() => {
        const content = "content very short.\nnew line"
        const expectedResult = "content very short. new line"

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })

    it('substitutes new lines with carriage return with space',() => {
        const content = "content very short\rnew line"
        const expectedResult = "content very short new line"

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })

    it('substitutes new lines with \\r and \\n with space',() => {
        const content = "content very short\r\nnew line"
        const expectedResult = "content very short new line"

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })

    it('hightlights the searched words',() => {
        const secondSearchedWord = "secondword"
        const content = "content with searchedword and secondword"
        const expectedResult = "content with <mark>searchedword</mark> and <mark>secondword</mark>"

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord,secondSearchedWord])

        expect(generatedContent).toBe(expectedResult)
    })

    it('cuts the content to maximum 150 characters',() => {
        const content = 'the content with searchedword that is longer than 150 characters because it is very long long long  |100 |105 |110 |115 |120 |125 |130 |135 |140 |145 |150 |155'
        const expectedResult = 'the content with <mark>searchedword</mark> that is longer than 150 characters because it is very long long long  |100 |105 |110 |115 |120 |125 |130 |135 |140 |145 '

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })

    it('highlights the searched word correctly ingoring non standard characters in both typed word and content word',async () => {
        const wordInText = 'wördnĳ'
        const searchingWord = 'wordñij'
        const normalisedWordInText = 'wordnij'
        const resultText = `some text ${wordInText} some text`
        // in theory we want to keep the result with the original accents, but it just takes long to do
        const expectedResult = `some text <mark>${normalisedWordInText}</mark> some text`

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(resultText,[searchingWord])

        expect(generatedContent).toBe(expectedResult)
    });
    // TODO keep capitalisation and accents of original content (comment above)

    // TODO selects section in content with result word
    // TODO maybe it picks sentence from the start? (any punctuation start)
    // TODO picks the section with the maximum number of results
    // TODO rest of tests in this file


    // it('highlights the searched word correctly when either the typed word or the the word in the content contains upper case values',async () => {
    //     const wordInText = 'CAPITALCASEword'
    //     const searchingWord = 'capitalCASEword'
    //     const lowercaseWordInText = wordInText.toLowerCase()
    //     const resultText = `some text ${wordInText} some text`
    //     // In theory we want to preserve the casing of the result, but it's a bit long to do cause of normalisation
    //     const expectedResult = `some text <mark>${lowercaseWordInText}</mark> some text`

    //     const formatter = new ShortenedLinesFormatter()
    //     const generatedContent = formatter.execute(resultText,[searchingWord])

    //     expect(generatedContent).toBe(expectedResult)
    // });

    // it('can search for multiple words',async () => {
    //     const secondSearchedWord = 'secondword'

    //     const resultText = `The content has 2 results here ${secondSearchedWord} ${searchedWord}\n` +
    //         `and in the new line there is another result ${searchedWord}\n` +
    //         `third line\n` +
    //         `\n` +
    //         `${secondSearchedWord} last line with result`

    //     const expectedResult = `... here <mark>${secondSearchedWord}</mark> <mark>${searchedWord}</mark><br>` +
    //         `... result <mark>${searchedWord}</mark>`

    //     const formatter = new ShortenedLinesFormatter()
    //     const generatedContent = formatter.execute(resultText,[searchedWord,secondSearchedWord])

    //     expect(generatedContent).toBe(expectedResult)
    // });

});
