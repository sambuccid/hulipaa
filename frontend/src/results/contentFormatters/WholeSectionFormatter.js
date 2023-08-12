import {
    NEW_NILE_MATCHER_REGEX
} from '../../helpers.js'

export default class WholeSectionFormatter {
    execute(text) {

        return text.replace(NEW_NILE_MATCHER_REGEX,"<br>")
    }
}