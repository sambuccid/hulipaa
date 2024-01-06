import * as UI from './resultsContainer-ui.js'
import * as ResultsUI from '../results/results-ui.js'
import { printResultContent } from '../results/results.js'

export function initResultContainer(searchDiv) {
    let resultsDiv = searchDiv.getElementsByClassName(UI.CLASS_NAME)[0]
    if (resultsDiv == null) {
        const r = UI.addElements(searchDiv);
        resultsDiv = r.element;
    }
    return resultsDiv
}

export class ResultsPrinter {
    constructor(searchedWords,resultContainer,paginateButtonsContainer,resultFormatter,HulipaaOpt) {
        this.searchedWords = searchedWords
        this.resultContainer = resultContainer
        this.paginateButtonsContainer = paginateButtonsContainer
        this.resultFormatter = resultFormatter
        this.HulipaaOpt = HulipaaOpt
    }
    async execute(results) {
        ResultsUI.clear(this.resultContainer)
        const loadResultContentPromises = []
        for (const result of results) {
            const { element,resultContentDiv } = ResultsUI.addElements(this.resultContainer,{
                resultTitle: result.title,
                link: result.link
            })
            const loadContentPromise = printResultContent(
                result.title,
                result.path,
                this.searchedWords,
                this.resultContainer,
                this.paginateButtonsContainer,
                this.resultFormatter,
                this.HulipaaOpt,
                resultContentDiv
            )
            loadResultContentPromises.push(loadContentPromise)
        }
        await Promise.all(loadResultContentPromises)
    }
}
