## Parse input pages
As the creator of the website  
I want to be able to define a way of parsing the input data  
So that the content of the data can be used to generate the results

### AC1 [**done**]
Given the creator of the website creates a function that accepts the file content of the page and returns a json object with:  
- Title: The title of the page that will be shown in the results
- Path: The path to the page to be able to load the content in the UI
- Text: A string with the content of the page where to search for the words

When they call the library's function to start the generation of the results  
And they pass in the function  
Then the results will be generated correctly

### AC2 [**done**]
Change how the script is initialised in the UI, having an initialisation function instead of calling it when the document loads

### AC3[**done**]
Given the creator of the website creates a function that accepts the file content of the page and returns a json object with:  
*(Similar function as previous AC)* 
- Text: A string with the content of the page where to search for the words  
 
When they call the Hulipaa initialisation function in the UI and pass the function created    
Then the UI should work as expected being able to use the function to get the text of the result

### AC4 [**done**]
Given the creator of the website creates a function that accepts the file content of the page and tries to return the details of the page  
And they call the Hulipaa initialisation function in the UI and pass the function created  
When they expand the result in the UI, if there is an error in the function  
Then the UI should show the error and should keep working

### AC5 [**done**]
Given the creator of the website doesn't create a function to parse the data  
When they call the Hulipaa initialisation function in the UI  
Then an expection will be thrown specifying the the `parsePage` option is mandatory