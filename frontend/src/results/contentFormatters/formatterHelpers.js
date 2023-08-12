import {
    findStartEndIdxOfSearchedWords
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