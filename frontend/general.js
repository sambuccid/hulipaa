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
    ResultsUI.populateWith({ resultDiv,text: formattedText })
}
const N_CHARS_CUT_TEXT = 20
function formatTextForResult(text,searchedWord) { //TODO needs refactoring to simplify
    //find line containig result
    const separateLines = text.split(/\r?\n|\r|\n/g);
    const lineWithSearchedWord = separateLines.find(line => line.includes(searchedWord));

    if (!lineWithSearchedWord) {
        throw "Error, searched word not found"
    }
    let formattedText = lineWithSearchedWord

    //extract text just right before and right after searchedWord
    let searchedWordIdx = formattedText.indexOf(searchedWord)
    let idxWhereToCut = searchedWordIdx - N_CHARS_CUT_TEXT
    formattedText = shortenText({
        from: searchedWordIdx,
        to: idxWhereToCut,
        text: formattedText
    })

    searchedWordIdx = formattedText.indexOf(searchedWord)
    const searchedWordRightIdx = searchedWordIdx + searchedWord.length
    idxWhereToCut = searchedWordRightIdx + N_CHARS_CUT_TEXT
    formattedText = shortenText({
        from: searchedWordIdx,
        to: idxWhereToCut,
        text: formattedText
    })

    return formattedText
}