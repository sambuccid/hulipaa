import {
    findStartEndIdxOfSearchedWords,
    normaliseAndLowecase,
    findIndexOfMaxNumberInMatrix,
    NEW_LINE_MATCHER_REGEX
} from '../../helpers.js'

import {
    highlightWords,
    cutTextAroundWords
} from './formatterHelpers.js'

const N_CHARS_CUT_TEXT = 10
const N_CHARS__WHERE_FIND_WORDS = 30

// This class needs a big refactor, mainly extracting out function from it and testing them independently
export default class ShortenedLinesFormatter {
    execute(text,searchedWords) {
        const normalisedSearchedWords = searchedWords.map((word) => normaliseAndLowecase(word))

        const separateLines = text.split(NEW_LINE_MATCHER_REGEX);
        const normalisedLines = separateLines.map(normaliseAndLowecase)

        let sectionsPerLine = normalisedLines.map((line) => {
            const idxsWordsFound = findStartEndIdxOfSearchedWords(normalisedSearchedWords,line)

            // finds the maximum number of the searched words that can be contained in a section N_CHARS__WHERE_FIND_WORDS caracters long
            // and create an object representing a section
            const sections = idxsWordsFound.map((_idxWord,i) => {
                let nAdditionalWords = 0
                function textLength(idxFirstWord,nAdditionalWords) {
                    const lastMatchedWord = idxsWordsFound[idxFirstWord + nAdditionalWords]
                    const firstMatchedWord = idxsWordsFound[idxFirstWord]
                    return lastMatchedWord.end - firstMatchedWord.start
                }
                // It checks that if we add an additional word to the section we are still within the char limit
                while (i + nAdditionalWords + 1 < idxsWordsFound.length && textLength(i,nAdditionalWords + 1) <= N_CHARS__WHERE_FIND_WORDS) {
                    nAdditionalWords++
                }

                const nMatchedWords = nAdditionalWords + 1
                const lastMatchedWordIdx = i + nAdditionalWords
                const sectionStart = idxsWordsFound[i].start
                const sectionEnd = idxsWordsFound[lastMatchedWordIdx].end

                return {
                    nMatchedWords,
                    startIdx: sectionStart,
                    endIdx: sectionEnd
                }
            })
            return sections
        });

        // Removing overllapping sections
        sectionsPerLine = sectionsPerLine.map((sections) => {
            const endsSet = new Set()
            return sections.filter((section) => {
                const biggerOverlappingSectionExists = endsSet.has(section.endIdx)
                endsSet.add(section.endIdx)
                return !biggerOverlappingSectionExists
            })
        })

        const matrixMaxWordsMatchedInSectionInLine = sectionsPerLine.map((sections) => {
            return sections.map((section) => section.nMatchedWords)
        })
        const [lineIdxMax,sectionIdxMax] = findIndexOfMaxNumberInMatrix(matrixMaxWordsMatchedInSectionInLine)
        const idxMax = {
            line: lineIdxMax,
            section: sectionIdxMax
        }

        if (idxMax.line == null || idxMax.section == null) {
            throw "Error, searched word not found"
        }


        // Finding the second best line
        const matrixWithoutMax = matrixMaxWordsMatchedInSectionInLine.map((maxWordsSection) => [...maxWordsSection])
        matrixWithoutMax[idxMax.line][idxMax.section] = -1
        const [lineIdxSecondMax,sectionIdxSecondMax] = findIndexOfMaxNumberInMatrix(matrixWithoutMax)

        let idxSecondMax = {
            line: lineIdxSecondMax,
            section: sectionIdxSecondMax
        }
        // Check that the second max is not the same section as the first max, in the case there is just one matched word
        if ((idxMax.line == idxSecondMax.line && idxMax.section == idxSecondMax.section)
            || (idxSecondMax.line == null || idxSecondMax.section == null)) {
            idxSecondMax = null
        }

        // Remove empty values and sort by line and section
        let sortedIdxs = [idxMax,idxSecondMax].filter((idx => idx != null))
        sortedIdxs = sortedIdxs.sort((idx1,idx2) => {
            if (idx1.line != idx2.line)
                return idx1.line - idx2.line
            return idx1.section - idx2.section
        })

        const detailsSectionToShow = sortedIdxs.map((idx) => ({
            lineText: normalisedLines[idx.line],
            section: sectionsPerLine[idx.line][idx.section]
        }))
        const formattedSections = detailsSectionToShow.map((sectionDetails) => {
            // Extract text just right before and right after the section
            let finalText = sectionDetails.lineText

            let idxWhereToCut = sectionDetails.section.endIdx + N_CHARS_CUT_TEXT
            finalText = this.#shortenText({
                from: sectionDetails.section.endIdx,
                to: idxWhereToCut,
                text: finalText
            })

            idxWhereToCut = sectionDetails.section.startIdx - N_CHARS_CUT_TEXT
            finalText = this.#shortenText({
                from: sectionDetails.section.startIdx,
                to: idxWhereToCut,
                text: finalText
            })

            finalText = highlightWords(normalisedSearchedWords,finalText)

            return finalText
        })

        const finalHtmlText = formattedSections.join('<br>')

        return finalHtmlText
    }

    // Shortens text adding '...' where it cuts
    // it doesn't cut the text midword, it will exclude the word from the text
    // if from and to are the same indexes it throws an exception
    // if the to index is outside the string it won't cut any text, eg.
    // - if to is less than 0 it doesn't cut the text
    // - if to is bigger than the string lenght it doesn't cut the text
    #shortenText({ from,to,text }) {
        if (from == to) throw "Unexpected parameter"
        if (from > to) {
            if (to <= 0) return text

            text = cutTextAroundWords({
                startIdx: to,
                endIdx: text.length,
                text
            })

            text = '...' + text
        } else if (to > from) {
            if (to >= text.length) return text

            text = cutTextAroundWords({
                startIdx: 0,
                endIdx: to,
                text
            })
            text = text + '...'
        }

        return text
    }
}
