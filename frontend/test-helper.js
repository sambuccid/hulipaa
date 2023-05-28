export function findCallWithObjectWithProperty(mockObj,propertyName,propertyValue) {
    const matchingCalls = mockObj.calls.filter((parameters) => {
        const firstParameter = parameters[0]
        return firstParameter[propertyName] == propertyValue
    })
    if (matchingCalls.length > 1) {
        throw "Error in mocking object, multiple calls match query, possible that mock has not been reset"
    }
    return matchingCalls[0]
}