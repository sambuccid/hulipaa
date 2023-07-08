import EL from '../EL.js'
import glassMagnifierIcon from '../images/glass_magnifier_icon.svg'


export const CLASS_NAME = "hulipaa_searchbar"

export function addElements(searchDiv,{ onSubmit }) {
    const textarea = EL.input({ style: { 'flex-grow': "1",'min-width': '0px' } })
    const form = EL.form({
        style: { display: 'flex' },
        els: [
            textarea,
            EL.button({
                els: [
                    EL.img({
                        innerText: "Search",
                        src: glassMagnifierIcon,
                        width: 30,
                        height: 30
                    })
                ]
            })
        ],
        onsubmit: function (event) {
            event.preventDefault()
            onSubmit(textarea.value)
            return false
        }
    });
    searchDiv.appendChild(form)
    return { element: form }
}