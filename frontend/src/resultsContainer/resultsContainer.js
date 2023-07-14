import * as UI from './resultsContainer-ui.js'
import * as ResultsUI from '../results/results-ui.js'
import { onResultExpandClick } from '../results/results.js'
import { NetworkError } from '../network.js'

export function initResultContainer(searchDiv) {
    let resultsDiv = searchDiv.getElementsByClassName(UI.CLASS_NAME)[0]
    if (resultsDiv == null) {
        const r = UI.addElements(searchDiv);
        resultsDiv = r.element;
    }
    return resultsDiv
}

export class ResultLoader {
    constructor(searchedWords,resultContainer,HulipaaOpt) {
        this.searchedWords = searchedWords
        this.resultContainer = resultContainer
        this.HulipaaOpt = HulipaaOpt
    }
    loadResults(results) {
        ResultsUI.clear(this.resultContainer)
        for (const result of results) {
            ResultsUI.addElements(this.resultContainer,{
                resultTitle: result.title,
                onclickExpandDiv: onResultExpandClick.bind(null,result.title,result.path,this.searchedWords,this.resultContainer,this.HulipaaOpt),
                link: result.link
            })
        }
    }
}

export function showSearchMessage(resultContainer,message,messageType) {
    ResultsUI.clear(resultContainer)
    ResultsUI.addMessage(resultContainer,{
        message,
        type: messageType
    })
}

export async function manageExceptionUI(resultContainer,func) {
    let result
    try {
        result = await func();
    } catch (e) {
        onError(resultContainer,e)
        return { error: true,result: null }
    }
    return { result }
}

export function onError(resultContainer,error) {
    let errorText = 'Experienced a network issue, please try again'
    if (error instanceof NetworkError) {
        errorText = 'There has been an issue, please try again'
    }
    showSearchMessage(resultContainer,errorText,ResultsUI.messageType.ERROR)
}