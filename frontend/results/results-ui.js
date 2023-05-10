import EL from '../EL.js'

// const EXPANDED_DATA_ATTRIBUTE = 'data-expanded'
// const EXPAND_DIV_TEST_ID = 'expand-div'
export const EXPAND_DIV_CLASS_NAME = 'expand-div'
const EXPANDED_CLASS_NAME = 'expanded'
const ERROR_COLOR = '#ff7640'
const MESSAGE_COLOR = '#ffd24d'
export const messageType = {
    ERROR: 'error',
    MESSAGE: 'message'
}
export function addElements(div,{ resultTitle,onclickExpandDiv,type }) {
    let backgroundColor = "white"
    if (type === messageType.ERROR) {
        backgroundColor = ERROR_COLOR
    } else if (type === messageType.MESSAGE) {
        backgroundColor = MESSAGE_COLOR
    }
    const element = EL.div({
        els: [
            EL.div({
                els: [
                    EL.span({
                        innerText: resultTitle
                    })],
                style: {
                    flex: '6 6 0px',
                    paddingBottom: '2px',
                    minHeight: '30px'
                }
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
                className: EXPAND_DIV_CLASS_NAME,
                // dataTestId: EXPAND_DIV_TEST_ID
            })
        ],

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