import { processSearch } from './search.js'
import * as Network from './network.js'
import * as ResultsUI from './results/results-ui.js'
import * as PaginateButtonUI from './paginate/paginateButton-ui.js'
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
        getResultDiv: jest.fn(),
        populateExpandWith: jest.fn(),
        messageType: actualModule.messageType
    }
})

jest.mock('./paginate/paginateButtonsContainer-ui.js',() => {
    return {
        addElements: jest.fn(),
        showContainer: jest.fn(),
        hideContainer: jest.fn(),
        clear: jest.fn()
    }
})

jest.mock('./paginate/paginateButton-ui.js',() => {
    return {
        addElements: jest.fn(),
        getAllPageButtons: jest.fn(),
        findPreviousPageButton: jest.fn(),
        findNextPageButton: jest.fn()
    }
})

const HulipaaOpt = {
    parsePage: jest.fn(),
    resultsPath: '/search'
}

describe('processSearch',() => {
    const mockContainer = {}
    // TODo to rename
    const mockedExpandDiv = '<div>test-expanded-div</div>'
    const mockedResultDiv = '<div>test-result-div</div>'
    const mockPaginateContainer = {}
    const searchedWord = "searchedword"

    const resultList = {
        results: [{
            title: "a page1",
            path: "/page1.json",
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
        ResultsUI.addElements.mockReturnValue({ element: mockedResultDiv,expandDiv: mockedExpandDiv })
        PaginateButtonUI.getAllPageButtons.mockReturnValue([])
    });

    it("calls the backend to get the result",async () => {
        await processSearch(searchedWord,mockContainer,mockPaginateContainer,HulipaaOpt)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + searchedWord + ".json");
    });

    it("normalise and removes accents from the searched word before calling the backend",async () => {
        const typedWord = "wordñij"
        const expectedWord = "wordnij"
        await processSearch(typedWord,mockContainer,mockPaginateContainer,HulipaaOpt)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + expectedWord + ".json");
    });

    it("transform the searched word to lower case before calling the backend",async () => {
        const typedWord = "CAPITALCASEword"
        const expectedWord = "capitalcaseword"
        await processSearch(typedWord,mockContainer,mockPaginateContainer,HulipaaOpt)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + expectedWord + ".json");
    });

    it('the element contains the title of the page',async () => {
        await processSearch(searchedWord,mockContainer,mockPaginateContainer,HulipaaOpt)

        expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            resultTitle: resultList.results[0].title
        }))
    });

    it('empties the old results before adding the new results',async () => {
        await processSearch(searchedWord,mockContainer,mockPaginateContainer,HulipaaOpt)

        expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)
    });

    it('the main part of the result should open the result link',async () => {
        await processSearch(searchedWord,mockContainer,mockPaginateContainer,HulipaaOpt)

        expect(ResultsUI.addElements).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            link: resultList.results[0].link
        }))
    })

    it("should show an error if the network doesn't work",async () => {
        when(Network.get).calledWith(expect.anything())
            .mockRejectedValue()

        await processSearch(searchedWord,mockContainer,mockPaginateContainer,HulipaaOpt)

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

        await processSearch(searchedWord,mockContainer,mockPaginateContainer,HulipaaOpt)

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

        await processSearch(searchedWord,mockContainer,mockPaginateContainer,HulipaaOpt)

        // Removes old elements
        expect(ResultsUI.clear).toHaveBeenCalledWith(mockContainer)

        // Adds new element with correct message and message style
        expect(ResultsUI.addMessage).toHaveBeenCalledWith(mockContainer,expect.objectContaining({
            message: 'No results were found for your search',
            type: ResultsUI.messageType.MESSAGE
        }))
    })
});
