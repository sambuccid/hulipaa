import {
    normaliseAndLowecase,
    NEW_LINE_MATCHER_REGEX
} from '../../helpers.js'

import {
    highlightWords
} from './formatterHelpers.js'

const MAX_LENGHT = 150
export default class WholeSectionFormatter {
    execute(text,searchedWords) {
        const normalisedSearchedWords = searchedWords.map((word) => normaliseAndLowecase(word))
        const normalisedText = normaliseAndLowecase(text)

        return this.#execute(normalisedText,normalisedSearchedWords)
    }
    #execute(text,searchedWords) {
        let result = text
        result = result.replace(NEW_LINE_MATCHER_REGEX," ")
        result = result.slice(0,MAX_LENGHT)
        result = highlightWords(searchedWords,result)
        return result
    }
}