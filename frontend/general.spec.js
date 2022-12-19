import { processSearch } from './general.js'
import * as Network from './network.js'
import * as EL from './EL.js'


jest.mock('./network.js',() => {
    return { get: jest.fn() }
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
});
