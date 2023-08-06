import * as UI from './resultsContainer-ui.js'
import * as ResultsUI from '../results/results-ui.js'
import { onResultExpandClick } from '../results/results.js'

export function initResultContainer(searchDiv) {
    let resultsDiv = searchDiv.getElementsByClassName(UI.CLASS_NAME)[0]
    if (resultsDiv == null) {
        const r = UI.addElements(searchDiv);
        resultsDiv = r.element;
    }
    return resultsDiv
}

export class ResultsPrinter {
    constructor(searchedWords,resultContainer,paginateButtonsContainer,HulipaaOpt) {
        this.searchedWords = searchedWords
        this.resultContainer = resultContainer
        this.paginateButtonsContainer = paginateButtonsContainer
        this.HulipaaOpt = HulipaaOpt
    }
    execute(results) {
        ResultsUI.clear(this.resultContainer)
        for (const result of results) {
            ResultsUI.addElements(this.resultContainer,{
                resultTitle: result.title,
                onclickExpandDiv: onResultExpandClick.bind(null,result.title,result.path,this.searchedWords,this.resultContainer,this.paginateButtonsContainer,this.HulipaaOpt),
                link: result.link
            })
        }
    }
}
