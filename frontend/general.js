// A generic module that contains
// all the things that don't have their own module yet
import { search,loadResult } from './service.js'
import * as ResultsUI from './results/results-ui.js'
import { shortenText } from './helpers.js'


export async function processSearch(query,resultContainer) {
    const res = await search(query);
    const firstResult = res.results[0]

    const { element } = ResultsUI.addElements(resultContainer,{
        resultTitle: firstResult.title,
        onclick: onClick
    })
    const resultElement = element;
    async function onClick() {
        await onResultClick(firstResult.path,resultElement,query);
    }
}

async function onResultClick(resultPath,resultDiv,searchedWord) {
    const result = await loadResult(resultPath);
    const formattedText = formatTextForResult(result.text,searchedWord)
    ResultsUI.populateWith({ resultDiv,htmlText: formattedText })
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