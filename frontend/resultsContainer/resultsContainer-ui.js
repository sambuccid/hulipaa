import EL from '../EL.js'

export const CLASS_NAME = "sws_results"

export function addElements(searchDiv) {
    const resultsDiv = EL.div({
        className: "sws_results"
    });
    searchDiv.appendChild(resultsDiv)
    return resultsDiv
}