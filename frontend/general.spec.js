import { processSearch,onResultClick } from './general.js'
import * as Network from './network.js'
import * as EL from './EL.js'
import * as Helpers from './EL.js'


jest.mock('./network.js',() => {
    return { get: jest.fn() }
});
cons mockedBoundFunction = jest.fn();
jest.mock('./helpers.js',() => {
    return { bindFunction: jest.fn().mockReturnValue(mockedBoundFunction) }
});

jest.mock('./EL.js',() => {
    return {
        div: jest.fn().mockReturnValue({}),
        span: jest.fn().mockReturnValue({})
    }
});


const mockContainer = { appendChild: jest.fn() }

beforeEach(() => {
    jest.clearAllMocks();
});

describe('processSearch',() => {
    const result = {
        results: [{
            title: "a page1",
            path: "page1.json",
            numberOfMatches: 1
        }]
    };
    Network.get.mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(result) })


    it("calls the backend to get the result",async () => {
        const word = "searchedWord"
        await processSearch(word,mockContainer)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + word + ".json");
    });

    it('creates an element with the results returned from the backend',async () => {
        const word = "searchedWord"

        await processSearch(word,mockContainer)

        expect(EL.div).toHaveBeenCalled()

        expect(mockContainer.appendChild).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalledWith(expect.anything())

    });

    it('the element contains the title of the page',async () => {
        const word = "searchedWord"

        await processSearch(word,mockContainer)

        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: result.results[0].title
        }))
    });

    it('the element should be clickable',async () => {
        const word = "searchedWord"

        await processSearch(word,mockContainer)

        expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
            onclick: mockedBoundFunction
        }))
        expect(General.bindFunction).toHaveBeenCalled();
        expect(General.bindFunction).toHaveBeenCalledWith(onResultClick, result.results[0].path);
        //TODO maybe check that the function has been binded with the correct path to load
        //  to do that we could have a bind helper method that could be in a different file
        //  and that we could then mock out in here and would allow us to have better readability over what the code is doing

    });
});

describe('onResultClick',() => {
    it("calls the backend to get the content of the result",async () => {
        //TODO when called calls the backend to load the content of a specific result

        // const word = "searchedWord"
        // await processSearch(word,mockContainer)

        // expect(Network.get).toHaveBeenCalled();
        // expect(Network.get).toHaveBeenCalledWith("/search/" + word + ".json");
    });

    it('TODO creates an element...',async () => {
        //TODO should call El.div or EL.span with something that contains the searched word

        // const word = "searchedWord"

        // await processSearch(word,mockContainer)

        // expect(EL.div).toHaveBeenCalled()

        // expect(mockContainer.appendChild).toHaveBeenCalled()
        // expect(mockContainer.appendChild).toHaveBeenCalledWith(expect.anything())
    });

    it('TODO the element contains...',async () => {
        //TODO should call El.div or EL.span with something that contains the searched word

        // const word = "searchedWord"

        // await processSearch(word,mockContainer)

        // expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
        //     innerText: result.results[0].title
        // }))
    });
});

