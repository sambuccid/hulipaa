//A generic module that contains all the things that don't have their own module yet
import * as Service from './service.js'

export function processSearch(query,resultContainer) {
    //find results
    // Service.search(query)

    //create a div for the single result
    //  ResultsUI.addElements(title)
    resultContainer.textContent = query
}