import EL from '../EL.js'

export function addElements(div) {

    /*
    <div><span>Title Page 1</span></div>
    
    div {
        background-color: white;
        border-radius: 10px;
        padding: 10px;
        text-align: center;
        border: gray solid 1px;
    }
    
    .sws_searchbar{width: fit-content}*/
    const element = EL.div()
    div.appendChild(element)
    return element
}