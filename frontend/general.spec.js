import { processSearch } from './general.js'
// import * as Service from './service'
import * as Network from './network.js'

jest.mock('./network.js',() => {
    return { get: jest.fn() }
});

const mockContainer = {}

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


    it("calls the backend to get the result",() => {
        const word = "searchedWord"
        processSearch(word,mockContainer)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("search/" + word);
    });
    it('creates an element with the results returned from the backend',() => {
        const word = "searchedWord"
        processSearch(word,mockContainer)

        //TODO assert mockContainer to have added element
    });
});
