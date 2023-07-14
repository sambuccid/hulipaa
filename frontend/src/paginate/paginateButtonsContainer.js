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

export function addPaginationButtons(paginateButtonsContainer,allResults,resultLoader,maxResults,resultContainer) {
    UI.clear(paginateButtonsContainer)
    UI.showContainer(paginateButtonsContainer)

    const resultCount = allResults.length
    const paginationCount = Math.floor((resultCount - 1) / maxResults) + 1
    for (let i = 0; i < paginationCount; i++) {
        PaginateButtonUI.addElements(paginateButtonsContainer,{
            paginationNumber: i,
            onclick: openPaginatePage.bind(null,i,allResults,resultLoader,maxResults,paginateButtonsContainer)
        })
    }

}

export function openPaginatePage(pageIndex,allResults,resultLoader,maxResults,paginateButtonsContainer) {
    highlightCurrentPaginateButton(pageIndex,paginateButtonsContainer)

    const paginatedResults = getPaginatedResults(allResults,pageIndex,maxResults)
    resultLoader.loadResults(paginatedResults)
}

function getPaginatedResults(allResults,pageIndex,maxResults) {
    const startIndex = maxResults * pageIndex
    const endIndex = startIndex + maxResults
    return allResults.slice(startIndex,endIndex)
}

function highlightCurrentPaginateButton(pageIndex,paginateButtonsContainer) {
    const buttonIdx = pageIndex

    const buttons = paginateButtonsContainer.getElementsByTagName("button");
    for (let button of buttons) {
        if (PaginateButtonUI.buttonIdxEqual(button,buttonIdx)) {
            PaginateButtonUI.hightlighButton(button)
        } else {
            PaginateButtonUI.removeHightlightButton(button)
        }
    }
}