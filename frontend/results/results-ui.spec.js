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
    }
});

describe('addElements',() => {

    const mockedDiv = 'mockedDiv'
    const mockedImg = 'mockedDiv'
    const mockContainer = { appendChild: jest.fn() }
    const resultTitle = 'test result title'
    const onclickExpandDiv = () => { }
    const onclick = () => { }

    beforeEach(() => {
        jest.clearAllMocks();

        EL.div.mockReturnValue(mockedDiv)
        EL.img.mockReturnValue(mockedImg)
    });


    it('creates an element in the container div',() => {
        addElements(mockContainer,{ resultTitle,onclickExpandDiv,onclick })

        expect(EL.div).toHaveBeenCalled()

        expect(mockContainer.appendChild).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalledWith(mockedDiv)
    });

    it('the result element contains 2 other elements',() => {
        addElements(mockContainer,{ resultTitle,onclickExpandDiv,onclick })

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
        it('contains specified title',async () => {
            const testSpan = 'test-span'
            EL.span.mockReturnValue(testSpan)

            addElements(mockContainer,{ resultTitle,onclickExpandDiv,onclick })

            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                className: MAIN_DIV_CLASS_NAME,
                els: [testSpan],
            }))
            expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
                innerText: resultTitle
            }))
        })
        it('should be clickable',() => {
            addElements(mockContainer,{ resultTitle,onclickExpandDiv,onclick })

            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                className: MAIN_DIV_CLASS_NAME,
                onclick: onclick
            }))
        })
    })


    describe('the expandDiv',() => {
        it('has an image',() => {
            addElements(mockContainer,{ resultTitle,onclickExpandDiv,onclick })

            expect(EL.img).toHaveBeenCalledTimes(1)
            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                className: EXPAND_DIV_CLASS_NAME,
                els: [mockedImg]
            }))
        });

        it('should be clickable',async () => {
            addElements(mockContainer,{ resultTitle,onclickExpandDiv,onclick })

            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                className: EXPAND_DIV_CLASS_NAME,
                onclick: onclickExpandDiv
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
