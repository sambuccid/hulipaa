import { processSearch } from './general.js'
import * as Network from './network.js'
import * as EL from './EL.js'
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

const mockContainer = { appendChild: jest.fn(),replaceChildren: jest.fn() }

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
    let mockedDiv;
    const searchedWord = "searchedWord"

    beforeEach(() => {
        resetAllWhenMocks()
        jest.clearAllMocks();
        mockedInnerSpan = {
            innerHTML: null,
            innerText: null,
            id: Math.random()
        }
        when(Network.get).calledWith(`/search/${searchedWord}.json`)
            .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(resultList) })
        mockedDiv = {
            getElementsByTagName: jest.fn().mockReturnValue([mockedInnerSpan])
        }
        simulateHtmlAttributes(mockedDiv)
        EL.div.mockReturnValue(mockedDiv)
        EL.span.mockReturnValue(mockedInnerSpan)
    });

    async function simulateClickOnResultDiv() {
        const resultOnClick = getOnclickPropertyOfResultDiv();
        const event = { currentTarget: mockedDiv }
        await resultOnClick(event);
    }

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

    it('empties the old results before adding the new results',async () => {
        await processSearch(searchedWord,mockContainer)

        expect(mockContainer.replaceChildren).toHaveBeenCalled()
        expect(mockContainer.replaceChildren).toHaveBeenCalledWith()
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
            text: `content ${searchedWord} of the page`
        };

        beforeEach(() => {
            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(result) })
        });


        it("calls the backend to get the content of the result",async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultDiv();

            expect(Network.get).toHaveBeenCalledTimes(2);
            expect(Network.get).toHaveBeenNthCalledWith(2,"/" + resultList.results[0].path);
        });

        it.each([
            ["is short doesn't cut anything and doesn't add '...'",`short content ${searchedWord} of result`,`short content <mark>${searchedWord}</mark> of result`],
            ["is long it cuts it to 20 chars adding '...' where it cuts",
                `a long content of the page, the content conains the ${searchedWord},is very long and it will need to be cut`,
                `...content conains the <mark>${searchedWord}</mark>,is very long and it...`],
            ["contains a long word before the searched word that will need to be cut, it doesn't cut the word but it excludes it",
                `a long_long_word and other words ${searchedWord} a`,
                `... and other words <mark>${searchedWord}</mark> a`],
            ["contains a long word after the searched word that will need to be cut, it doesn't cut the word but it excludes it",
                `a ${searchedWord} with words and long_long_word a`,
                `a <mark>${searchedWord}</mark> with words and ...`],
            ["contains multiple lines, shows just the one with teh searched word",
                `there is a line 1\nand ${searchedWord} line\nand line 3`,
                `and <mark>${searchedWord}</mark> line`],
            ["contains the searched word it highlights the searched word, even across multiple lines",
                `there is a line 1\nand ${searchedWord} line\nand line 3 ${searchedWord} a`,
                `and <mark>${searchedWord}</mark> line<br>and line 3 <mark>${searchedWord}</mark> a`]
        ])('shows the right content of the result, when input %s',
            async (_desc,resultText,expectedResult) => {
                const mockedResult = { ...result,text: resultText }

                when(Network.get).calledWith(`/${resultList.results[0].path}`)
                    .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(mockedResult) })

                await processSearch(searchedWord,mockContainer)

                await simulateClickOnResultDiv();

                expect(mockedInnerSpan.innerHTML).toBe(expectedResult)
            });


        it('shows one line for each line in the content that has the searched word',async () => {
            const resultText = `The content has one result here ${searchedWord}\n` +
                `and in the new line there is another result ${searchedWord}\n` +
                `third line\n` +
                `\n` +
                `${searchedWord} last line with result`

            const expectedResult = `...has one result here <mark>${searchedWord}</mark><br>` +
                `... is another result <mark>${searchedWord}</mark><br>` +
                `<mark>${searchedWord}</mark> last line with ...`

            const mockedResult = { ...result,text: resultText }

            when(Network.get).calledWith(`/${resultList.results[0].path}`)
                .mockResolvedValue({ ok: true,json: jest.fn().mockResolvedValue(mockedResult) })

            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultDiv();

            expect(mockedInnerSpan.innerHTML).toBe(expectedResult)
        });

        it("when clicking the result twice it goes back showing the title of the result",async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultDiv();
            await simulateClickOnResultDiv();

            expect(mockedInnerSpan.innerText).toBe(resultList.results[0].title)
        });


        it("when clicking the result 3 times it shows the content of the result",async () => {
            await processSearch(searchedWord,mockContainer)

            await simulateClickOnResultDiv();
            await simulateClickOnResultDiv();
            await simulateClickOnResultDiv();

            const expectedHtml = `content <mark>${searchedWord}</mark> of the page`;
            expect(mockedInnerSpan.innerHTML).toBe(expectedHtml)
        });
    });

});

