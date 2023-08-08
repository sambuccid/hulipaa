import EL from '../EL.js'
// import arrowDownIcon from '../images/arrow_down_icon.svg'
//TODO Temporary
const arrowDownIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='6 6 12 12'%3E%3Ctitle%3EArtboard-67%3C/title%3E%3Cg id='Down'%3E%3Cpath d='M12,15a1,1,0,0,1-.707-.293l-4-4A1,1,0,1,1,8.707,9.293L12,12.586l3.293-3.293a1,1,0,0,1,1.414,1.414l-4,4A1,1,0,0,1,12,15Z' style='fill:%231c1b1e'/%3E%3C/g%3E%3C/svg%3E"
import { clearDiv } from '../ui-helpers.js'

export const EXPAND_DIV_CLASS_NAME = 'expand-div'
export const MAIN_DIV_CLASS_NAME = 'open-div'
// TODO to remove
const EXPANDED_CLASS_NAME = 'expanded'
const ERROR_COLOR = '#ff7640'
const MESSAGE_COLOR = '#ffd24d'
export const messageType = {
    ERROR: 'error',
    MESSAGE: 'message'
}
export function addElements(div,{ resultTitle,onclickExpandDiv,link }) {
    const expandDiv = makePopulateExpandDiv({
        content: null,
        onclick: onclickExpandDiv
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
    return { element: element,expandDiv: expandDiv }
}

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

function makePopulateExpandDiv({ content,existingExpandDiv,onclick }) {
    // Populate existing div
    if (existingExpandDiv) {
        const button = existingExpandDiv.firstChild
        clear(button)
        if (content) {
            button.appendChild(content)
        }
        return
    }
    // Create new div
    let onClickButton = null
    if (onclick != null) {
        onClickButton = async (event) => {
            await onclick(event.currentTarget.parentElement)
        }
    }
    let buttonContent = null
    if (content) {
        buttonContent = [content]
    }
    return EL.div({
        els: [
            //TODO remove button, as now it's not possible to click it
            EL.button({
                els: buttonContent,
                onclick: onClickButton,
                style: {
                    // TODO this can probably be removed when the button is gone
                    textAlign: 'left',
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'inherit',
                    padding: '0',
                    paddingLeft: '5px',
                    margin: '0',
                    font: 'inherit',
                }
            })
        ],
        style: {
            flex: '4 4 0px',
            overflow: 'auto',
            minHeight: '20px',
        },
        className: EXPAND_DIV_CLASS_NAME
    })
}

function createImageExpandDiv() {
    return EL.img({
        innerText: "Expand",
        src: arrowDownIcon,
        style: {
            width: 'auto',
            height: '100%'
        }
    })
}

//TODO delete this
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

    const { messageElements } = createMessage({ message,type: messageType })

    for (const el of messageElements) {
        resultDiv.appendChild(el)
    }
}

export function clear(div) {
    clearDiv(div)
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