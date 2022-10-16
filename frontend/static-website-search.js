window.addEventListener('DOMContentLoaded', () => {
    //mini library for support of creation of html elements
    const EL={
        input: function(options){
            return EL._createElement("input", options);
        },
        button: function(options){
            return EL._createElement("button", options);
        },
        img: function(options){
            return EL._createElement("img", options);
        },
        form: function(options){
            return EL._createElement("form", options)
        },
        _createElement: function(name, options){
            const element = document.createElement(name);

            if(options){
                const children = options.els;
                options.els = undefined;

                if(children){
                    children.forEach((child)=>{
                        element.appendChild(child);
                    })
                }

                for(const prop in options){
                    element[prop] = options[prop];
                }
            }
            return element;
        }
    }

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
        const textarea = EL.input()
        const form = EL.form({els:[
                textarea,
                EL.button({els:[
                    EL.img({
                        innerText: "Search",
                        src: "../frontend/images/glass_magnifier_icon.svg",
                        width: 30,
                        height: 30
                    })
                ]})
            ],
            onsubmit: function(event){
                event.preventDefault()
                onClickSearch(searchDiv, textarea)
                return false
            }
        });
        searchDiv.appendChild(form)
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
