import {
    NEW_LINE_MATCHER_REGEX
} from '../../helpers.js'

import {
    cutTextAroundWords
} from './formatterHelpers.js'

const MAX_LENGHT = 150
export default class WholeSectionFormatter {
    execute(text,searchedWords) {
        let result = text
        result = result.replace(NEW_LINE_MATCHER_REGEX," ")
        result = this.#extractSection(result,searchedWords)
        return result
    }

    #extractSection(text,searchedWords) {
        const wordIndex = text.indexOf(searchedWords)

        let startSection = wordIndex - (MAX_LENGHT / 2)
        startSection = startSection > 0 ? startSection : 0

        const endSection = startSection + MAX_LENGHT

        let result = cutTextAroundWords({
            startIdx: startSection,
            endIdx: endSection,
            text: text
        })
        return result
    }
}
