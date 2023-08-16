import {
    findStartEndIdxOfSearchedWords,
    isIndexMidWord
} from '../../helpers.js'

export function highlightWords(normalisedSearchedWords,text) {
    let highlightedText = text

    let wordsIdxs = findStartEndIdxOfSearchedWords(normalisedSearchedWords,highlightedText)
    wordsIdxs.reverse() // Starting from the end means we don't have to worry about the any idx changing

    for (const wordIdx of wordsIdxs) {
        highlightedText = highlightedText.substring(0,wordIdx.start) +
            '<mark>' +
            highlightedText.substring(wordIdx.start,wordIdx.end) +
            '</mark>' +
            highlightedText.substring(wordIdx.end)
    }
    return highlightedText
}

// This function tries to cut text avoiding cutting words half way through
// it does so by cutting the text right before or after the word
// it prefers to cut a word out of the result if the word is on the edge of the cutting line
export function cutTextAroundWords({ startIdx,endIdx,text }) {
    if (startIdx == endIdx) throw "Unexpected parameter"
    if (startIdx > endIdx) throw "Unexpected parameter"

    //try to avoid half-words in text, when cutting text it should not cut words in half
    //find first index not mid word
    while (endIdx > 0 && isIndexMidWord(endIdx,text)) {
        endIdx--
    }
    text = text.substring(0,endIdx)

    //try to avoid half-words in text, when cutting text it should not cut words in half
    //find first index not mid word
    while (startIdx < text.length && isIndexMidWord(startIdx,text)) {
        startIdx++
    }
    text = text.substring(startIdx)

    return text
}