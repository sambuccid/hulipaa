import { processSearch } from './general.js'
import * as Network from './network.js'
import * as EL from './EL.js'
import { when,resetAllWhenMocks } from 'jest-when'
import { findCallWithObjectWithProperty } from './test-helper'
import { EXPAND_DIV_TEST_ID } from './results/results-ui'


jest.mock('./network.js',() => {
    return { get: jest.fn(),NetworkError: class { } }
});

jest.mock('./EL.js',() => {
    return {
        div: jest.fn(),
        span: jest.fn(),
        img: jest.fn(),
    }
});

// TODO to move to new file
function simulateHtmlAttributes(element) {
    element.mockAttrList = {}
    element.getAttribute = function (attrName) {
        return this.mockAttrList[attrName]
    }
    element.setAttribute = function (attrName,value) {
        this.mockAttrList[attrName] = value
    }
    element.removeAttribute = function (attrName) {
        this.mockAttrList[attrName] = undefined
    }
}

// TODO to moev to new file
const mockContainer = { appendChild: jest.fn(),replaceChildren: jest.fn() }

function getOnclickPropertyOfResultExpandDiv() {
    // TODO needs to be modified to get on click property
    const correctCallParameters = findCallWithObjectWithProperty(EL.div.mock,"dataTestId",EXPAND_DIV_TEST_ID)
    const firstParameter = correctCallParameters[0]
    const onclickProperty = firstParameter.onclick
    return onclickProperty
}

describe('processSearch',() => {
    const resultList = {
        results: [{
            title: "a page1",
            path: "page1.json",
            link: 'aa.html',
            numberOfMatches: 1
        }]
    };
    // TODO move to different file
    let mockedInnerSpan;
    let mockedDiv;
    const searchedWord = "searchedword"

    beforeEach(() => {
        resetAllWhenMocks()
        jest.clearAllMocks();
        // TODO move to different file
        mockedInnerSpan = {
            innerHTML: null,
            innerText: null,
            id: Math.random()
        }
        when(Network.get).calledWith(`/search/${searchedWord}.json`)
            .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(resultList) })
        // TODO move to different file
        mockedDiv = {
            getElementsByTagName: jest.fn().mockReturnValue([mockedInnerSpan])
        }
        simulateHtmlAttributes(mockedDiv)
        EL.div.mockReturnValue(mockedDiv)
        EL.span.mockReturnValue(mockedInnerSpan)
    });

    async function simulateClickOnResultExpandDiv() {
        const resultOnClick = getOnclickPropertyOfResultExpandDiv();
        const event = { currentTarget: mockedDiv }
        await resultOnClick(event);
    }

    it("calls the backend to get the result",async () => {
        await processSearch(searchedWord,mockContainer)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + searchedWord + ".json");
    });

    it("normalise and removes accents from the searched word before calling the backend",async () => {
        const typedWord = "wörd"
        const expectedWord = "word"
        await processSearch(typedWord,mockContainer)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + expectedWord + ".json");
    });

    it("transform the searched word to lower case before calling the backend",async () => {
        const typedWord = "CAPITALCASEword"
        const expectedWord = "capitalcaseword"
        await processSearch(typedWord,mockContainer)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + expectedWord + ".json");
    });

    // TODO test to check it calls ResultsUI.addElements

    // TODO needs to be adapted with new mocks
    it('the element contains the title of the page',async () => {
        await processSearch(searchedWord,mockContainer)

        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: resultList.results[0].title
        }))
    });

    // TODO needs to be adapted with new mocks
    it('empties the old results before adding the new results',async () => {
        await processSearch(searchedWord,mockContainer)

        expect(mockContainer.replaceChildren).toHaveBeenCalled()
        expect(mockContainer.replaceChildren).toHaveBeenCalledWith()
    });

    // TODO this test will need to become more specific later on, to test that there are 2 elements that are clickable
    // TODO needs to be adapted with new mocks
    it('there should be an element that should be clickable',async () => {
        await processSearch(searchedWord,mockContainer)

        expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
            onclick: expect.anything()
        }))
    });

    // TODO adapt to mock UI
    it("should show an error if the network doesn't work",async () => {
        when(Network.get).calledWith(expect.anything())
            .mockRejectedValue()

        await processSearch(searchedWord,mockContainer)

        // Adds new element
        expect(EL.div).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalledWith(expect.anything())

        // New element contains error
        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: 'Experienced a network issue, please try again'
        }))

        // Error is shown with correct style
        expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
            style: expect.objectContaining({ backgroundColor: '#ff7640' })
        }))
    })

    // TODO adapt to mock UI
    it("should show an error if the search call has problems",async () => {
        when(Network.get).calledWith(expect.anything())
            .mockResolvedValue({ ok: false,status: 500 })

        await processSearch(searchedWord,mockContainer)

        // Adds new element
        expect(EL.div).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalledWith(expect.anything())

        // New element contains error
        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: 'There has been an issue, please try again'
        }))

        // Error is shown with correct style
        expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
            style: expect.objectContaining({ backgroundColor: '#ff7640' })
        }))
    })

    // TODO adapt to mock UI
    it("should show a message if the search doesn't find any result",async () => {
        when(Network.get).calledWith(expect.anything())
            .mockResolvedValue({ ok: false,status: 404 })

        await processSearch(searchedWord,mockContainer)

        // Adds new element
        expect(EL.div).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalledWith(expect.anything())

        // New element contains message
        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: 'No results were found for your search'
        }))

        // Error is shown with correct style
        expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
            style: expect.objectContaining({ backgroundColor: '#ffd24d' })
        }))
    })

    describe('when clicking the result element',() => {
        const result = {
            title: resultList.results[0].title,
            path: resultList.results[0].path,
            text: `content ${searchedWord} of the page`
        };

        beforeEach(() => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(result) })
        });

        // TODO copy to have different version of it
        it("calls the backend to get the content of the result",async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            expect(Network.get).toHaveBeenCalledTimes(2);
            expect(Network.get).toHaveBeenNthCalledWith(2,"/" + resultList.results[0].path);
        });

        // TODO adapt to mock UI
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
        ])('shows the right content of the result, when input %s',
            async (_desc,resultText,expectedResult) => {
                const mockedResult = { ...result,text: resultText }

                when(Network.get).calledWith(`/${resultList.results[0].path}`)
                    .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(mockedResult) })

                await processSearch(searchedWord,mockContainer)

                await simulateClickOnResultExpandDiv();

                // TODO we need a good way of selecting the right span
                expect(mockedInnerSpan.innerHTML).toBe(expectedResult)
            });

        // TODO copy to have different version of it
        // TODO possibly by moving it to it's own test file
        it('highlights the searched word correctly ingoring non standard characters in both typed word and content word',async () => {
            const wordInText = 'wördnĳ'
            const searchingWord = 'wordñij'
            const normalisedWord = 'wordnij'
            const resultText = `some text ${wordInText} some text`
            // in theory there should be a space between the word and the </mark>, but it's a bug with the normalisation and it's not realy worth spending too much time to solve it
            const expectedResult = `some text <mark>${wordInText} </mark>some text`

            const mockedResult = { ...result,text: resultText }

            when(Network.get).calledWith(`/search/${normalisedWord}.json`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(resultList) })
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(mockedResult) })

            await processSearch(searchingWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            expect(mockedInnerSpan.innerHTML).toBe(expectedResult)
        });

        // TODO copy to have different version of it
        // TODO possibly by moving it to it's own test file
        it('highlights the searched word correctly when either the typed word or the the word in the content contains upper case values',async () => {
            const wordInText = 'CAPITALCASEword'
            const searchingWord = 'capitalCASEword'
            const lowercaseWord = 'capitalcaseword'
            const resultText = `some text ${wordInText} some text`
            const expectedResult = `some text <mark>${wordInText}</mark> some text`

            const mockedResult = { ...result,text: resultText }

            when(Network.get).calledWith(`/search/${lowercaseWord}.json`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(resultList) })
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(mockedResult) })

            await processSearch(searchingWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            expect(mockedInnerSpan.innerHTML).toBe(expectedResult)
        });


        // TODO copy to have different version of it
        // TODO possibly by moving it to it's own test file
        it('shows one line for each line in the content that has the searched word',async () => {
            const resultText = `The content has one result here ${searchedWord}\n` +
                `and in the new line there is another result ${searchedWord}\n` +
                `third line\n` +
                `\n` +
                `${searchedWord} last line with result`

            const expectedResult = `...has one result here <mark>${searchedWord}</mark><br>` +
                `... is another result <mark>${searchedWord}</mark><br>` +
                `<mark>${searchedWord}</mark> last line with ...`

            const mockedResult = { ...result,text: resultText }

            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(mockedResult) })

            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            expect(mockedInnerSpan.innerHTML).toBe(expectedResult)
        });

        // TODO this is probably some functionality that is not going to be kept
        it("when clicking the result twice it goes back showing the title of the result",async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();
            await simulateClickOnResultExpandDiv();

            expect(mockedInnerSpan.innerText).toBe(resultList.results[0].title)
        });

        // TODO this is probably some functionality that is not going to be kept
        it("when clicking the result 3 times it shows the content of the result",async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();
            await simulateClickOnResultExpandDiv();
            await simulateClickOnResultExpandDiv();

            const expectedHtml = `content <mark>${searchedWord}</mark> of the page`;
            expect(mockedInnerSpan.innerHTML).toBe(expectedHtml)
        });

        // TODO adapt to mock UI
        it("should show an error if the network doesn't work",async () => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockRejectedValue()

            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            // Removes result
            expect(mockContainer.replaceChildren).toHaveBeenCalled()
            expect(mockContainer.replaceChildren).toHaveBeenCalledWith()

            // Adds new element
            expect(EL.div).toHaveBeenCalledTimes(2)
            expect(mockContainer.appendChild).toHaveBeenCalledTimes(2)

            // New element contains error
            expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
                innerText: 'Experienced a network issue, please try again'
            }))

            // Error is shown with correct style
            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                style: expect.objectContaining({ backgroundColor: '#ff7640' })
            }))
        })

        // TODO adapt to mock UI
        it("should show an error if the result call has problems",async () => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: false,status: 500 })

            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            // Removes result
            expect(mockContainer.replaceChildren).toHaveBeenCalled()
            expect(mockContainer.replaceChildren).toHaveBeenCalledWith()

            // Adds new element
            expect(EL.div).toHaveBeenCalledTimes(2)
            expect(mockContainer.appendChild).toHaveBeenCalledTimes(2)

            // New element contains error
            expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
                innerText: 'There has been an issue, please try again'
            }))

            // Error is shown with correct style
            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                style: expect.objectContaining({ backgroundColor: '#ff7640' })
            }))
        })

        // TODO adapt to mock UI
        it("should show a specific error if the result is not found",async () => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: false,status: 404 })

            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            // Removes result
            expect(mockContainer.replaceChildren).toHaveBeenCalled()
            expect(mockContainer.replaceChildren).toHaveBeenCalledWith()

            // Adds new element
            expect(EL.div).toHaveBeenCalledTimes(2)
            expect(mockContainer.appendChild).toHaveBeenCalledTimes(2)

            // New element contains error
            expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
                innerText: "There has been an error, the result couldn't be found"
            }))

            // Error is shown with correct style
            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                style: expect.objectContaining({ backgroundColor: '#ff7640' })
            }))
        })
    });

});

