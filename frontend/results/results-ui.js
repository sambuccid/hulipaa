import EL from '../EL.js'
import { CDN_URL } from '../config.js'

export const EXPAND_DIV_CLASS_NAME = 'expand-div'
export const MAIN_DIV_CLASS_NAME = 'open-div'
const EXPANDED_CLASS_NAME = 'expanded'
const ERROR_COLOR = '#ff7640'
const MESSAGE_COLOR = '#ffd24d'
export const messageType = {
    ERROR: 'error',
    MESSAGE: 'message'
}
export function addElements(div,{ resultTitle,onclickExpandDiv,link }) {
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
                paddingBottom: '2px',
                minHeight: '30px'
            },
            className: MAIN_DIV_CLASS_NAME
        }),
        makePopulateExpandDiv({
            content: createImageExpandDiv(),
            onclick: onclickExpandDiv
        })
    ]

    const backgroundColor = "white"
    const element = createMainResultDiv(resultContent,backgroundColor)

    div.appendChild(element)
    return { element: element }
}

export function getResultDiv({ expandDiv }) {
    return expandDiv.parentElement
}

export function addMessage(div,{ message,type }) {
    const { messageElements,color } = createMessage({ message,type })

    const element = createMainResultDiv(messageElements,color)

    div.appendChild(element)
    return { element: element }
}

function createMessage({ message,type }) {
    let color = "white"
    if (type === messageType.ERROR) {
        color = ERROR_COLOR
    } else if (type === messageType.MESSAGE) {
        color = MESSAGE_COLOR
    }

    return {
        messageElements: [
            EL.span({
                innerText: message
            })
        ],
        color
    }

}

function createMainResultDiv(content,backgroundColor) {
    return EL.div({
        els: content,
        style: {
            backgroundColor,
            borderRadius: "10px",
            paddingTop: '3px',
            paddingBottom: '0px',
            textAlign: "center",
            border: "gray solid 1px",
            marginBottom: "15px",
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }
    })
}

function makePopulateExpandDiv({ content,existingExpandDiv,onclick }) {
    // Populate existing div
    if (existingExpandDiv) {
        const button = existingExpandDiv.firstChild
        clear(button)
        button.appendChild(content)
        return
    }
    // Create new div
    return EL.div({
        els: [
            EL.button({
                els: [
                    content
                ],
                onclick: async (event) => {
                    await onclick(event.currentTarget.parentElement)
                },
                style: {
                    cursor: 'pointer',
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'inherit',
                    padding: '0',
                    margin: '0',
                    font: 'inherit',
                }
            })
        ],
        style: {
            flex: '4 4 0px',
            backgroundColor: 'lightblue',
            paddingTop: '2px',
            paddingBottom: '2px',
            overflow: 'auto',
            minHeight: '20px',
        },
        className: EXPAND_DIV_CLASS_NAME
    })
}

function createImageExpandDiv() {
    return EL.img({
        innerText: "Expand",
        src: `${CDN_URL}/images/arrow_down_icon.svg`,
        style: {
            width: 'auto',
            height: '100%'
        }
    })
}

export function populateExpandWithImage({ expandDiv }) {
    const img = createImageExpandDiv()
    makePopulateExpandDiv({
        existingExpandDiv: expandDiv,
        content: img
    })
}

export function populateExpandWith({ expandDiv,htmlText,text }) {
    let span
    if (htmlText) {
        span = EL.span({
            innerHTML: htmlText
        })
    } else if (text) {
        span = EL.span({
            innerText: test
        })
    }
    makePopulateExpandDiv({
        existingExpandDiv: expandDiv,
        content: span
    })
}

export function substituteWithMessage(resultDiv,message,messageType) {
    clear(resultDiv)

    const { messageElements,color } = createMessage({ message,type: messageType })

    for (const el of messageElements) {
        resultDiv.appendChild(el)
    }
    resultDiv.style.backgroundColor = color
}

export function clear(div) {
    div.replaceChildren()
}

export function isExpanded({ expandDiv }) {
    if (expandDiv.classList.contains(EXPANDED_CLASS_NAME))
        return true
    else
        return false
}

export function expand({ expandDiv }) {
    expandDiv.classList.add(EXPANDED_CLASS_NAME)
    expandDiv.style.flexBasis = 'auto'
}

export function collapse({ expandDiv }) {
    expandDiv.classList.remove(EXPANDED_CLASS_NAME)
    expandDiv.style.flexBasis = '0px'
}