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

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent.length).toBeLessThan(150)
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

    it('selects a section long maximum 150 chars even when the result word is at the start of the section',() => {
        const content = 'searchedword very long content that is longer that 150 characters, near the start the content contains the word that is being searched so it will need to find the and cut the right section from the content that contains the word'

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent.length).toBeLessThan(151)
        expect(generatedContent.length).toBeGreaterThan(140)
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

    it("selects the right section with the searched word when searched word has different accents",() => {
        const searchingWord = 'sèãrchedWORD'

        const content = 'word word word very_very_very_very_very_very_very_very_very_long_long_long_word some text that is long a bit less than 75 chars before it has the searchedword and then more text that is still long and then has very_very_very_very_very_long_long_long_word and then the end of the content'
        const expectedResult = 'some text that is long a bit less than 75 chars before it has the searchedword and then more text that is still long and then has'

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchingWord])

        expect(generatedContent).toBe(expectedResult)
    })

    it("selects the right section with the searched word when the word in the text content has different accents",() => {
        const content = 'word word word very_very_very_very_very_very_very_very_very_long_long_long_word some text that is long a bit less than 75 chars before it has the sèãrchedWORD and then more text that is still long and then has very_very_very_very_very_long_long_long_word and then the end of the content'
        const expectedResult = 'some text that is long a bit less than 75 chars before it has the sèãrchedWORD and then more text that is still long and then has'

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toBe(expectedResult)
    })

    it("selects section with more number of searched words",() => {
        const firstSectionContent = 'some text that is long enought and that has the searchedword searchedword 2 times and then more text that is still long and then has'
        const secondSectionContent = 'a different section long enought and that has the searchedword searchedword searchedword 3 times and then more text that is still long and then has'
        const content = `word word word very_very_very_very_very_very_very_very_very_long_long_long_word ${firstSectionContent} very_very_very_very_very_long_long_long_word and then some words to space the sections out | and then different section very_very_very_very_very_very_very_very_very_long_long_long_word ${secondSectionContent} very_very_very_very_very_long_long_long_word and then the end of the content`
        // The result shouldn't be exactly the whole section as it doesn't need to be 100% precise
        // it just needs to select the right section
        const expectedResult = secondSectionContent.substring(10,secondSectionContent.length - 10)

        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,[searchedWord])

        expect(generatedContent).toContain(expectedResult)
    })

    it('can search for multiple words',() => {
        let sectionWith2ResultsOfFirstWord = ' word1 word1 '
        sectionWith2ResultsOfFirstWord = padTextWith({
            text: sectionWith2ResultsOfFirstWord,
            padding: '1 ',
            totalLength: 150
        })
        let sectionWith1ResultOfFirstWordAnd2ResultsOfSecondWord = ' word1 word2 word2 '
        sectionWith1ResultOfFirstWordAnd2ResultsOfSecondWord = padTextWith({
            text: sectionWith1ResultOfFirstWordAnd2ResultsOfSecondWord,
            padding: '2 ',
            totalLength: 150
        })
        const separatorUsingBigLongWord = 'w'.repeat(100)
        const content = `${sectionWith2ResultsOfFirstWord} ${separatorUsingBigLongWord} ${sectionWith1ResultOfFirstWordAnd2ResultsOfSecondWord}`
        // The result shouldn't be exactly the whole section as it doesn't need to be 100% precise
        // it just needs to select the right section
        const expectedResult = sectionWith1ResultOfFirstWordAnd2ResultsOfSecondWord.substring(10,sectionWith1ResultOfFirstWordAnd2ResultsOfSecondWord.length - 10)

        const searchedWords = ['word1','word2']
        const formatter = new WholeSectionFormatter()
        const generatedContent = formatter.execute(content,searchedWords)

        expect(generatedContent).toContain(expectedResult)
    })
});

// This function is not precise, it might make the result slightly smaller than the totalLength
function padTextWith({ text,padding,totalLength }) {
    const lengthToFill = totalLength - text.length
    if (lengthToFill <= 0)
        return text
    let timesToRepeatPadding = Math.floor(lengthToFill / padding.length)
    timesToRepeatPadding = Math.floor(timesToRepeatPadding / 2) // Because the padding needs to be halved between the start and the end of the string
    const paddingStartOrEndString = padding.repeat(timesToRepeatPadding)
    return paddingStartOrEndString + text + paddingStartOrEndString;
}