
export class NetworkError extends Error {
    constructor(message = "",...args) {
        super(message,...args);
    }
}

export async function get(path) {
    return await fetch(path);
}