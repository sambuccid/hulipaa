// import { processSearch } from './general.js'
// import * as Network from './network.js'
import * as EL from '../EL.js'
// import { when,resetAllWhenMocks } from 'jest-when'
// import { findCallWithObjectWithProperty } from './test-helper'
import { addElements,clear,EXPAND_DIV_CLASS_NAME } from './results-ui'


// jest.mock('./network.js',() => {
//     return { get: jest.fn(),NetworkError: class { } }
// });

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
    const onclickExpandDiv = null

    beforeEach(() => {
        // resetAllWhenMocks()
        jest.clearAllMocks();

        EL.div.mockReturnValue(mockedDiv)
        EL.img.mockReturnValue(mockedImg)
    });


    it('creates an element in the container div',() => {
        addElements(mockContainer,{ resultTitle,onclickExpandDiv })

        expect(EL.div).toHaveBeenCalled()

        expect(mockContainer.appendChild).toHaveBeenCalled()
        expect(mockContainer.appendChild).toHaveBeenCalledWith(mockedDiv)
    });

    it('the result element contains 2 other elements',() => {
        addElements(mockContainer,{ resultTitle,onclickExpandDiv })

        expect(EL.div).toHaveBeenCalledTimes(3)
    });

    it('the result element contains specified title',async () => {
        addElements(mockContainer,{ resultTitle,onclickExpandDiv })

        expect(EL.span).toHaveBeenCalledWith(expect.objectContaining({
            innerText: resultTitle
        }))
    });


    describe('the expandDiv',() => {
        it('the expandDiv has an image',() => {
            addElements(mockContainer,{ resultTitle,onclickExpandDiv })

            expect(EL.img).toHaveBeenCalledTimes(1)
            expect(EL.div).toHaveBeenCalledWith(expect.objectContaining({
                className: EXPAND_DIV_CLASS_NAME,
                els: [mockedImg]
            }))
        });

        it('the expandDiv should be clickable',async () => {
            addElements(mockContainer,{ resultTitle,onclickExpandDiv })

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
