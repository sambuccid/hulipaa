import {
    findStartEndIdxOfSearchedWords,
    isIndexMidWord,
    calculateDifferenceNumbersInList,
    findBiggerGroupOfNumbersWithinDistance
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

export function getSectionWithMostNumberOfResultsUnprecise(text,searchedWords,sectionLength) {
    if (text.length <= sectionLength) {
        return {
            sectionStartIdx: 0,
            sectionEndIdx: text.length
        }
    }

    const idxsWordsFound = findStartEndIdxOfSearchedWords(searchedWords,text)
    const startIdxsWordsFound = idxsWordsFound.map((idxs) => idxs.start)

    if (idxsWordsFound.length == 0)
        return {
            sectionStartIdx: 0,
            sectionEndIdx: sectionLength
        }
    if (idxsWordsFound.length == 1) {
        return getPaddedStartEndSectionAt(idxsWordsFound[0].start,idxsWordsFound[0].end)
    }

    const biggerGroup = findBiggerGroupOfNumbersWithinDistance(startIdxsWordsFound,sectionLength)
    const firstCloserWordNumber = biggerGroup.groupStartIdx
    const lastCloserWordNumber = biggerGroup.groupEndIdx
    const firstCloserWordIdx = startIdxsWordsFound[firstCloserWordNumber]
    //lastCloserWordIdx = startIdxsWordsFound[lastCloserWordNumber]
    const lastCloserWordIdxEnd = idxsWordsFound[lastCloserWordNumber].end

    return getPaddedStartEndSectionAt(firstCloserWordIdx,lastCloserWordIdxEnd)

    function getPaddedStartEndSectionAt(startIdx,endIdx) {
        const sectionOfFoundWordsLength = endIdx - startIdx
        const lengthOfSectionLeftToFill = sectionLength - sectionOfFoundWordsLength

        if (lengthOfSectionLeftToFill <= 1) {
            return getStartEndSectionAt(startIdx)
        }

        const paddingLength = Math.floor(lengthOfSectionLeftToFill / 2)

        let startSection = startIdx - paddingLength
        // endSection = endIdx + paddingLength

        startSection = Math.max(0,startSection) // avoid start of section being before the string begins
        return getStartEndSectionAt(startSection)
    }

    function getStartEndSectionAt(startSection) {
        const endSection = startSection + sectionLength

        const overLength = endSection - text.length
        const startAdjustment = Math.max(0,overLength) // if the end section is longer than the text length, then the adjustment is not needed

        return {
            sectionStartIdx: startSection - startAdjustment,
            sectionEndIdx: startSection + sectionLength
        }
    }
}
