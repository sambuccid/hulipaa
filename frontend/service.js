import { get,NetworkError } from './network.js'

export async function search(query) {
    const result = await get("/search/" + query + ".json");
    // const result = await get("../.output/big-index.json");

    if (result.status === 404) {
        return { results: [] }
    }

    if (!result.ok) {
        throw new NetworkError("Call has returned failure error code")
    }
    return await result.json()
    //return {results:[{title: "aaaaaaa"}]}
}

export async function loadResult(resultPath) {
    const result = await get("/" + resultPath);

    if (result.status === 404) {
        return null
    }

    if (!result.ok) {
        throw new NetworkError("Call has returned failure error code")
    }
    return await result.text()
}
