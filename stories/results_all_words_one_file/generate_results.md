## Generate all results of one file
As a user
I want to be able to search for any word in a document
So that I can find any relevant results of my query

(no need to think about empty results)

### AC0
Refactor code so that it's easier for supporting next ACs
- getResult will not need to accept a specific word
- getResults will need to return a map of results, for now with just the first word in the file as a result
  - `{"the":{results: [{title: 'amazing page',path: 'page.json',numberOfMatches:1}]}}`
- we probably need to rename getResults, maybe generateResultMap
- the presenter will need to work trough the map and return a list of obejcts with filename and content of each file to be created, for now will just be a list of one file
  - input: `{"the":{results: [{title: 'amazing page',path: 'page.json',numberOfMatches:1}]}}`
  - output: `[{fileName:'the.json',content:'{"results": [{"title": "amazing page","path":"page.json","numberOfMatches":1}]}'}]`
- then index.js will just iterate over the list(with just one element) and create the file

### AC1
Gived I have a file with 10 words
When I generate the results for that file
I want a new result file for each different word
- now getResults(or generateResultMap) will go over each word of the file and create the map of results with all the words in the file
- the presenter then will need to be able to support many words in the map of results
- and the index.js will need to create one file for element in the list returned by the presenter

### AC2
Gived there are 2 occurrences of same words in a file
When I generate the results
I want that just one result file is generated for the word
And that the result will contain the correct numberOfMatches
