import { processSearch } from './general.js'
import * as Network from './network.js'
import * as EL from './EL.js'
import * as Helpers from './helpers.js'


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
    const mockedInnerSpan = {}

    beforeEach(() => {
        jest.clearAllMocks();
        Network.get.mockResolvedValueOnce({ ok: true,json: jest.fn().mockResolvedValue(resultList) })
        const mockedDiv = {
            getElementsByTagName: jest.fn().mockReturnValue([mockedInnerSpan])
        }
        EL.div.mockReturnValue(mockedDiv)
        EL.span.mockReturnValue(mockedInnerSpan)
    });

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
            innerText: resultList.results[0].title
        }))
    });

    it('the element should be clickable',async () => {
        const word = "searchedWord"

        await processSearch(word,mockContainer)

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
            Network.get.mockResolvedValueOnce({ ok: true,json: jest.fn().mockResolvedValue(result) })
        });


        it("calls the backend to get the content of the result",async () => {
            const word = "searchedWord"

            await processSearch(word,mockContainer)

            const resultOnClick = getOnclickPropertyOfResultDiv();

            await resultOnClick();

            expect(Network.get).toHaveBeenCalledTimes(2);
            expect(Network.get).toHaveBeenNthCalledWith(2,"/" + resultList.results[0].path);
        });

        it('TODO creates an element...',async () => {
            const innerTextSetterSpy = jest.spyOn(mockedInnerSpan, 'innerText', 'set')
            //nTODO should call El.div or EL.span with something that contains the searched word
            //TODO should also call something that removed the old result
            // const resultPath = 'testpath.json''
                        const word = "searchedWord"

            await processSearch(word,mockContainer)

            const resultOnClick = getOnclickPropertyOfResultDiv();

            await resultOnClick();
            
            expect(innerTextSetterSpy).toHaveBeenCalledTimes(1)
            expect(innerTextSetterSpy).toHaveBeenCalledwith(result.text)


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
});
