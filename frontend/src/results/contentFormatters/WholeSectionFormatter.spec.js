import WholeSectionFormatter from './WholeSectionFormatter.js'


describe('execute',() => {
    const searchedWord = "searchedword"

    it("returns all the text if it is short and doesn't contain the word",() => {
        const content = "content very short"
        const expectedResult = content

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })

    it('returns all the text if it is short',() => {
        const content = "content very searchedword short"
        const expectedResult = content

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
        const expectedResult = 'the content with searchedword that is longer than 150 characters because it is very long long long  |100 |105 |110 |115 |120 |125 |130 |135 |140 |145'

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

    it('select a section of the content with the the searched word',() => {
        const content = 'Very long content that is longer that 150 characters, near the end the content contains the word that is being searched so it will need to find the searchedword and cut the right section from the content that contains the word'

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toMatch(searchedWord)
    })

    it('selects a section long 150 chars even when the result word is at the start of the section',() => {
        const content = 'Very long searchedword content that is longer that 150 characters, near the start the content contains the word that is being searched so it will need to find the and cut the right section from the content that contains the word'

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent.length).toBe(150)
    })

    it("when it selects a section it doesn't split a word",() => {
        const content = 'word word word very_very_very_very_very_very_very_very_very_long_long_long_word some text that is long a bit less than 75 chars before it has the searchedword and then more text that is still long and then has very_very_very_very_very_long_long_long_word and then the end of the content'
        const expectedResult = 'some text that is long a bit less than 75 chars before it has the searchedword and then more text that is still long and then has'

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })


    it("trims the result to remove empty spaces",() => {
        const content = '  some content  '
        const expectedResult = 'some content'

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })

    //TODO it trims the formatted result

    //TODO finds section even with capital/accents words
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
