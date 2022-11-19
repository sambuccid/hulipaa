//A generic module that contains all the things that don't have their own module yet
import { search } from './service.js'


export async function processSearch(query,resultContainer) {
    const res = await search(query);
    const firstResult = res.results[0]

    //create a div for the single result
    //  ResultsUI.addElements(title)
    resultContainer.textContent = query
}