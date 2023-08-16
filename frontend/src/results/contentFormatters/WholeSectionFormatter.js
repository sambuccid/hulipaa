import {
    NEW_LINE_MATCHER_REGEX
} from '../../helpers.js'

const MAX_LENGHT = 150
export default class WholeSectionFormatter {
    execute(text,_searchedWords) {
        let result = text
        result = result.replace(NEW_LINE_MATCHER_REGEX," ")
        result = result.slice(0,MAX_LENGHT)
        return result
    }
}
