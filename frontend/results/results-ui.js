import EL from '../EL.js'

export function addElements(div) {

    /*
    <div><span>Title Page 1</span></div>
    
    .sws_searchbar{width: fit-content}*/
    const element = EL.div({
        els: [
            EL.span({
                innerText: "aaaa"
            })
        ],
        style: {
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            border: "gray solid 1px"
        }
    })
    div.appendChild(element)
    return element
}