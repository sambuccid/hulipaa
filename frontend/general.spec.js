import { processSearch } from './general.js'
import * as Service from './service'

jest.mock('./service',() => {
    return { search: jest.fn(),aaa: "2" }
});

const mockContainer = {}

describe('processSearch',() => {
    it('creates an element with the results returned ',() => {
        // When
        processSearch("search",mockContainer)

        // Then
        //TODO decide if to mock this or to mock deeper
        expect(Service.search).toHaveBeenCalled()
    });
});
