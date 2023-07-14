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

export function refreshPaginationButtons(paginateButtonsContainer,allResults,resultLoader,maxResults,resultContainer) {
    UI.clear(paginateButtonsContainer)
    if (allResults.length <= maxResults) {
        UI.hideContainer(paginateButtonsContainer)
        return
    }

    UI.showContainer(paginateButtonsContainer)

    const resultCount = allResults.length
    const paginationCount = getNumberOfPages(resultCount,maxResults)

    for (let i = 0; i < paginationCount; i++) {
        PaginateButtonUI.addElements(paginateButtonsContainer,{
            paginationNumber: i,
            onclick: openPaginatePage.bind(null,i,allResults,resultLoader,maxResults,paginateButtonsContainer)
        })
    }

    PaginateButtonUI.addNextPageButton(paginateButtonsContainer,{
        onclick: moveToNextPage.bind(null,allResults,resultLoader,maxResults,paginateButtonsContainer)
    })
}

function getNumberOfPages(resultCount,maxResults) {
    return Math.floor((resultCount - 1) / maxResults) + 1
}

function moveToNextPage(allResults,resultLoader,maxResults,paginateButtonsContainer) {
    const pageIdx = PaginateButtonUI.getCurrentButtonIdx(paginateButtonsContainer);
    openPaginatePage(pageIdx + 1,allResults,resultLoader,maxResults,paginateButtonsContainer)
}

export function openPaginatePage(pageIndex,allResults,resultLoader,maxResults,paginateButtonsContainer) {
    highlightCurrentPaginateButton(pageIndex,paginateButtonsContainer)
    updatePreviousNextButtons(pageIndex,allResults.length,maxResults,paginateButtonsContainer)

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

    const buttons = PaginateButtonUI.getAllPageButtons(paginateButtonsContainer)
    for (let button of buttons) {
        if (PaginateButtonUI.buttonIdxEqual(button,buttonIdx)) {
            PaginateButtonUI.selectButton(button)
            PaginateButtonUI.disableButton(button)
        } else {
            PaginateButtonUI.removeSelectionButton(button)
            PaginateButtonUI.enableButton(button)
        }
    }
}

function updatePreviousNextButtons(pageIdx,resultCount,maxResults,paginateButtonsContainer) {
    const nextPageButton = PaginateButtonUI.findNextPageButton(paginateButtonsContainer)
    if (!nextPageButton)
        return

    const totalPages = getNumberOfPages(resultCount,maxResults)
    const isLastPage = pageIdx >= totalPages - 1
    if (isLastPage) {
        PaginateButtonUI.hideButton(nextPageButton)
    } else {
        PaginateButtonUI.showButton(nextPageButton)
    }
}