import EL from '../EL.js'

const EXPANDED_DATA_ATTRIBUTE = 'data-expanded'
const ERROR_COLOR = '#ff7640'
const MESSAGE_COLOR = '#ffd24d'
export const messageType = {
    ERROR: 'error',
    MESSAGE: 'message'
}
export function addElements(div,{ resultTitle,onclick,type }) {
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
                    EL.img({
                        innerText: "Expand",
                        src: "../frontend/images/arrow_down_icon.svg",
                        style: {
                            width: 'auto',
                            height: '100%'
                        }
                    })
                ],
                style: {
                    flex: '4 4 0px',
                    backgroundColor: 'lightblue',
                    paddingTop: '2px',
                    paddingBottom: '2px',
                    overflow: 'auto',
                    minHeight: '20px'
                }
            })
        ],
        onclick: onclick,

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


export function populateWith({ resultDiv,htmlText,text }) {
    let span = resultDiv.getElementsByTagName('span');
    span = span[0];
    if (htmlText) {
        span.innerHTML = htmlText;
    } else if (text) {
        span.innerText = text;
    }
}

export function clear(div) {
    div.replaceChildren()
}

export function isExpanded({ resultDiv }) {
    if (resultDiv.getAttribute(EXPANDED_DATA_ATTRIBUTE))
        return true
    else
        return false
}

export function expand({ resultDiv }) {
    resultDiv.setAttribute(EXPANDED_DATA_ATTRIBUTE,"expanded")
}

export function collapse({ resultDiv }) {
    resultDiv.removeAttribute(EXPANDED_DATA_ATTRIBUTE)
}