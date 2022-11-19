import { get } from './network.js'

export async function search(query) {
    const result = await get("search/" + query);

    if (!result.ok) {
        throw "Error!!!!"
    }
    return await result.json()
}
