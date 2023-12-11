import EL from '../EL.js'
import arrowDownIcon from '../images/arrow_down_icon.svg'
import { clearDiv } from '../ui-helpers.js'

// TODO rename constant and value
export const EXPAND_DIV_CLASS_NAME = 'expand-div'
export const MAIN_DIV_CLASS_NAME = 'open-div'

export const messageType = {
    ERROR: 'error',
    MESSAGE: 'message'
}
export function addElements(div,{ resultTitle,link }) {
    // TODO to rename
    const expandDiv = makePopulateExpandDiv({
        content: null,
    })
    const resultContent = [
        EL.div({
            els: [
                EL.a({
                    els: [
                        EL.span({
                            innerText: resultTitle
                        }),
                    ],
                    href: link,
                    style: {
                        color: 'inherit',
                        textDecoration: 'inherit',
                        display: 'inline-block',
                        height: '100%',
                        width: '100%',
                    }
                })],
            style: {
                flex: '6 6 0px',
                minHeight: '30px'
            },
            className: MAIN_DIV_CLASS_NAME
        }),
        expandDiv
    ]

    const element = createMainResultDiv(resultContent)

    div.appendChild(element)
    //TODO to rename returning prop
    return { element: element,expandDiv: expandDiv }
}

// TODO rename prop passed in
export function getResultDiv({ expandDiv }) {
    return expandDiv.parentElement
}

export function addMessage(div,{ message,type }) {
    const { messageElements } = createMessage({ message,type })

    const element = createMainResultDiv(messageElements)

    div.appendChild(element)
    return { element: element }
}

function createMessage({ message,type }) {
    return {
        messageElements: [
            EL.span({
                innerText: message
            })
        ]
    }

}

function createMainResultDiv(content) {
    return EL.div({
        els: content,
        style: {
            paddingTop: '3px',
            paddingBottom: '0px',
            marginBottom: "15px",
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }
    })
}

// TODO rename function and prop
function makePopulateExpandDiv({ content,existingExpandDiv }) {
    // Populate existing div
    if (existingExpandDiv) {
        clear(existingExpandDiv)
        if (content) {
            existingExpandDiv.appendChild(content)
        }
        return
    }

    // Create new div
    let divContent = null
    if (content) {
        divContent = [content]
    }
    return EL.div({
        els: divContent,
        style: {
            flex: '4 4 auto',
            overflow: 'auto',
            minHeight: '20px',
            paddingLeft: '5px',
        },
        className: EXPAND_DIV_CLASS_NAME
    })
}

export function populateExpandWith({ expandDiv,htmlText }) {
    const span = EL.span({
        innerText: htmlText,
        style: {
            fontSize: '0.75rem'
        }
    })
    makePopulateExpandDiv({
        existingExpandDiv: expandDiv,
        content: span
    })
}

export function substituteWithMessage(resultDiv,message,messageType) {
    clear(resultDiv)

    const { messageElements } = createMessage({ message,type: messageType })

    for (const el of messageElements) {
        resultDiv.appendChild(el)
    }
}

export function clear(div) {
    clearDiv(div)
}
