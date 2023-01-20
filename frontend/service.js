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
