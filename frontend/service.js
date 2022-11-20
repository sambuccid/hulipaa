import { get } from './network.js'

export async function search(query) {
    //TODO always reference root url(instead of relative path)
    const result = await get("search/" + query);
    // const result = await get("../.output/big-index.json");

    if (!result.ok) {
        throw "Error!!!!"
    }
    return await result.json()
}
