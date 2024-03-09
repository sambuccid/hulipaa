import * as SearchBarUI from './searchbar/searchbar-ui.js'
import * as ResultsContainer from './resultsContainer/resultsContainer.js'
import * as PaginateButtonsContainer from './paginate/paginateButtonsContainer.js'
import { processSearch } from './search.js'

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
            const paginateButtonsContainer = PaginateButtonsContainer.initContainer(searchDiv)

            processSearch(query,resultContainer,paginateButtonsContainer,HulipaaOpt)
        }
    }
}
function validateHulipaaOpt(options) {
    if (options.parsePage == null) {
        throw "The `parsePage` property is mandatory"
    }
    if (options.resultsPath == null) {
        throw "The `resultsPath` property is mandatory"
    }
}

window['Hulipaa'] = Hulipaa