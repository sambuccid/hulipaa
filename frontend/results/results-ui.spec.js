import * as EL from '../EL.js'
import {
    addElements,
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

    it('when the element is loaded with the message style it should contain just a span with the message',() => {
        const message = 'test message'
        addElements(mockContainer,{
            resultTitle: message,
            type: messageType.MESSAGE
        })
        expect(EL.div).toHaveBeenCalledTimes(1)
        expect(EL.span).toHaveBeenCalledTimes(1)
        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: message
        }))
    })

    it('when the element is loaded with the error style it should contain just a span with the error message',() => {
        const errorMessage = 'error message'
        addElements(mockContainer,{
            resultTitle: errorMessage,
            type: messageType.ERROR
        })
        expect(EL.div).toHaveBeenCalledTimes(1)
        expect(EL.span).toHaveBeenCalledTimes(1)
        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: errorMessage
        }))
    })

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


    describe('the expandDiv',() => {
        it('should be clickable',() => {
            addElements(mockContainer,{ resultTitle,onclickExpandDiv,link })

            expect(EL.button).toHaveBeenCalledTimes(1)
            expect(EL.button).toHaveBeenCalledWith(expect.objectContaining({
                onclick: expect.anything()
            }))
            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                className: EXPAND_DIV_CLASS_NAME,
                els: [mockedButton]
            }))
        });
        it('has an image',() => {
            addElements(mockContainer,{ resultTitle,onclickExpandDiv,link })

            expect(EL.img).toHaveBeenCalledTimes(1)
            expect(EL.button).toHaveBeenCalledWith(expect.objectContaining({
                els: [mockedImg]
            }))
            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                className: EXPAND_DIV_CLASS_NAME,
                els: [mockedButton]
            }))
        });

    })

});

describe('clear',() => {
    it('removes all the children of a div',async () => {
        const div = { replaceChildren: jest.fn() }
        clear(div)

        expect(div.replaceChildren).toHaveBeenCalled()
        expect(div.replaceChildren).toHaveBeenCalledWith()
    });
})

// TODO to test populateExpandWithImage
// TODO to test populateExpandWith