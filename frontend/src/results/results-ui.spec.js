import * as EL from '../EL.js'
import {
    addElements,
    addMessage,
    clear,
    messageType,
    EXPAND_DIV_CLASS_NAME,
    MAIN_DIV_CLASS_NAME
} from './results-ui'

jest.mock('../EL.js',() => {
    return {
        div: jest.fn(),
        span: jest.fn(),
        img: jest.fn(),
        a: jest.fn(),
        button: jest.fn()
    }
});

describe('addElements',() => {

    const mockedDiv = 'mockedDiv'
    const mockedImg = 'mockedDiv'
    const mockedButton = 'mockedButton'
    const mockedAnchor = 'mockedAnchor'
    const mockContainer = { appendChild: jest.fn() }
    const resultTitle = 'test result title'
    const onclickExpandDiv = jest.fn()
    const link = '/testLink.html'

    beforeEach(() => {
        jest.clearAllMocks();

        EL.div.mockReturnValue(mockedDiv)
        EL.img.mockReturnValue(mockedImg)
        EL.button.mockReturnValue(mockedButton)
        EL.a.mockReturnValue(mockedAnchor)
    });


    it('creates an element in the container div',() => {
        addElements(mockContainer,{ resultTitle,onclickExpandDiv,link })

        expect(EL.div).toHaveBeenCalled()

        expect(mockContainer.appendChild).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalledWith(mockedDiv)
    });

    it('the result element contains 2 other elements',() => {
        addElements(mockContainer,{ resultTitle,onclickExpandDiv,link })

        expect(EL.div).toHaveBeenCalledTimes(3)
    });

    describe('the main part of the result',() => {
        it('should be clickable',() => {
            addElements(mockContainer,{ resultTitle,onclickExpandDiv,link })

            expect(EL.a).toHaveBeenCalledWith(expect.objectContaining({
                href: link
            }))
            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                className: MAIN_DIV_CLASS_NAME,
                els: [mockedAnchor]
            }))
        })
        it('contains specified title',async () => {
            const testSpan = 'test-span'
            EL.span.mockReturnValue(testSpan)

            addElements(mockContainer,{ resultTitle,onclickExpandDiv,link })

            expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
                innerText: resultTitle
            }))
            expect(EL.a).toHaveBeenCalledWith(expect.objectContaining({
                els: [testSpan]
            }))
            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                className: MAIN_DIV_CLASS_NAME,
                els: [mockedAnchor],
            }))
        })
    })
});

describe('addMessage',() => {
    const mockContainer = { appendChild: jest.fn() }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('when called with type Message it creates an element with a span with the message',() => {
        const message = 'test message'
        addMessage(mockContainer,{
            message,
            type: messageType.MESSAGE
        })
        expect(EL.div).toHaveBeenCalledTimes(1)
        expect(EL.span).toHaveBeenCalledTimes(1)
        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: message
        }))
    })

    it('when called with type Error it creates a span with the error message',() => {
        const errorMessage = 'error message'
        addMessage(mockContainer,{
            message: errorMessage,
            type: messageType.ERROR
        })
        expect(EL.div).toHaveBeenCalledTimes(1)
        expect(EL.span).toHaveBeenCalledTimes(1)
        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: errorMessage
        }))
    })
})

describe('clear',() => {
    it('removes all the children of a div',async () => {
        const div = { replaceChildren: jest.fn() }
        clear(div)

        expect(div.replaceChildren).toHaveBeenCalled()
        expect(div.replaceChildren).toHaveBeenCalledWith()
    });
})
