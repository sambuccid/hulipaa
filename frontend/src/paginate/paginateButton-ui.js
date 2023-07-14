import EL from '../EL.js'

const INDEX_PROP_NAME = "buttonIndex"
export function addElements(containerDiv,{ paginationNumber,onclick }) {
    const dataset = {}
    dataset[INDEX_PROP_NAME] = paginationNumber
    const element = EL.button({
        textContent: paginationNumber + 1,
        dataset,
        onclick
    })

    containerDiv.appendChild(element)
    return { element: element }
}

export function buttonIdxEqual(button,buttonidx) {
    return button.dataset[INDEX_PROP_NAME] == buttonidx
}

export function hightlighButton(button) {
    button.style.backgroundColor = 'Cyan'
}
export function removeHightlightButton(button) {
    button.style.backgroundColor = 'revert'
}

export function disableButton(button) {
    button.setAttribute("disabled","disabled");
}
export function enableButton(button) {
    button.removeAttribute("disabled");
}