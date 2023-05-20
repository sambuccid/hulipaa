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
        const typedWord = "wordñij"
        const expectedWord = "wordnij"
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

    // TODO test to check it calls ResultsUI.addElements with right parameters

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

        // TODO adapt to mock UI
        it("calls the backend to get the content of the result",async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            expect(Network.get).toHaveBeenCalledTimes(2);
            expect(Network.get).toHaveBeenNthCalledWith(2,"/" + resultList.results[0].path);
        });

        // TODO adapt to mock UI
        it('formats the content of the result',async () => {
            const resultText = `short content ${searchedWord} of result`
            const expectedResult = `short content <mark>${searchedWord}</mark> of result`

            const mockedResult = { ...result,text: resultText }

            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(mockedResult) })

            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            // TODO we need a good way of selecting the right span
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

