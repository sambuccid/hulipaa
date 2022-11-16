import * as SearchBarUI from './searchbar/searchbar-ui.js'
import * as ResultsContainer from './resultsContainer/resultsContainer.js'
import { processSearch } from './general.js'

window.addEventListener('DOMContentLoaded',() => {
    const searchDivs = document.getElementsByClassName(SearchBarUI.CLASS_NAME)

    for (let i = 0; i < searchDivs.length; i++) {
        loadSearchbar(searchDivs[i])
    }

    function loadSearchbar(searchDiv) {
        SearchBarUI.addElements(searchDiv,{ onSubmit: onSearch })

        function onSearch(query) {
            const resultContainer = ResultsContainer.initResultContainer(searchDiv)
            processSearch(query,resultContainer)
        }
    }

});