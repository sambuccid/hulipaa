import * as SearchBarUI from './searchbar/searchbar-ui.js'
import * as ResultsContainer from './resultsContainer/resultsContainer.js'
import { processSearch } from './general.js'

export const CDN_URL = '/frontend'
function Hulipaa(options) {
    validateHulipaaOpt(options)
    const HulipaaOpt = { ...options }
    Object.freeze(HulipaaOpt);

    const searchDivs = document.getElementsByClassName(SearchBarUI.CLASS_NAME)

    for (let i = 0; i < searchDivs.length; i++) {
        loadSearchbar(searchDivs[i])
    }

    function loadSearchbar(searchDiv) {
        SearchBarUI.addElements(searchDiv,{ onSubmit: onSearch })

        function onSearch(query) {
            const resultContainer = ResultsContainer.initResultContainer(searchDiv)
            processSearch(query,resultContainer,HulipaaOpt)
        }
    }
}
function validateHulipaaOpt(options) {
    if (options.parsePage == null) {
        throw "The `parsePage` option is mandatory, a function to parse the content of a page"
    }
}

window['Hulipaa'] = Hulipaa