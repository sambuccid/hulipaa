//A generic module that contains all the things that don't have their own module yet
import { search,loadResult } from './service.js'
import * as ResultsUI from './results/results-ui.js'
import { bindFunction } from './helpers.js'


export async function processSearch(query,resultContainer) {
    const res = await search(query);
    const firstResult = res.results[0]

    const { element } = ResultsUI.addElements(resultContainer,{
        resultTitle: firstResult.title,
        onclick: onClick
    })
    const resultElement = element;
    function onClick() {
        onResultClick(firstResult.path,resultElement);
    }
}

export async function onResultClick(resultPath,resultDiv) {
    const result = await loadResult(resultPath);
    ResultsUI.populateWith({ resultDiv,text: result.text })
    console.log("TODO" + resultPath)
}