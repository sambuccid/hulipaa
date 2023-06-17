import { processSearch } from './general.js'
import * as Network from './network.js'
import * as ResultsUI from './results/results-ui.js'
import { when,resetAllWhenMocks } from 'jest-when'

jest.mock('./network.js',() => {
    return { get: jest.fn(),NetworkError: class { } }
});

jest.mock('./results/results-ui.js',() => {
    const actualModule = jest.requireActual('./results/results-ui.js');
    return {
        addElements: jest.fn(),
        addMessage: jest.fn(),
        substituteWithMessage: jest.fn(),
        clear: jest.fn(),
        isExpanded: jest.fn(),
        expand: jest.fn(),
        collapse: jest.fn(),
        getResultDiv: jest.fn(),
        populateExpandWith: jest.fn(),
        populateExpandWithImage: jest.fn(),
        messageType: actualModule.messageType
    }
})

function getOnclickPropertyOfExpandResult() {
    const correctCallParameters = ResultsUI.addElements.mock.lastCall
    const secondParameter = correctCallParameters[1]
    return secondParameter.onclickExpandDiv
}

const SWSOptions = {
    parsePage: jest.fn()
}

describe('processSearch',() => {
    const mockContainer = {}
    const mockedExpandDiv = '<div>test-expanded-div</div>'
    const mockedResultDiv = '<div>test-result-div</div>'
    const searchedWord = "searchedword"

    const resultList = {
        results: [{
            title: "a page1",
            path: "page1.json",
            link: 'aa.html',
            numberOfMatches: 1
        }]
    };

    beforeEach(() => {
        resetAllWhenMocks()
        jest.clearAllMocks();

        when(Network.get).calledWith(`/search/${searchedWord}.json`)
            .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(resultList) })

        ResultsUI.getResultDiv.mockReturnValue(mockedResultDiv)
        ResultsUI.isExpanded.mockReturnValue(false)
    });

    it("calls the backend to get the result",async () => {
        await processSearch(searchedWord,mockContainer,SWSOptions)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + searchedWord + ".json");
    });

    it("normalise and removes accents from the searched word before calling the backend",async () => {
        const typedWord = "wordñij"
        const expectedWord = "wordnij"
        await processSearch(typedWord,mockContainer,SWSOptions)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + expectedWord + ".json");
    });

    it("transform the searched word to lower case before calling the backend",async () => {
        const typedWord = "CAPITALCASEword"
        const expectedWord = "capitalcaseword"
        await processSearch(typedWord,mockContainer,SWSOptions)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + expectedWord + ".json");
    });

    it('the element contains the title of the page',async () => {
        await processSearch(searchedWord,mockContainer,SWSOptions)

        expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            resultTitle: resultList.results[0].title
        }))
    });

    it('empties the old results before adding the new results',async () => {
        await processSearch(searchedWord,mockContainer,SWSOptions)

        expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)
    });

    it('there should be the expand element that should be clickable',async () => {
        await processSearch(searchedWord,mockContainer,SWSOptions)

        expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            onclickExpandDiv: expect.anything()
        }))
    });

    it('the main part of the result should open the result link',async () => {
        await processSearch(searchedWord,mockContainer,SWSOptions)

        expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            link: resultList.results[0].link
        }))
    })

    it("should show an error if the network doesn't work",async () => {
        when(Network.get).calledWith(expect.anything())
            .mockRejectedValue()

        await processSearch(searchedWord,mockContainer,SWSOptions)

        // Removes old elements
        expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

        // Adds new element with correct message and error style
        expect(ResultsUI.addMessage).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            message: 'Experienced a network issue, please try again',
            type: ResultsUI.messageType.ERROR
        }))
    })

    it("should show an error if the search call has problems",async () => {
        when(Network.get).calledWith(expect.anything())
            .mockResolvedValue({ ok: false,status: 500 })

        await processSearch(searchedWord,mockContainer,SWSOptions)

        // Removes old elements
        expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

        // Adds new element with correct message and error style
        expect(ResultsUI.addMessage).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            message: 'There has been an issue, please try again',
            type: ResultsUI.messageType.ERROR
        }))
    })

    it("should show a message if the search doesn't find any result",async () => {
        when(Network.get).calledWith(expect.anything())
            .mockResolvedValue({ ok: false,status: 404 })

        await processSearch(searchedWord,mockContainer,SWSOptions)

        // Removes old elements
        expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

        // Adds new element with correct message and message style
        expect(ResultsUI.addMessage).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            message: 'No results were found for your search',
            type: ResultsUI.messageType.MESSAGE
        }))
    })

    describe('when clicking the expandDiv of the result element',() => {
        const result = 'some content of the result'
        const parsedResult = {
            title: resultList.results[0].title,
            path: resultList.results[0].path,
            text: `content ${searchedWord} of page`
        };
        const expectedHtml = `content <mark>${searchedWord}</mark> of page`;

        async function simulateClickOnResultExpandDiv() {
            const expandDivClickFunc = getOnclickPropertyOfExpandResult();
            await expandDivClickFunc(mockedExpandDiv);
            ResultsUI.isExpanded.mockReturnValue(!ResultsUI.isExpanded())
        }

        beforeEach(() => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: true,text: jest.fn().mockResolvedValue(result) })
            SWSOptions.parsePage.mockReturnValue(parsedResult)
        });

        it("calls the backend to get the content of the result",async () => {
            await processSearch(searchedWord,mockContainer,SWSOptions)

            await simulateClickOnResultExpandDiv();

            expect(Network.get).toHaveBeenCalledTimes(2);
            expect(Network.get).toHaveBeenNthCalledWith(2,"/" + resultList.results[0].path);
        });

        it('expands the expandDiv and formats the content of the result',async () => {
            await processSearch(searchedWord,mockContainer,SWSOptions)

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
            await processSearch(searchedWord,mockContainer,SWSOptions)

            await simulateClickOnResultExpandDiv();
            await simulateClickOnResultExpandDiv();

            // The element has been collapsed
            expect(ResultsUI.collapse).toHaveBeenCalledWith({ expandDiv: mockedExpandDiv })

            // The element has the down arrow(expand) image
            expect(ResultsUI.populateExpandWithImage).toHaveBeenCalledWith({ expandDiv: mockedExpandDiv })
        });

        it("when clicking the result 3 times it shows the content of the result",async () => {
            await processSearch(searchedWord,mockContainer,SWSOptions)

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

            await processSearch(searchedWord,mockContainer,SWSOptions)

            await simulateClickOnResultExpandDiv();

            // Removes result
            expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

            // Adds new element with correct message and error style
            expect(ResultsUI.addMessage).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
                message: 'Experienced a network issue, please try again',
                type: ResultsUI.messageType.ERROR
            }))
        })

        it("should show an error if the result call has problems",async () => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: false,status: 500 })

            await processSearch(searchedWord,mockContainer,SWSOptions)

            await simulateClickOnResultExpandDiv();

            // Removes result
            expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

            // Adds new element with correct message and error style
            expect(ResultsUI.addMessage).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
                message: 'There has been an issue, please try again',
                type: ResultsUI.messageType.ERROR
            }))
        })

        it("should show a specific error if the result is not found",async () => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: false,status: 404 })

            await processSearch(searchedWord,mockContainer,SWSOptions)

            await simulateClickOnResultExpandDiv();

            // Removes result
            expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

            // Adds new element with correct message and error style
            expect(ResultsUI.substituteWithMessage).toHaveBeenCalledWith(
                mockedResultDiv,
                `Error: The result for the ${resultList.results[0].title} page couldn't be found`,
                ResultsUI.messageType.ERROR
            )
        })
    })
});

