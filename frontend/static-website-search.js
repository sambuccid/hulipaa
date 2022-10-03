window.addEventListener('DOMContentLoaded', () => {
    const searchDivs = document.getElementsByClassName("sws_searchbar")
    
    for(let i=0; i<searchDivs.length; i++){
        loadSearchbar(searchDivs[i])
    }

    function loadSearchbar(searchDiv){
        addSearchBarElements(searchDiv)

    }

    function onClickSearch(searchDiv, textarea){
        let resultsDiv = searchDiv.getElementsByClassName("sws_results")[0]
        if(resultsDiv == null){
            resultsDiv = document.createElement("div");
            resultsDiv.className = "sws_results"
            searchDiv.appendChild(resultsDiv)
        }
        
        resultsDiv.textContent = textarea.value
    }

    function addSearchBarElements(searchDiv){
        const textarea = document.createElement("input");
        
        const button = document.createElement("button");
        button.onclick = onClickSearch.bind(null, searchDiv, textarea)

        const searchImg = document.createElement("img")
        searchImg.innerText = "Search"
        searchImg.src = "../frontend/images/glass_magnifier_icon.svg"
        searchImg.width = 30
        searchImg.height = 30

        button.appendChild(searchImg)

        searchDiv.appendChild(textarea)
        searchDiv.appendChild(button)
    }
});
