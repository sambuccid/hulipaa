import EL from '../EL.js'

const INDEX_PROP_NAME = "buttonIndex"
const PAGE_PAGINATE_BUTTON_CLASS = "index-button"
const SELECTED_PAGINATE_BUTTON_CLASS = "selected-button"
const NEXT_PAGE_PAGINATE_BUTTON_CLASS = "next-button"
const PREVIOUS_PAGE_PAGINATE_BUTTON_CLASS = "previous-button"

export function addElements(containerDiv,{ paginationNumber,onclick }) {
    const dataset = {}
    dataset[INDEX_PROP_NAME] = paginationNumber
    const element = EL.button({
        textContent: paginationNumber + 1,
        dataset,
        onclick,
        className: PAGE_PAGINATE_BUTTON_CLASS
    })

    containerDiv.appendChild(element)
    return { element: element }
}

export function addPreviousPageButton(containerDiv,{ onclick }) {
    const element = EL.button({
        textContent: '<',
        onclick,
        className: PREVIOUS_PAGE_PAGINATE_BUTTON_CLASS
    })
    containerDiv.appendChild(element)
}
export function findPreviousPageButton(paginateButtonsContainer) {
    return paginateButtonsContainer.querySelectorAll(`.${PREVIOUS_PAGE_PAGINATE_BUTTON_CLASS}`)[0]
}

export function addNextPageButton(containerDiv,{ onclick }) {
    const element = EL.button({
        textContent: '>',
        onclick,
        className: NEXT_PAGE_PAGINATE_BUTTON_CLASS
    })
    containerDiv.appendChild(element)
}
export function findNextPageButton(paginateButtonsContainer) {
    return paginateButtonsContainer.querySelectorAll(`.${NEXT_PAGE_PAGINATE_BUTTON_CLASS}`)[0]
}

export function getAllPageButtons(paginateButtonsContainer) {
    return paginateButtonsContainer.querySelectorAll(`.${PAGE_PAGINATE_BUTTON_CLASS}`)
}

export function getCurrentButtonIdx(paginateButtonsContainer) {
    const selectedButtons = paginateButtonsContainer.querySelectorAll(`.${SELECTED_PAGINATE_BUTTON_CLASS}`)
    if (selectedButtons.length != 1)
        throw new Error("Unexpected error with pagination buttons")

    const buttonIdx = selectedButtons[0].dataset[INDEX_PROP_NAME]
    return parseInt(buttonIdx)
}

export function buttonIdxEqual(button,buttonIdx) {
    return button.dataset[INDEX_PROP_NAME] == buttonIdx
}

export function selectButton(button) {
    button.classList.add(SELECTED_PAGINATE_BUTTON_CLASS)
    button.style.backgroundColor = 'Cyan'
}
export function removeSelectionButton(button) {
    button.classList.remove(SELECTED_PAGINATE_BUTTON_CLASS)
    button.style.backgroundColor = 'revert'
}

export function disableButton(button) {
    button.setAttribute("disabled","disabled");
}
export function enableButton(button) {
    button.removeAttribute("disabled");
}

export function hideButton(button) {
    button.style.display = 'none'
}
export function showButton(button) {
    button.style.display = 'revert'
}

export function visibleTransparentButton(button,shouldShow) {
    if (shouldShow) {
        visibleButton(button)
    } else {
        transparentButton(button)
    }
}
export function visibleButton(button) {
    button.style.visibility = 'revert'
}
export function transparentButton(button) {
    button.style.visibility = 'hidden'
}