import EL from '../EL.js'

export function addElements(containerDiv,{ paginationNumber }) {
    const element = EL.button({
        textContent: paginationNumber + 1
    })

    containerDiv.appendChild(element)
    return { element: element }
}
