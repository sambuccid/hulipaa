import EL from '../EL.js'

export function addElements(div,{ resultTitle }) {
    const element = EL.div({
        els: [
            EL.span({
                innerText: resultTitle
            })
        ],
        style: {
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            border: "gray solid 1px"
        }
    })
    div.appendChild(element)
    return element
}