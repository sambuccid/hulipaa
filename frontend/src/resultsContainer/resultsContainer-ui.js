import EL from '../EL.js'

export const CLASS_NAME = "hulipaa_results"

export function addElements(searchDiv) {
    const resultsDiv = EL.div({
        className: CLASS_NAME
    });
    searchDiv.appendChild(resultsDiv)
    return { element: resultsDiv }
}