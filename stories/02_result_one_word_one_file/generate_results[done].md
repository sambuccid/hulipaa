## Generate results
As the programmer  
I want to start by being able to generate the results for a specific word in a specific file  
So that I can start flashing out the algorithm.

The results should have the format  
`{results: [{title:"", path:"", numberOfMatches:0}])`


### AC1 [**done**]
Given I have a file  
When I run the generate utility searching for an hardcoded word  
A file gets generated in json

### AC2 [**done**]
Given I have a file  
When I run the generate utility searching for an hardcoded word  
I get the file with the title of the page

[**done**]  
**We need to start adding some tests around use case, parser and presenter**

### AC3 [**done**]
Given I have a file  
When I run the generate utility searching for an hardcoded word  
I get the file with the path of the data of the page, reachable by the UI

### AC4 [**done**]
Given I have a file  
When I run the generate utility searching for an hardcoded word  
I get the file with the number of occurrences of the word

### AC5 [**done**]
The code needs to support easily changing the format of the song data

### AC6 [**done**]
The tests should be easy to write

### AC7 [**done**]
The tests should be quick to run and not be flaky
