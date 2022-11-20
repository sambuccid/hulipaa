import EL from '../EL.js'

export function addElements(div) {
    const element = EL.div()
    div.appendChild(element)
    return element
}