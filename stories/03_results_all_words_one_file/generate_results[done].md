## Generate all results of one file
As a user  
I want to be able to search for any word in a document  
So that I can find any relevant results of my query

In this story we don't need to think about empty results

### AC0 [**done**]
Refactor code so that it's easier for supporting next ACs

### AC1 [**done**]
Gived I have a file with 10 words  
When I generate the results for that file  
I want a new result file for each different word

### AC2 [**done**]
Given there are 2 occurrences of same words in a file  
When I generate the results  
I want that just one result file is generated for the word  
And that the result will contain the correct numberOfMatches
