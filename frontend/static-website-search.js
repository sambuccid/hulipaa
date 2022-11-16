import * as SearchBar from './searchbar/searchbar-ui.js'
import * as ResultsContainer from './resultsContainer/resultsContainer-ui.js'

window.addEventListener('DOMContentLoaded', () => {
    //TODO sws_searchbar and sws_results needs to be a contsant
    const searchDivs = document.getElementsByClassName("sws_searchbar")
    
    for(let i=0; i<searchDivs.length; i++){
        loadSearchbar(searchDivs[i])
    }

    function loadSearchbar(searchDiv){
        SearchBar.addElements(searchDiv, {onSubmit: onClickSearch})
    }

    //TODO this needs to move in anotehr module, This is actual logic
    function onClickSearch(searchDiv, textarea){
        let resultsDiv = searchDiv.getElementsByClassName("sws_results")[0]
        if(resultsDiv == null){
            resultsDiv = ResultsContainer.addElements(searchDiv)
        }
        
        resultsDiv.textContent = textarea.value
    }



                    
    // function addSearchBarElements(searchDiv){
    //     const nodes = searchBarTemplate({
    //         onButtonClick: onClickSearch.bind(null, searchDiv, textarea)
    //     });
    //     nodes.forEach((node)=>{
    //         searchDiv.appendChild(node)
    //     });
    // }
    // function searchBarTemplate({onButtonClick}){
    //     let template = `
    //         <input></input>
    //         <button>
    //             <img src="../frontend/images/glass_magnifier_icon.svg" width="30" height="30">Search</img>
    //         </button>
    //     `;
    //     const nodes = parseHtml(template);
    //     const button = nodes[1];
    //     button.onclick = onButtonClick;
    //     return nodes;
    // }
    // function parseHtml(html){
    //     const template = document.createElement("template");
    //     template.innerHTML = html;
    //     const children = template.content.children;
    //     if(children.length<=0){
    //         return null;
    //     } else if(children.length==1){
    //         return children[0];
    //     } else {
    //         return children;
    //     }
    // }
});
