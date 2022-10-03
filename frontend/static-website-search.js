window.addEventListener('DOMContentLoaded', () => {
    const searchDivs = document.getElementsByClassName("sws_searchbar")
    
    for(let i=0; i<searchDivs.length; i++){
        loadSearchbar(searchDivs[i])
    }

    function loadSearchbar(searchDiv){
        const textarea = document.createElement("input");

        searchDiv.appendChild(textarea)
        // result.classList.add("hiddenSong");
        // result.onclick=onOpenSong;

        // const title = document.createElement("h1");
        // const titleTxt = document.createTextNode(songTitle);
        // title.appendChild(titleTxt);
        // result.appendChild(title);
    }
});
