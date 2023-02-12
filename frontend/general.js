// A generic module that contains
// all the things that don't have their own module yet
import { search,loadResult } from './service.js'
import * as ResultsUI from './results/results-ui.js'


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
function formatTextForResult(text,searchedWord) {
    //find line containig result
    const separateLines = text.split(/\r?\n|\r|\n/g);
    const lineWithSearchedWord = separateLines.find(line => line.includes(searchedWord));

    if (!lineWithSearchedWord) {
        throw "Error, searched word not found"
    }
    let formattedText = lineWithSearchedWord

    //extract text right before and after searchedWord
    let searchedWordIdx = formattedText.indexOf(searchedWord)
    if (searchedWordIdx > N_CHARS_CUT_TEXT) {
        formattedText = formattedText.substring(searchedWordIdx - N_CHARS_CUT_TEXT)
        formattedText = '...' + formattedText
    }

    searchedWordIdx = formattedText.indexOf(searchedWord)
    const searchedWordRightIdx = searchedWordIdx + searchedWord.length
    const nCharsToEndOfLine = formattedText.length - searchedWordRightIdx
    if (nCharsToEndOfLine > N_CHARS_CUT_TEXT) {
        formattedText = formattedText.substring(0,searchedWordRightIdx + N_CHARS_CUT_TEXT)
        formattedText = formattedText + '...'
    }
    //check if is cutting a word in half, if it is exclude the word(3rd and 4th parameter of parametrised test)
    return formattedText
}