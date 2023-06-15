// A generic module that contains
// all the things that don't have their own module yet
import { search } from './service.js'
import * as ResultsUI from './results/results-ui.js'
import { onResultExpandClick } from './results/results.js'
import { showSearchMessage,manageExceptionUI } from './resultsContainer/resultsContainer.js'
import { normaliseAndLowecase } from './helpers.js'

export async function processSearch(query,resultContainer,SWSOptions) {
    ResultsUI.clear(resultContainer)
    const normalisedQuery = normaliseAndLowecase(query)

    const { result: queryResult,error } = await manageExceptionUI(resultContainer,async () =>
        await search(normalisedQuery)
    )
    if (error) return // There has been an error, already managed by manageExceptionUI

    if (queryResult.results.length == 0) {
        showSearchMessage(
            resultContainer,
            "No results were found for your search",
            ResultsUI.messageType.MESSAGE)
        return;
    }

    // Sort based on numberOfMatches, the higher number goes first
    const sortedResults = [...queryResult.results].sort((res1,res2) => {
        return res2.numberOfMatches - res1.numberOfMatches
    })

    for (const result of sortedResults) {
        ResultsUI.addElements(resultContainer,{
            resultTitle: result.title,
            onclickExpandDiv: onResultExpandClick.bind(null,result.title,result.path,query,resultContainer,SWSOptions),
            link: result.link
        })
    }
}
