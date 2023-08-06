import { search } from './service.js'
import * as ResultsUI from './results/results-ui.js'
import { refreshPaginationButtons,openPaginatePage } from './paginate/paginateButtonsContainer.js'
import { ResultsPrinter } from './resultsContainer/resultsContainer.js'
import { normaliseAndLowecase,splitTextInWords } from './helpers.js'
import { clearAndShowSearchMessage,manageExceptionUI } from './general.js'

const MAX_RESULTS_IN_PAGE = 15;
export async function processSearch(query,resultContainer,paginateButtonsContainer,HulipaaOpt) {
    const normalisedQuery = normaliseAndLowecase(query)

    const searchedWords = splitTextInWords(normalisedQuery)

    const backEndCalls = searchedWords.map(async (word) => {
        return await search(word,HulipaaOpt)
    })
    const { result: allQueriesResults,error } = await manageExceptionUI(resultContainer,paginateButtonsContainer,
        () => Promise.all(backEndCalls))
    if (error) return // There has been an error, already managed by manageExceptionUI

    const finalResults = processQueryResults(allQueriesResults)

    if (finalResults.length == 0) {
        clearAndShowSearchMessage(
            resultContainer,
            paginateButtonsContainer,
            "No results were found for your search",
            ResultsUI.messageType.MESSAGE)
        return;
    }

    const resultsPrinter = new ResultsPrinter(searchedWords,resultContainer,paginateButtonsContainer,HulipaaOpt)

    // This needs to happen before openPaginatePage, otherwise when it tries to highlight a button it can't find it
    refreshPaginationButtons(paginateButtonsContainer,finalResults,resultsPrinter,MAX_RESULTS_IN_PAGE,resultContainer)

    openPaginatePage(0,finalResults,resultsPrinter,MAX_RESULTS_IN_PAGE,paginateButtonsContainer)
}

function processQueryResults(allQueriesResults) {
    // Results aggregated by page
    const pagesMap = new Map()
    for (const queriesResults of allQueriesResults) {
        for (const result of queriesResults.results) {
            if (!pagesMap.has(result.path)) {
                pagesMap.set(result.path,[])
            }
            pagesMap.get(result.path).push(result)
        }
    }
    // An array of results, one for each page, the results for each page aggregated by summing numberOfMatches
    const allPageResults = Array.from(pagesMap,([_pagePath,resultsOfPage]) => {
        const reducedPageResult = resultsOfPage.reduce((finalRes,res) => {
            finalRes.numberOfMatches += res.numberOfMatches
            return finalRes
        })
        return reducedPageResult
    })

    // Sort based on totla numberOfMatches, the higher number goes first
    const sortedPageResults = [...allPageResults].sort((res1,res2) => {
        return res2.numberOfMatches - res1.numberOfMatches
    })
    return sortedPageResults
}
