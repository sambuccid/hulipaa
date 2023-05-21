import EL from '../EL.js'

export const EXPAND_DIV_CLASS_NAME = 'expand-div'
export const MAIN_DIV_CLASS_NAME = 'open-div'
const EXPANDED_CLASS_NAME = 'expanded'
const ERROR_COLOR = '#ff7640'
const MESSAGE_COLOR = '#ffd24d'
export const messageType = {
    ERROR: 'error',
    MESSAGE: 'message'
}
export function addElements(div,{ resultTitle,onclickExpandDiv,onclick,type }) {
    let backgroundColor = "white"
    if (type === messageType.ERROR) {
        backgroundColor = ERROR_COLOR
    } else if (type === messageType.MESSAGE) {
        backgroundColor = MESSAGE_COLOR
    }

    let resultContent
    if (type != null) {
        resultContent = [
            EL.span({
                innerText: resultTitle
            })]
    } else {
        resultContent = [
            EL.div({
                els: [
                    EL.span({
                        innerText: resultTitle
                    })],
                onclick: onclick,
                style: {
                    flex: '6 6 0px',
                    paddingBottom: '2px',
                    minHeight: '30px'
                },
                className: MAIN_DIV_CLASS_NAME
            }),
            EL.div({
                els: [
                    createImageExpandDiv()
                ],
                onclick: onclickExpandDiv,
                style: {
                    flex: '4 4 0px',
                    backgroundColor: 'lightblue',
                    paddingTop: '2px',
                    paddingBottom: '2px',
                    overflow: 'auto',
                    minHeight: '20px'
                },
                className: EXPAND_DIV_CLASS_NAME
            })
        ]
    }

    const element = EL.div({
        els: resultContent,
        style: {
            backgroundColor,
            borderRadius: "10px",
            paddingTop: '3px',
            paddingBottom: '0px',
            textAlign: "center",
            border: "gray solid 1px",
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }
    })

    div.appendChild(element)
    return { element: element }
}

export function populateExpandWithImage({ expandDiv }) {
    clear(expandDiv)
    const img = createImageExpandDiv()
    expandDiv.appendChild(img)
}

export function createImageExpandDiv() {
    return EL.img({
        innerText: "Expand",
        src: "../frontend/images/arrow_down_icon.svg",
        style: {
            width: 'auto',
            height: '100%'
        }
    })
}

export function populateExpandWith({ expandDiv,htmlText,text }) {
    clear(expandDiv)

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
    expandDiv.appendChild(span)
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