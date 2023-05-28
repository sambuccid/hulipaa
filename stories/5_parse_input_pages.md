## Parse input pages
As the creator of the website
I want to be able to define a way of parsing the input data
So that the content of the data can be used to generate the results

### AC1[done]
(Creator website)
Given the creator of the website creates a function that accepts the file content of the page and returns a json object with:
- Title: The title of the page that will be shown in the results
- Path: The path to the page to be able to load the content in the UI
- Text: A string with the content of the page where to search for the words
When they call the `buildIndex` function to start the generation of the results
And they pass in the function
Then the results will be generated correctly

### AC2
Change how the script is initialised in the UI, having an initialisation function instead of calling it when the document loads

### AC3
(Creator website)
Given the creator of the website creates a function that accepts the file content of the page and returns a json object with:
- Title: The title of the page that will be shown in the results
- Path: The path to the page to be able to load the content in the UI
- Text: A string with the content of the page where to search for the words
(Same function as previous AC)
When I call the SWS initialisation function in the UI and I pass the function i created
Then the UI should work as expected being able to use the function to get the text of the result
