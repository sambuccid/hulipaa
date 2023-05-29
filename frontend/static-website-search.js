import * as SearchBarUI from './searchbar/searchbar-ui.js'
import * as ResultsContainer from './resultsContainer/resultsContainer.js'
import { processSearch } from './general.js'

function SWS(options) {
    validateSWSOptions(options)
    const SWSOptions = { ...options }
    Object.freeze(SWSOptions);

    const searchDivs = document.getElementsByClassName(SearchBarUI.CLASS_NAME)

    for (let i = 0; i < searchDivs.length; i++) {
        loadSearchbar(searchDivs[i])
    }

    function loadSearchbar(searchDiv) {
        SearchBarUI.addElements(searchDiv,{ onSubmit: onSearch })

        function onSearch(query) {
            const resultContainer = ResultsContainer.initResultContainer(searchDiv)
            processSearch(query,resultContainer,SWSOptions)
        }
    }
}
function validateSWSOptions(options) {
    if (options.parsePage == null) {
        throw "The `parsePage` option is mandatory, a function to parse the content of a page"
    }
}

window['SWS'] = SWS