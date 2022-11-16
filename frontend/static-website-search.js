import * as SearchBarUI from './searchbar/searchbar-ui.js'
import * as ResultsContainer from './resultsContainer/resultsContainer.js'

window.addEventListener('DOMContentLoaded',() => {
    const searchDivs = document.getElementsByClassName(SearchBarUI.CLASS_NAME)

    for (let i = 0; i < searchDivs.length; i++) {
        loadSearchbar(searchDivs[i])
    }

    function loadSearchbar(searchDiv) {
        SearchBarUI.addElements(searchDiv,{ onSubmit: onSearch })

        function onSearch(query) {
            const resultContainer = ResultsContainer.initResultContainer(searchDiv)
            processSearch(query, resultContainer)
        }
    }

    // TODO all functions under this comment don't have yet their own module but they need to be sorted out at some point
    function processSearch(query, resultContainer){
        resultContainer.textContent = query
    }
});