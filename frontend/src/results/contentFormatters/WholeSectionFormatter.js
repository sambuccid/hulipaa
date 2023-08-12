import {
    NEW_NILE_MATCHER_REGEX
} from '../../helpers.js'

import {
    highlightWords
} from './formatterHelpers.js'

export default class WholeSectionFormatter {
    execute(text,searchedWords) {
        const result = highlightWords(searchedWords,text)
        return result.replace(NEW_NILE_MATCHER_REGEX," ")
    }
}