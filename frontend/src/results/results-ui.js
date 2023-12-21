import EL from '../EL.js'
import arrowDownIcon from '../images/arrow_down_icon.svg'
import { clearDiv } from '../ui-helpers.js'
import CSS from './results.css'


export const RESULT_DIV_CLASS_NAME = 'result-div'
export const RESULT_CONTENT_DIV_CLASS_NAME = 'result-content-div'
export const MAIN_DIV_CLASS_NAME = 'open-div'

export const messageType = {
    ERROR: 'error',
    MESSAGE: 'message'
}
export function addElements(div,{ resultTitle,link }) {
    const resultContentDiv = populateResultContentDiv({
        content: null,
    })
    const resultElements = [
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
                minHeight: '30px',
                textTransform: 'uppercase',
                letterSpacing: '0.05rem',
            },
            className: MAIN_DIV_CLASS_NAME
        }),
        resultContentDiv
    ]

    const element = createMainResultDiv(resultElements)

    div.appendChild(element)
    return { element: element,resultContentDiv: resultContentDiv }
}

export function getResultDiv({ resultContentDiv }) {
    return resultContentDiv.parentElement
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
                innerText: message,
                style: {
                    fontSize: 'small'
                }
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
            marginBottom: "17px",
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        },
        className: RESULT_DIV_CLASS_NAME
    })
}

function populateResultContentDiv({ content,existingResultContentDiv }) {
    // Populate existing div
    if (existingResultContentDiv) {
        clear(existingResultContentDiv)
        if (content) {
            existingResultContentDiv.appendChild(content)
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
        className: RESULT_CONTENT_DIV_CLASS_NAME
    })
}

export function setResultContent({ resultContentDiv,htmlText }) {
    const span = EL.span({
        innerText: htmlText,
        style: {
            fontSize: '0.75rem'
        }
    })
    populateResultContentDiv({
        existingResultContentDiv: resultContentDiv,
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
