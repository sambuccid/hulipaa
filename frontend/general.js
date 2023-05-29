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

    const { result,error } = await manageExceptionUI(resultContainer,async () =>
        await search(normalisedQuery)
    )
    if (error) return // There has been an error, already managed by manageExceptionUI

    if (result.results.length == 0) {
        showSearchMessage(
            resultContainer,
            "No results were found for your search",
            ResultsUI.messageType.MESSAGE)
        return;
    }
    const firstResult = result.results[0]

    ResultsUI.addElements(resultContainer,{
        resultTitle: firstResult.title,
        onclickExpandDiv: onClickExpandDiv,
        link: firstResult.link
    })
    async function onClickExpandDiv(expandDiv) {
        await onResultExpandClick(firstResult,expandDiv,query,resultContainer,SWSOptions);
    }
}
