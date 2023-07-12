import * as UI from './paginateButtonsContainer-ui.js'
import * as PaginateButtonUI from './paginateButton-ui.js'

export function initContainer(searchDiv) {
    let buttonsDiv = searchDiv.getElementsByClassName(UI.CLASS_NAME)[0]
    if (buttonsDiv == null) {
        const r = UI.addElements(searchDiv,{ hidden: true });
        buttonsDiv = r.element;
    }
    return buttonsDiv
}

export function addPaginationButtons(paginateButtonsContainer,resultCount,maxResults) {
    UI.showContainer(paginateButtonsContainer)

    const paginationCount = Math.floor((resultCount - 1) / maxResults) + 1
    for (let i = 0; i < paginationCount; i++) {
        PaginateButtonUI.addElements(paginateButtonsContainer,{ paginationNumber: i })
    }
}