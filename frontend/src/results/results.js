import { loadResult } from '../service.js'
import * as ResultsUI from './results-ui.js'
import { manageExceptionUI } from '../general.js'

export async function printResultContent(resultTitle,resultPath,searchedWords,resultContainer,paginateButtonsContainer,resultFormatter,HulipaaOpt,resultContentDiv) {
    const { result,error } = await manageExceptionUI(resultContainer,paginateButtonsContainer,
        async () => await loadResult(resultPath)
    )
    if (error) return // There has been an error, already managed by manageExceptionUI

    if (result == null) {
        ResultsUI.setResultError(
            resultContentDiv,
            `We had an issue finding the page, but you can try to open it instead.`,
            ResultsUI.messageType.ERROR)
        return;
    }

    const resultDetails = parseResult(result,resultTitle,resultContentDiv,HulipaaOpt)
    if (!resultDetails) return // There has been an error, already managed by parseResult


    const formattedText = resultFormatter.execute(resultDetails.text,searchedWords)
    ResultsUI.setResultContent({ resultContentDiv,htmlText: formattedText })
}

function parseResult(result,resultTitle,resultContentDiv,HulipaaOpt) {
    let resultDetails
    try {
        resultDetails = HulipaaOpt.parsePage(result)
    } catch (e) { }
    if (resultDetails?.text == null || resultDetails?.text === "") {
        ResultsUI.setResultError(
            resultContentDiv,
            `We had an issue showing this result, but you can try to open it instead.`,
            ResultsUI.messageType.ERROR)
        return;
    }

    return resultDetails
}
