import EL from '../EL.js'

export function addElements(div) {
    // const textarea = EL.input()
    // const form = EL.form({
    //     els: [
    //         textarea,
    //         EL.button({
    //             els: [
    //                 EL.img({
    //                     innerText: "Search",
    //                     src: "../frontend/images/glass_magnifier_icon.svg",
    //                     width: 30,
    //                     height: 30
    //                 })
    //             ]
    //         })
    //     ],
    //     onsubmit: function (event) {
    //         event.preventDefault()
    //         onSubmit(textarea.value)
    //         return false
    //     }
    // });
    // TODO call 
    const element = 'div'
    div.appendChild(element)
    return element
}