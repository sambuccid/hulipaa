// A generic module that contains
// all the things that don't have their own module yet
import { search,loadResult } from './service.js'
import * as ResultsUI from './results/results-ui.js'
import { shortenText,splitTextInWords,findIndexOfWholeWord } from './helpers.js'
import { NetworkError } from './network.js'


export async function processSearch(query,resultContainer) {
    ResultsUI.clear(resultContainer)
    let res;
    try {
        res = await search(query);
    } catch (e) {
        onError(resultContainer,e)
        return;
    }
    if (res.results.length == 0) {
        showSearchMessage(
            resultContainer,
            "No results were found for your search",
            ResultsUI.messageType.MESSAGE)
        return;
    }
    const firstResult = res.results[0]

    ResultsUI.addElements(resultContainer,{
        resultTitle: firstResult.title,
        onclick: onClick
    })
    async function onClick(event) {
        // Is important to reference the result element from the event, because otherwise we might create a memory leak
        const resultElement = event.currentTarget;
        await onResultClick(firstResult,resultElement,query,resultContainer);
    }
}

function onError(resultContainer,error) {
    let errorText = 'Experienced a network issue, please try again'
    if (error instanceof NetworkError) {
        errorText = 'There has been an issue, please try again'
    }
    showSearchMessage(resultContainer,errorText,ResultsUI.messageType.ERROR)
}

function showSearchMessage(resultContainer,message,messageType) {
    ResultsUI.clear(resultContainer)
    ResultsUI.addElements(resultContainer,{
        resultTitle: message,
        type: messageType
    })
}

async function onResultClick(indexedResult,resultDiv,searchedWord,resultContainer) {
    if (!ResultsUI.isExpanded({ resultDiv })) {
        let result;
        try {
            result = await loadResult(indexedResult.path);
            if (result == null) {
                showSearchMessage(
                    resultContainer,
                    "There has been an error, the result couldn't be found",
                    ResultsUI.messageType.ERROR)
                return;
            }
        } catch (e) {
            onError(resultContainer,e)
            return;
        }
        const formattedText = formatTextForResult(result.text,searchedWord)
        ResultsUI.populateWith({ resultDiv,htmlText: formattedText })
        ResultsUI.expand({ resultDiv })
    } else {
        ResultsUI.populateWith({ resultDiv,text: indexedResult.title })
        ResultsUI.collapse({ resultDiv })
    }
}
const N_CHARS_CUT_TEXT = 20
function formatTextForResult(text,searchedWord) {
    //find all lines containig result
    const separateLines = text.split(/\r?\n|\r|\n/g);
    const allLinesWithSearchedWord = separateLines.filter((line) => {
        const wordsInLine = splitTextInWords(line)
        return wordsInLine.includes(searchedWord)
    });
    if (allLinesWithSearchedWord == null || allLinesWithSearchedWord.length == 0) {
        throw "Error, searched word not found"
    }

    const formattedLines = allLinesWithSearchedWord.map((line) => {
        //extract text just right before and right after the searched word
        let searchedWordIdxs = findIndexOfWholeWord(searchedWord,line)
        let idxWhereToCut = searchedWordIdxs.start - N_CHARS_CUT_TEXT

        line = shortenText({
            from: searchedWordIdxs.start,
            to: idxWhereToCut,
            text: line
        })

        searchedWordIdxs = findIndexOfWholeWord(searchedWord,line)
        idxWhereToCut = searchedWordIdxs.end + N_CHARS_CUT_TEXT
        line = shortenText({
            from: searchedWordIdxs.start,
            to: idxWhereToCut,
            text: line
        })

        // Highlight the searched word
        line = line.replaceAll(searchedWord,`<mark>${searchedWord}</mark>`)
        return line
    })

    const finalHtmlText = formattedLines.join('<br>')

    return finalHtmlText
}