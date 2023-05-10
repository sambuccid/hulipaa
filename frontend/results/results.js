import {
    shortenText,
    splitTextInWords,
    findIndexOfWholeWord,
    normaliseAndLowecase
} from '../helpers.js'
import { loadResult } from '../service.js'
import * as ResultsUI from './results-ui.js'
import { showSearchMessage,manageExceptionUI } from '../resultsContainer/resultsContainer.js'

// TODO rename function name to mention epxandDiv
export async function onResultClick(indexedResult,expandDiv,searchedWord,resultContainer) {
    if (!ResultsUI.isExpanded({ expandDiv })) {
        const { result,error } = await manageExceptionUI(resultContainer,async () =>
            await loadResult(indexedResult.path)
        )
        if (error) return // There has been an error, already managed by manageExceptionUI

        if (result == null) {
            showSearchMessage(
                resultContainer,
                "There has been an error, the result couldn't be found",
                ResultsUI.messageType.ERROR)
            return;
        }
        const formattedText = formatTextForResult(result.text,searchedWord)
        ResultsUI.populateExpandWith({ expandDiv,htmlText: formattedText })
        ResultsUI.expand({ expandDiv })
    } else {
        ResultsUI.populateExpandWithImage({ expandDiv })
        ResultsUI.collapse({ expandDiv })
    }
}

const N_CHARS_CUT_TEXT = 20
export function formatTextForResult(text,searchedWord) {
    const normalisedSearchedWord = normaliseAndLowecase(searchedWord)

    //find all lines containig result
    const separateLines = text.split(/\r?\n|\r|\n/g);
    const allLinesWithSearchedWord = separateLines.filter((line) => {
        const normalisedLine = normaliseAndLowecase(line)
        const wordsInLine = splitTextInWords(normalisedLine)
        return wordsInLine.includes(normalisedSearchedWord)
    });
    if (allLinesWithSearchedWord == null || allLinesWithSearchedWord.length == 0) {
        throw "Error, searched word not found"
    }

    const formattedLines = allLinesWithSearchedWord.map((line) => {
        //extract text just right before and right after the searched word
        let normalisedLine = normaliseAndLowecase(line)
        let searchedWordIdxs = findIndexOfWholeWord(normalisedSearchedWord,normalisedLine)
        let idxWhereToCut = searchedWordIdxs.start - N_CHARS_CUT_TEXT

        line = shortenText({
            from: searchedWordIdxs.start,
            to: idxWhereToCut,
            text: line
        })

        normalisedLine = normaliseAndLowecase(line)
        searchedWordIdxs = findIndexOfWholeWord(normalisedSearchedWord,normalisedLine)
        idxWhereToCut = searchedWordIdxs.end + N_CHARS_CUT_TEXT
        line = shortenText({
            from: searchedWordIdxs.start,
            to: idxWhereToCut,
            text: line
        })

        // Highlight the searched word
        normalisedLine = normaliseAndLowecase(line)
        searchedWordIdxs = findIndexOfWholeWord(normalisedSearchedWord,normalisedLine)
        line = line.substring(0,searchedWordIdxs.start) +
            '<mark>' +
            line.substring(searchedWordIdxs.start,searchedWordIdxs.end) +
            '</mark>' +
            line.substring(searchedWordIdxs.end)
        return line
    })

    const finalHtmlText = formattedLines.join('<br>')

    return finalHtmlText
}
