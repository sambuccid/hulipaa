export function bindFunction(fun,...params) {
    return fun.bind(null,...params);
}