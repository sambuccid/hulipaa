import EL from '../EL.js'

const EXPANDED_DATA_ATTRIBUTE = 'data-expanded';

export function addElements(div,{ resultTitle,onclick }) {
    const element = EL.div({
        els: [
            EL.span({
                innerText: resultTitle
            })
        ],
        onclick: onclick,
        style: {
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            border: "gray solid 1px"
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