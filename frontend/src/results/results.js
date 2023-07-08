import {
    shortenText,
    matchWholeWord,
    normaliseAndLowecase
} from '../helpers.js'
import { loadResult } from '../service.js'
import * as ResultsUI from './results-ui.js'
import {
    manageExceptionUI
} from '../resultsContainer/resultsContainer.js'

export async function onResultExpandClick(resultTitle,resultPath,searchedWords,resultContainer,HulipaaOpt,expandDiv) {
    if (!ResultsUI.isExpanded({ expandDiv })) {
        const { result,error } = await manageExceptionUI(resultContainer,async () =>
            await loadResult(resultPath)
        )
        if (error) return // There has been an error, already managed by manageExceptionUI

        if (result == null) {
            ResultsUI.substituteWithMessage(
                ResultsUI.getResultDiv({ expandDiv }),
                `Error: The result for the ${resultTitle} page couldn't be found`,
                ResultsUI.messageType.ERROR)
            return;
        }

        const resultDetails = parseResult(result,resultTitle,expandDiv,HulipaaOpt)
        if (!resultDetails) return // There has been an error, already managed by parseResult

        const formattedText = formatTextForResult(resultDetails.text,searchedWords)
        ResultsUI.populateExpandWith({ expandDiv,htmlText: formattedText })
        ResultsUI.expand({ expandDiv })
    } else {
        ResultsUI.populateExpandWithImage({ expandDiv })
        ResultsUI.collapse({ expandDiv })
    }
}

function parseResult(result,resultTitle,expandDiv,HulipaaOpt) {
    let resultDetails
    try {
        resultDetails = HulipaaOpt.parsePage(result)
    } catch (e) { }
    if (resultDetails?.text == null || resultDetails?.text === "") {
        ResultsUI.substituteWithMessage(
            ResultsUI.getResultDiv({ expandDiv }),
            `There has been an error parsing the ${resultTitle} page`,
            ResultsUI.messageType.ERROR)
        return;
    }

    return resultDetails
}

const N_CHARS_CUT_TEXT = 10
const N_CHARS__WHERE_FIND_WORDS = 30
// This function needs a big refactor, mainly extracting out function from it and testing them independently
export function formatTextForResult(text,searchedWords) {
    const normalisedSearchedWords = searchedWords.map((word) => normaliseAndLowecase(word))

    const separateLines = text.split(/\r?\n|\r|\n/g);
    const normalisedLines = separateLines.map(normaliseAndLowecase)

    function findStartEndIdxOfSearchedWords(text) {
        let idxsWordsFound = normalisedSearchedWords.map((word) => {
            const foundIn = matchWholeWord(text,word)
            const foundIdxsList = foundIn.map((find) => {
                return {
                    start: find.index,
                    end: find.index + word.length
                }
            })
            return foundIdxsList
        })
        idxsWordsFound = idxsWordsFound.flat()
        idxsWordsFound = idxsWordsFound.sort((idx1,idx2) => {
            return idx1.start - idx2.start
        })
        return idxsWordsFound
    }

    let sectionsPerLine = normalisedLines.map((line) => {
        const idxsWordsFound = findStartEndIdxOfSearchedWords(line)

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


    function findIndexOfMaxNumberInMatrix(matrix) {
        // Matrix has lines and columns
        // matrix[line][column]
        const listOfMaxOfEachLine = matrix.map((column) => {
            if (column.length == 0) {
                return -1
            }
            return Math.max(...column)
        })

        const overallMax = Math.max(...listOfMaxOfEachLine)
        const idxLine = listOfMaxOfEachLine.indexOf(overallMax)

        const lineWithMax = matrix[idxLine]
        const idxColumn = lineWithMax.findIndex((column) => column === overallMax)
        if (overallMax == -1 || idxLine == -1 || idxColumn == -1) {
            return [null,null]
        }
        return [idxLine,idxColumn]
    }

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
        finalText = shortenText({
            from: sectionDetails.section.endIdx,
            to: idxWhereToCut,
            text: finalText
        })

        idxWhereToCut = sectionDetails.section.startIdx - N_CHARS_CUT_TEXT
        finalText = shortenText({
            from: sectionDetails.section.startIdx,
            to: idxWhereToCut,
            text: finalText
        })

        let wordsIdxs = findStartEndIdxOfSearchedWords(finalText)
        wordsIdxs.reverse() // Starting from the end means we don't have to worry about the any idx changing

        // Highlight the words
        for (const wordIdx of wordsIdxs) {
            finalText = finalText.substring(0,wordIdx.start) +
                '<mark>' +
                finalText.substring(wordIdx.start,wordIdx.end) +
                '</mark>' +
                finalText.substring(wordIdx.end)
        }

        return finalText
    })

    const finalHtmlText = formattedSections.join('<br>')

    return finalHtmlText
}
