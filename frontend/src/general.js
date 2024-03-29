// A generic module that contains
// all the things that don't have their own module yet
import * as ResultsUI from './results/results-ui.js'
import * as PaginateButtonsContainerUI from './paginate/paginateButtonsContainer-ui.js'
import { NetworkError } from './network.js'

export function clearAndShowSearchMessage(resultContainer,paginateButtonsContainer,message,messageType) {
    ResultsUI.clear(resultContainer)
    PaginateButtonsContainerUI.clear(paginateButtonsContainer)
    PaginateButtonsContainerUI.hideContainer(paginateButtonsContainer)

    ResultsUI.addMessage(resultContainer,{
        message,
        type: messageType
    })
}

export async function manageExceptionUI(resultContainer,paginateButtonsContainer,func) {
    let result
    try {
        result = await func();
    } catch (e) {
        onError(resultContainer,paginateButtonsContainer,e)
        return { error: true,result: null }
    }
    return { result }
}

function onError(resultContainer,paginateButtonsContainer,error) {
    let errorText = 'There has been an issue with the network.'
    if (error instanceof NetworkError) {
        errorText = 'There has been an issue.'
    }
    clearAndShowSearchMessage(resultContainer,paginateButtonsContainer,errorText,ResultsUI.messageType.ERROR)
}