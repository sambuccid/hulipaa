import EL from '../EL.js'

export const CLASS_NAME = "sws_searchbar"

export function addElements(searchDiv, { onSubmit }) {
    //const textarea = EL.input({style: {width: "auto"}})
    const textarea = EL.input();
    const form = EL.form({
        els: [
            textarea,
            EL.button({
                els: [
                    EL.img({
                        innerText: "Search",
                        src: "../frontend/images/glass_magnifier_icon.svg",
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
    return form
}