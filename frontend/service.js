import { get } from './network.js'

export async function search(query) {
    const result = await get("/search/" + query + ".json");
    // const result = await get("../.output/big-index.json");

    if (!result.ok) {
        throw "Error!!!!"
    }
    return await result.json()
    //return {results:[{title: "aaaaaaa"}]}
}

export async function loadResult(resultPath) {
    const result = await get("/" + resultPath);

    if (!result.ok) {
        throw "Error!!!!"
    }
    return await result.json()
    //return {
    // "title": "test title",
    // "path": "testpath.json",
    // "text": "content of the page"
    // };
}
