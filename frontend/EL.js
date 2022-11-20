//mini library for support of creation of html elements
const EL = {
    input: function (options) {
        return EL._createElement("input",options);
    },
    button: function (options) {
        return EL._createElement("button",options);
    },
    img: function (options) {
        return EL._createElement("img",options);
    },
    form: function (options) {
        return EL._createElement("form",options)
    },
    div: function (options) {
        return EL._createElement("div",options)
    },
    span: function (options) {
        return EL._createElement("span",options);
    },
    _createElement: function (name,options) {
        const element = document.createElement(name);

        if (options) {
            const children = options.els;
            options.els = undefined;

            if (children) {
                children.forEach((child) => {
                    element.appendChild(child);
                })
            }

            for (const prop in options) {
                element[prop] = options[prop];
            }
        }
        return element;
    }
}

export default EL;