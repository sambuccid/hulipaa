//A generic module that contains all the things that don't have their own module yet
import { search,loadResult } from './service.js'
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

export async function onResultClick(resultPath) {
    const result = await loadResult(resultPath);
    //TODO call UI to generate result element
    //TODO append element
    console.log("TODO" + resultPath)
}