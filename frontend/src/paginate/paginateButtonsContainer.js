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

export function refreshPaginationButtons(paginateButtonsContainer,allResults,resultsPrinter,maxResults,resultContainer) {
    UI.clear(paginateButtonsContainer)
    if (allResults.length <= maxResults) {
        UI.hideContainer(paginateButtonsContainer)
        return
    }

    UI.showContainer(paginateButtonsContainer)

    const resultCount = allResults.length
    const paginationCount = getNumberOfPages(resultCount,maxResults)

    PaginateButtonUI.addPreviousPageButton(paginateButtonsContainer,{
        onclick: moveToPreviousPage.bind(null,allResults,resultsPrinter,maxResults,paginateButtonsContainer)
    })

    for (let i = 0; i < paginationCount; i++) {
        PaginateButtonUI.addElements(paginateButtonsContainer,{
            paginationNumber: i,
            onclick: openPaginatePage.bind(null,i,allResults,resultsPrinter,maxResults,paginateButtonsContainer)
        })
    }

    PaginateButtonUI.addNextPageButton(paginateButtonsContainer,{
        onclick: moveToNextPage.bind(null,allResults,resultsPrinter,maxResults,paginateButtonsContainer)
    })
}

function getNumberOfPages(resultCount,maxResults) {
    return Math.floor((resultCount - 1) / maxResults) + 1
}

async function moveToNextPage(allResults,resultsPrinter,maxResults,paginateButtonsContainer) {
    const pageIdx = PaginateButtonUI.getCurrentButtonIdx(paginateButtonsContainer);
    await openPaginatePage(pageIdx + 1,allResults,resultsPrinter,maxResults,paginateButtonsContainer)
}
async function moveToPreviousPage(allResults,resultsPrinter,maxResults,paginateButtonsContainer) {
    const pageIdx = PaginateButtonUI.getCurrentButtonIdx(paginateButtonsContainer);
    await openPaginatePage(pageIdx - 1,allResults,resultsPrinter,maxResults,paginateButtonsContainer)
}

export async function openPaginatePage(pageIndex,allResults,resultsPrinter,maxResults,paginateButtonsContainer) {
    highlightCurrentPaginateButton(pageIndex,paginateButtonsContainer)
    updatePreviousNextButtons(pageIndex,allResults.length,maxResults,paginateButtonsContainer)

    const paginatedResults = getPaginatedResults(allResults,pageIndex,maxResults)
    await resultsPrinter.execute(paginatedResults)
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
    const previousPageButton = PaginateButtonUI.findPreviousPageButton(paginateButtonsContainer)
    const nextPageButton = PaginateButtonUI.findNextPageButton(paginateButtonsContainer)
    if (!previousPageButton || !nextPageButton) {
        return
    }

    // Previous page button
    const isFirstPage = pageIdx <= 0
    PaginateButtonUI.visibleTransparentButton(previousPageButton,!isFirstPage)

    // Next page button
    const totalPages = getNumberOfPages(resultCount,maxResults)
    const isLastPage = pageIdx >= totalPages - 1
    PaginateButtonUI.visibleTransparentButton(nextPageButton,!isLastPage)
}
