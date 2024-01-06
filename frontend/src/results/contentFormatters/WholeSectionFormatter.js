import {
    normaliseAndLowecase,
    NEW_LINE_MATCHER_REGEX
} from '../../helpers.js'

import {
    cutTextAroundWords,
    getSectionWithMostNumberOfResultsUnprecise
} from './formatterHelpers.js'

const MAX_LENGHT = 150
export default class WholeSectionFormatter {
    execute(text,searchedWords) {
        const normalisedSearchedWords = searchedWords.map(normaliseAndLowecase)
        let result = text
        result = result.replace(NEW_LINE_MATCHER_REGEX," ")
        result = this.#extractSection(result,normalisedSearchedWords)
        result = result.trim()
        return result
    }

    #extractSection(text,searchedWords) {
        const normalisedText = normaliseAndLowecase(text)

        const { sectionStartIdx,sectionEndIdx } = getSectionWithMostNumberOfResultsUnprecise(normalisedText,searchedWords,MAX_LENGHT)

        let result = cutTextAroundWords({
            startIdx: sectionStartIdx,
            endIdx: sectionEndIdx,
            text: text
        })
        return result
    }
}
