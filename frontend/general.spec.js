import { processSearch } from './general.js'
import * as Network from './network.js'
import * as EL from './EL.js'
import * as Helpers from './helpers.js'
import { when,resetAllWhenMocks } from 'jest-when'


jest.mock('./network.js',() => {
    return { get: jest.fn() }
});

jest.mock('./EL.js',() => {
    return {
        div: jest.fn(),
        span: jest.fn()
    }
});


const mockContainer = { appendChild: jest.fn() }

function getOnclickPropertyOfResultDiv() {
    const lastCallParameters = EL.div.mock.lastCall
    const firstParameter = lastCallParameters[0]
    const onclickProperty = firstParameter.onclick
    return onclickProperty
}

describe('processSearch',() => {
    const resultList = {
        results: [{
            title: "a page1",
            path: "page1.json",
            numberOfMatches: 1
        }]
    };
    let mockedInnerSpan;
    const searchedWord = "searchedWord"

    beforeEach(() => {
        resetAllWhenMocks()
        jest.clearAllMocks();
        mockedInnerSpan = {
            innerText: null,
            id: Math.random()
        }
        when(Network.get).calledWith(`/search/${searchedWord}.json`)
            .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(resultList) })
        const mockedDiv = {
            getElementsByTagName: jest.fn().mockReturnValue([mockedInnerSpan])
        }
        EL.div.mockReturnValue(mockedDiv)
        EL.span.mockReturnValue(mockedInnerSpan)
    });

    it("calls the backend to get the result",async () => {
        await processSearch(searchedWord,mockContainer)

        expect(Network.get).toHaveBeenCalled();
        expect(Network.get).toHaveBeenCalledWith("/search/" + searchedWord + ".json");
    });

    it('creates an element with the results returned from the backend',async () => {
        await processSearch(searchedWord,mockContainer)

        expect(EL.div).toHaveBeenCalled()

        expect(mockContainer.appendChild).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalledWith(expect.anything())
    });

    it('the element contains the title of the page',async () => {
        await processSearch(searchedWord,mockContainer)

        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: resultList.results[0].title
        }))
    });

    it('the element should be clickable',async () => {
        await processSearch(searchedWord,mockContainer)

        expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
            onclick: expect.anything()
        }))
    });

    describe('when clicking the result element',() => {
        const result = {
            title: resultList.results[0].title,
            path: resultList.results[0].path,
            text: "content of the page"
        };

        beforeEach(() => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(result) })
        });


        it("calls the backend to get the content of the result",async () => {
            await processSearch(searchedWord,mockContainer)

            const resultOnClick = getOnclickPropertyOfResultDiv();

            await resultOnClick();

            expect(Network.get).toHaveBeenCalledTimes(2);
            expect(Network.get).toHaveBeenNthCalledWith(2,"/" + resultList.results[0].path);
        });

        //TODO add more test scenarios
        it.each([
            ["short","short content of result","short content of result"]
        ])('shows the right content of the result when input is %s',
            async (_desc,resultText,expectedResult) => {
                const mockedResult = { ...result,text: resultText }

                when(Network.get).calledWith(`/${resultList.results[0].path}`)
                    .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(mockedResult) })

                await processSearch(searchedWord,mockContainer)

                const resultOnClick = getOnclickPropertyOfResultDiv();

                await resultOnClick();

                expect(mockedInnerSpan.innerText).toBe(expectedResult)
            });
    });
});

