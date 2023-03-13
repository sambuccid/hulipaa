// A generic module that contains
// all the things that don't have their own module yet
import { search,loadResult } from './service.js'
import * as ResultsUI from './results/results-ui.js'
import { shortenText } from './helpers.js'


export async function processSearch(query,resultContainer) {
    ResultsUI.clear(resultContainer)
    const res = await search(query);
    const firstResult = res.results[0]

    ResultsUI.addElements(resultContainer,{
        resultTitle: firstResult.title,
        onclick: onClick
    })
    async function onClick(event) {
        // Is important to reference the result element from the event, because otherwise we might create a memory leak
        const resultElement = event.currentTarget;
        await onResultClick(firstResult,resultElement,query);
    }
}

async function onResultClick(indexedResult,resultDiv,searchedWord) {
    if (!ResultsUI.isExpanded({ resultDiv })) {
        const result = await loadResult(indexedResult.path);
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
    const allLinesWithSearchedWord = separateLines.filter(line => line.includes(searchedWord));
    if (allLinesWithSearchedWord == null || allLinesWithSearchedWord.length == 0) {
        throw "Error, searched word not found"
    }

    const formattedLines = allLinesWithSearchedWord.map((line) => {
        //extract text just right before and right after the searched word
        let searchedWordIdx = line.indexOf(searchedWord)
        let idxWhereToCut = searchedWordIdx - N_CHARS_CUT_TEXT
        line = shortenText({
            from: searchedWordIdx,
            to: idxWhereToCut,
            text: line
        })

        searchedWordIdx = line.indexOf(searchedWord)
        const searchedWordRightIdx = searchedWordIdx + searchedWord.length
        idxWhereToCut = searchedWordRightIdx + N_CHARS_CUT_TEXT
        line = shortenText({
            from: searchedWordIdx,
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