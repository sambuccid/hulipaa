/* File to contain functions that call the native browser functions
   This is to make it easier to mock these functions in the tests,
   and to provide a layer to not have code fully dependent directly on the browser
*/
export function assignUrl(newUrl) {
    window.location.assign(newUrl)
}