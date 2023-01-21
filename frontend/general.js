//A generic module that contains all the things that don't have their own module yet
import { search } from './service.js'
import * as ResultsUI from './results/results-ui.js'
import { bindFunction } from './helpers.js'


export async function processSearch(query,resultContainer) {
    const res = await search(query);
    const firstResult = res.results[0]

    ResultsUI.addElements(resultContainer,{
        resultTitle: firstResult.title,
        onclick: bindFunction(onResultClick,firstResult.path)
    })
}

export function onResultClick(resultPath) {
    alert("TODO" + resultPath)
}