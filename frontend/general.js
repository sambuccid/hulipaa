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
    for (const result of queryResult.results) {
        ResultsUI.addElements(resultContainer,{
            resultTitle: result.title,
            onclickExpandDiv: onResultExpandClick.bind(null,result.path,query,resultContainer,SWSOptions),
            link: result.link
        })
    }
}
