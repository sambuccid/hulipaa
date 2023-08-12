

// This returns the indexes of the maximum number found in a matrix 
// The matrix has lines and columns
// Each value in the matrix should be a positive integer
// eg. matrix[line][column] = 12
// If it doesn't find it, it returns [null,null]
export function findIndexOfMaxNumberInMatrix(matrix) {
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

export const NEW_NILE_MATCHER_REGEX = /\r?\n|\r|\n/g

export function findStartEndIdxOfSearchedWords(words,text) {
    let idxsWordsFound = words.map((word) => {
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

// !!THERE IS EXACLTY THE SAME FUNCTION IN BACK-END AND THEY NEED TO STAY THE SAME!!
export function splitTextInWords(text) {
    return [...text.matchAll(getRegexFindWholeWord())].flat()
}
export function matchWholeWord(text,word) {
    const regex = new RegExp(`(?<!${CHAR_PART_OF_WORD})${word}(?!${CHAR_PART_OF_WORD})`,'g')
    return [...text.matchAll(regex)]
}
function getRegexFindWholeWord() {
    return new RegExp(CHAR_PART_OF_WORD + '+','g')
}
function getRegexCharPartOfWord() {
    return new RegExp(CHAR_PART_OF_WORD)
}
const CHAR_PART_OF_WORD = '[A-Za-zÀ-ÖØ-öø-ÿ0-9\-_]'

export function findIndexOfWholeWord(word,text) {
    let wordIdx = -1
    let wordRightIdx = -1
    do {
        wordIdx = text.indexOf(word,wordIdx + 1)
        wordRightIdx = wordIdx + word.length
    } while (isIndexMidWord(wordIdx,text) || isIndexMidWord(wordRightIdx,text))

    return {
        start: wordIdx,
        end: wordRightIdx
    }
}

// !!THERE IS EXACLTY THE SAME FUNCTION IN BACK-END AND THEY NEED TO STAY THE SAME!!
export function normaliseAndLowecase(str) {
    return str.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,'')
}



export function isIndexMidWord(idx,text) {
    if (idx <= 0 || idx >= text.length) {
        return false
    }
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
    if (getRegexCharPartOfWord().test(char)) {
        return true
    }

    return false
}
