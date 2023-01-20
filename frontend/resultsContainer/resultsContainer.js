import * as UI from './resultsContainer-ui.js'

export function initResultContainer(searchDiv) {
    let resultsDiv = searchDiv.getElementsByClassName(UI.CLASS_NAME)[0]
    if (resultsDiv == null) {
        resultsDiv = UI.addElements(searchDiv)
    }
    return resultsDiv
}
