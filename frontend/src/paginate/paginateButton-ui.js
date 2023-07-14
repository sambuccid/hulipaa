import EL from '../EL.js'

export function addElements(containerDiv,{ paginationNumber,onclick }) {
    const element = EL.button({
        textContent: paginationNumber + 1,
        onclick
    })

    containerDiv.appendChild(element)
    return { element: element }
}
