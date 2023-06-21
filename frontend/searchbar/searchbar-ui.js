import EL from '../EL.js'

export const CLASS_NAME = "sws_searchbar"

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
                        // TODO use CDN url
                        src: "../../frontend/images/glass_magnifier_icon.svg",
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