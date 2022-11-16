import EL from '../EL.js'

export function addElements(searchDiv) {
    const resultsDiv = EL.div({
        className: "sws_results"
    });
    searchDiv.appendChild(resultsDiv)
    return resultsDiv
}