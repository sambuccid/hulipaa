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

    it('cuts the content to maximum 150 characters',() => {
        const content = 'the content with searchedword that is longer than 150 characters because it is very long long long  |100 |105 |110 |115 |120 |125 |130 |135 |140 |145 |150 |155'
        const expectedResult = 'the content with searchedword that is longer than 150 characters because it is very long long long  |100 |105 |110 |115 |120 |125 |130 |135 |140 |145 '

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })

    it('keeps the capitalisation and the accents in the words',() => {
        const content = 'Content with some CAPITALS and Àçcêñtëd letters'
        const expectedResult = content

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })


    // TODO selects section in content with result word
    // TODO maybe it picks sentence from the start? (any punctuation start)
    // TODO picks the section with the maximum number of results
    // TODO rest of tests in this file



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
