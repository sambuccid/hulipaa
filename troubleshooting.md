# Troubleshooting
If you got any problems trying to use the library this page will help finding the cause and fixing it.

If you can't find your error here or you need to see an example on how to configure the library, try following the official [tutorial](tutorial.md).  
You can also create a new issue on github.

## Error messages
This section contains some common error messages you might experience when the library is not configured correctly.

### Generating the search results
The common errors that might happen when you try to generate the search results.

#### Invalid parameters
These errors happen when the library is called with wrong parameters.  
Below there is a list of some common error messages that appear in these occasions.

* `The "path" argument must be of type string or an instance of Buffer or URL`  
  This means that you didn't specify a correct value for the `inputFolder` or `outputFolder` properties.  
  Remember that Hulipaa needs to be called passing an object containing also these 2 properties.  
  Remember also that these properties are need to be valid paths to directories.
* `parseData is not a function`  
  This means that you didn't specify a correct value for the `parseData` property.  
  Remember that Hulipaa needs to be called passing an object containing also this property.  
  This property needs to be a function. An example of the function can be found in the [tutorial](tutorial.md) page.
* `generateLink is not a function`  
  This means that you didn't specify a correct value for the `generateLink` property.  
  Remember that Hulipaa needs to be called passing an object containing also this property.  
  This property needs to be a function. An example of the function can be found in the [tutorial](tutorial.md) page.
* `Cannot read properties of undefined (reading 'title')`  
  This happens when the `parseData` property specified is not returning any value.  
  An example of the function can be found in the [tutorial](tutorial.md) page.
* `Input data is missing title`  
  This happens when the `parseData` property specified is not returning a `title` property in the returning object.  
  Remember that the title cannot be an empty string.  
  An example of the function can be found in the [tutorial](tutorial.md) page.
* `Input data is missing path`  
  This happens when the `parseData` property specified is not returning a `path` property in the returning object.  
  Remember that the `path` cannot be an empty string.  
  An example of the function can be found in the [tutorial](tutorial.md) page.
* `Input data is missing text`  
  This happens when the `parseData` property specified is not returning a `text` property in the returning object.  
  Remember that the `text` cannot be an empty string.  
  An example of the function can be found in the [tutorial](tutorial.md) page.

### Using the library in the search page
The common errors that might happen when you try to use the library in the search page.  
These errors happen when you load the page after you configured the library.

#### No library
If there is an error message saying `Hulipaa is not defined` then your javascript code couldn't find the library.  
First double check that you included the library in your search page.  
Also remember that the library needs to be called after the page has initialised, this is usually achieved by having your code run when the `DOMContentLoaded` event is fired.  
If your code runs before this, there is a chance that the code of the library hasn't yet been initialised by the browser.

#### Invalid parameters
These errors happen when the library is used with wrong parameters.  
Below there is a list of some common error messages that appear in these occasions.

* `options is undefined`  
  This happens when the library is called without any parameters.  
* ``The `parsePage` property is mandatory``  
  This happens when the library is called without passing the `parsePage` property.  
  This might also happen if the parameter passed to `Hulipaa` is not an object.  
  Remember that you need to pass an object to the function.
* ``The `resultsPath` property is mandatory``  
  This happens when the library is called without passing the `resultsPath` property.  
  Have a look to the [tutorial](tutorial.md) page to know what value it should have.

## Errors in the search results
Sometimes, if `Hulipaa` is not configured correctly, when you try to search for a word, some or all the results might show as red and show an error message.  
In this section we see common mistakes that might create these errors.

### No search bar
If you configured everything but when you open the search page there is no search bar there might be some issue with your code.  
Remember to check for error messages in the web console and look for these error messages in the section above.

However if there is no error message in the console, you'll need to double check that you have a `div` element with the css class `hulipaa_searchbar`.  
The library will load one search bar for each html element that meets this criteria, so if there isn't any it will not show any search bar.

### No results
The page never showing any search results might be down to many different problems.  
We recommend checking first if the results are generated correctly, in order to pin down exactly where the issue might be occurring.

#### resultsPath
A common mistake that creates this issue is specifying the wrong path in the `resultsPath` property when calling `Hulipaa` in the search page.  
Remember that this property should point to the folder where the generated results are stored.  
This folder should be reachable directly from the browser, this means that the web server you are using needs to serve this folder and all the files inside it.  
We also encourage you to use an absolute path in this property, otherwise it might be difficult to navigate up and down the file tree to find the folder.

### Parsing issues
The error shown when there is an issue parsing a page is: 
`We had an issue showing this result, but you can try to open it instead.`  
This error is directly connected to the `parsePage` property configured when you call the library in the search page.  
We suggest checking these common mistakes that might cause this issue.

#### Returning object
The `parsePage` function needs to return an object, and the object needs to contain a property called `text`. Have a look to the [tutorial](tutorial.md) page for an example of this function.

#### Exception
If the `parsePage` function throws an exception `Hulipaa` will show this error.  
We recommend checking the code to see if there is anything that might be throwing an exception.

### Loading page issues
This error might appear on some or all the search results: `We had an issue finding the page, but you can try to open it instead.`  

#### Web server configuration
Remember that your web server needs to serve all the data pages before they are converted in html because `Hulipaa` uses them to generate a preview of each search result.  
If the web server is not configured this way this error will show up.

#### Wrong path property
Another issue might be with the generation of the results.  
In this case the error is connected to the `parseData` property that is passed to generate the results.  
This function needs to return an object containing some properties including `path`.  
If this property is incorrect it will result in this issue.  
Some common mistakes to check are:
* **Absolute path**: This property needs to contain an absolute path, because it's used in the browser to load the data of a page.
* **Sub-paths in url**: Remember that the path is used to create the url of the data of a page. If your web server is configured to deploy everything under a sub-path you'll need to include it in this property.
* **Wrong type of page**: This property needs to point to the source data of the page and not the final html page. This file is the one that is later on parsed by the `parsePage` function.