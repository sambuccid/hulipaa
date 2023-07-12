// A generic module that contains
// all the things that don't have their own module yet
import { search } from './service.js'
import * as ResultsUI from './results/results-ui.js'
import * as PaginateButtonsContainerUI from './paginate/paginateButtonsContainer-ui.js'
import { addPaginationButtons } from './paginate/paginateButtonsContainer.js'
import { onResultExpandClick } from './results/results.js'
import { showSearchMessage,manageExceptionUI } from './resultsContainer/resultsContainer.js'
import { normaliseAndLowecase,splitTextInWords } from './helpers.js'

const MAX_RESULTS_IN_PAGE = 15;
export async function processSearch(query,resultContainer,paginateButtonsContainer,HulipaaOpt) {
    ResultsUI.clear(resultContainer)
    PaginateButtonsContainerUI.clear(paginateButtonsContainer)

    const normalisedQuery = normaliseAndLowecase(query)

    const searchedWords = splitTextInWords(normalisedQuery)

    const backEndCalls = searchedWords.map(async (word) => {
        return await search(word,HulipaaOpt)
    })
    const { result: allQueriesResults,error } = await manageExceptionUI(resultContainer,() => Promise.all(backEndCalls))
    if (error) return // There has been an error, already managed by manageExceptionUI

    const finalResults = processQueryResults(allQueriesResults)

    if (finalResults.length == 0) {
        showSearchMessage(
            resultContainer,
            "No results were found for your search",
            ResultsUI.messageType.MESSAGE)
        return;
    }

    const cappedResults = finalResults.slice(0,MAX_RESULTS_IN_PAGE);

    for (const result of cappedResults) {
        ResultsUI.addElements(resultContainer,{
            resultTitle: result.title,
            onclickExpandDiv: onResultExpandClick.bind(null,result.title,result.path,searchedWords,resultContainer,HulipaaOpt),
            link: result.link
        })
    }

    addPaginationButtons(paginateButtonsContainer,finalResults.length,MAX_RESULTS_IN_PAGE)
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
