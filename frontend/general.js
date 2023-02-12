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
    if (searchedWordIdx > N_CHARS_CUT_TEXT) {
        let idxWhereToCut = searchedWordIdx - N_CHARS_CUT_TEXT
        //try to avoid half-words in formatted text, when cutting text it should not cut words in half
        if (isIndexMidWord(idxWhereToCut,formattedText)) {
            //find first index not mid word
            while (idxWhereToCut < formattedText.length && isIndexMidWord(idxWhereToCut,formattedText)) {
                idxWhereToCut++
            }
        }
        formattedText = formattedText.substring(idxWhereToCut)
        formattedText = '...' + formattedText
    }

    searchedWordIdx = formattedText.indexOf(searchedWord)
    const searchedWordRightIdx = searchedWordIdx + searchedWord.length
    const nCharsToEndOfLine = formattedText.length - searchedWordRightIdx
    if (nCharsToEndOfLine > N_CHARS_CUT_TEXT) {
        let idxWhereToCut = searchedWordRightIdx + N_CHARS_CUT_TEXT
        //try to avoid half-words in formatted text, when cutting text it should not cut words in half
        if (isIndexMidWord(idxWhereToCut,formattedText)) {
            //find first index not mid word
            while (idxWhereToCut != 0 && isIndexMidWord(idxWhereToCut,formattedText)) {
                idxWhereToCut--
            }
        }
        formattedText = formattedText.substring(0,idxWhereToCut)
        formattedText = formattedText + '...'
    }


    function isIndexMidWord(idx,text) {
        if (!isCharPartOfWord(text[idx])) {
            return false
        }
        if (idx > 0 && isCharPartOfWord(text[idx - 1])) {
            return true
        }
        if (idx > text.length && isCharPartOfWord(text[idx + 1])) {
            return true
        }

        return false;
    }

    function isCharPartOfWord(char) {
        if (char.length > 1) throw "passed input contains more than 1 character"

        if (char === '_' || char === '-' || char === "'") {
            return true;
        }
        if (new RegExp('[A-Za-zÀ-ÖØ-öø-ÿ]').test(char)) {
            return true
        }

        return false
    }

    return formattedText
}