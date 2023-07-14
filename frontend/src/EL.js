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
        return EL._createElement("span",options)
    },
    a: function (options) {
        return EL._createElement('a',options)
    },
    _createElement: function (name,options) {
        const element = document.createElement(name);

        if (options) {
            // Extract special values from options
            const children = options.els
            delete options.els
            const style = options.style
            delete options.style
            const dataset = options.dataset
            delete options.dataset


            if (children) {
                children.forEach((child) => {
                    element.appendChild(child);
                })
            }

            for (const prop in options) {
                element[prop] = options[prop];
            }

            for (const datasetProp in dataset) {
                element.dataset[datasetProp] = dataset[datasetProp];
            }

            for (const styleProp in style) {
                element.style[styleProp] = style[styleProp];
            }
        }
        return element;
    }
}

export default EL;