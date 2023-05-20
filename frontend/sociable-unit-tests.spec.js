import { processSearch } from './general.js'
import * as Network from './network.js'
import * as EL from './EL.js'
import * as ResultsUI from './results/results-ui.js'
import { when,resetAllWhenMocks } from 'jest-when'
import { findCallWithObjectWithProperty } from './test-helper'
import { EXPAND_DIV_TEST_ID } from './results/results-ui'


jest.mock('./network.js',() => {
    return { get: jest.fn(),NetworkError: class { } }
});

// jest.mock('./EL.js',() => {
//     return {
//         div: jest.fn(),
//         span: jest.fn(),
//         img: jest.fn(),
//     }
// });
jest.mock('./results/results-ui.js',() => {
    const actualModule = jest.requireActual('./results/results-ui.js');
    return {
        addElements: jest.fn(),
        clear: jest.fn(),
        isExpanded: jest.fn(),
        expand: jest.fn(),
        collapse: jest.fn(),
        populateExpandWith: jest.fn(),
        populateExpandWithImage: jest.fn(),
        messageType: actualModule.messageType
        // EXPAND_DIV_CLASS_NAME = 'expand-div'
        // messageType = {...}
        // addElements(div,{ resultTitle,onclickExpandDiv,type })
        // populateExpandWithImage({ expandDiv })
        // createImageExpandDiv()
        // populateExpandWith({ expandDiv,htmlText,text })
        // clear(div)
        // isExpanded({ expandDiv })
        // expand({ expandDiv })
        // collapse({ expandDiv })
    }
})

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

// TODO to move to new file
const mockContainer = { appendChild: jest.fn(),replaceChildren: jest.fn() }

function getOnclickPropertyOfResultExpandDiv() {
    const correctCallParameters = ResultsUI.addElements.mock.lastCall
    const secondParameter = correctCallParameters[1]
    const onclickProperty = secondParameter.onclickExpandDiv
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

    const mockedExpandDiv = '<div>test-expanded-div</div>'

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
        ResultsUI.isExpanded.mockReturnValue(false)
        // simulateHtmlAttributes(mockedDiv)
        // EL.div.mockReturnValue(mockedDiv)
        // EL.span.mockReturnValue(mockedInnerSpan)
    });

    async function simulateClickOnResultExpandDiv() {
        const resultOnClick = getOnclickPropertyOfResultExpandDiv();
        const event = { currentTarget: mockedExpandDiv }
        await resultOnClick(event);
        ResultsUI.isExpanded.mockReturnValue(!ResultsUI.isExpanded())
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

    it('the element contains the title of the page',async () => {
        await processSearch(searchedWord,mockContainer)

        expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            resultTitle: resultList.results[0].title
        }))
    });

    it('empties the old results before adding the new results',async () => {
        await processSearch(searchedWord,mockContainer)

        expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)
    });

    it('there should be the expand element that should be clickable',async () => {
        await processSearch(searchedWord,mockContainer)

        expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            onclickExpandDiv: expect.anything()
        }))
    });

    it("should show an error if the network doesn't work",async () => {
        when(Network.get).calledWith(expect.anything())
            .mockRejectedValue()

        await processSearch(searchedWord,mockContainer)

        // Removes old elements
        expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

        // Adds new element with correct message and error style
        expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            resultTitle: 'Experienced a network issue, please try again',
            type: ResultsUI.messageType.ERROR
        }))
    })

    it("should show an error if the search call has problems",async () => {
        when(Network.get).calledWith(expect.anything())
            .mockResolvedValue({ ok: false,status: 500 })

        await processSearch(searchedWord,mockContainer)

        // Removes old elements
        expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

        // Adds new element with correct message and error style
        expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            resultTitle: 'There has been an issue, please try again',
            type: ResultsUI.messageType.ERROR
        }))
    })

    it("should show a message if the search doesn't find any result",async () => {
        when(Network.get).calledWith(expect.anything())
            .mockResolvedValue({ ok: false,status: 404 })

        await processSearch(searchedWord,mockContainer)

        // Removes old elements
        expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

        // Adds new element with correct message and message style
        expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            resultTitle: 'No results were found for your search',
            type: ResultsUI.messageType.MESSAGE
        }))
    })

    describe('when clicking the result element',() => {
        const result = {
            title: resultList.results[0].title,
            path: resultList.results[0].path,
            text: `content ${searchedWord} of the page`
        };
        const expectedHtml = `content <mark>${searchedWord}</mark> of the page`;

        beforeEach(() => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(result) })
        });

        it("calls the backend to get the content of the result",async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            expect(Network.get).toHaveBeenCalledTimes(2);
            expect(Network.get).toHaveBeenNthCalledWith(2,"/" + resultList.results[0].path);
        });

        it('expands that expandDiv and formats the content of the result',async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            // The div has been expanded
            expect(ResultsUI.expand).toHaveBeenCalledWith({ expandDiv: mockedExpandDiv })

            // The div has been populated with the content of the result
            expect(ResultsUI.populateExpandWith).toHaveBeenCalledWith({
                expandDiv: mockedExpandDiv,
                htmlText: expectedHtml
            })
        });

        it("when clicking the result twice it goes back showing the down arrow image",async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();
            await simulateClickOnResultExpandDiv();

            // The element has been collapsed
            expect(ResultsUI.collapse).toHaveBeenCalledWith({ expandDiv: mockedExpandDiv })

            // The element has the down arrow(expand) image
            expect(ResultsUI.populateExpandWithImage).toHaveBeenCalledWith({ expandDiv: mockedExpandDiv })
        });

        it("when clicking the result 3 times it shows the content of the result",async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();
            await simulateClickOnResultExpandDiv();
            await simulateClickOnResultExpandDiv();

            // The div has been expanded again
            expect(ResultsUI.expand).toHaveBeenCalledTimes(2)
            expect(ResultsUI.expand).toHaveBeenNthCalledWith(2,{ expandDiv: mockedExpandDiv })

            // The div has been populated with the content of the result
            expect(ResultsUI.populateExpandWith).toHaveBeenCalledTimes(2)
            expect(ResultsUI.populateExpandWith).toHaveBeenNthCalledWith(2,{
                expandDiv: mockedExpandDiv,
                htmlText: expectedHtml
            })
        });

        it("should show an error if the network doesn't work",async () => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockRejectedValue()

            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            // Removes result
            expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

            // Adds new element with correct message and error style
            expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
                resultTitle: 'Experienced a network issue, please try again',
                type: ResultsUI.messageType.ERROR
            }))
        })

        it("should show an error if the result call has problems",async () => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: false,status: 500 })

            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            // Removes result
            expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

            // Adds new element with correct message and error style
            expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
                resultTitle: 'There has been an issue, please try again',
                type: ResultsUI.messageType.ERROR
            }))
        })

        it("should show a specific error if the result is not found",async () => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: false,status: 404 })

            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultExpandDiv();

            // Removes result
            expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

            // Adds new element with correct message and error style
            expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
                resultTitle: "There has been an error, the result couldn't be found",
                type: ResultsUI.messageType.ERROR
            }))
        })
    });

});

