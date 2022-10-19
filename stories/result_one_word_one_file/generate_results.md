## Generate results

As the programmer
I want to start by being able to generate the results for a specific word in a specific file
So that I can start flashing out the algorithm
  (the results will have the format of {results: [{title:"", path:"", numberOfMatches:0}])

[done]
AC1
Given I have a file
When I run the generate utility searching for an hardcoded word
A file gets generated in json

[done]
AC2
Given I have a file
When I run the generate utility searching for an hardcoded word
I get the file with the title of the page

[done]
**We need to start adding some tests around use case, parser and presenter**

[done]
AC3
Given I have a file
When I run the generate utility searching for an hardcoded word
I get the file with the path of the data of the page, reachable by the UI

AC4
Given I have a file
When I run the generate utility searching for an hardcoded word
I get the file with the number of occurrences of the word

AC5
The code needs to support easily changing the format of the song data
(
  maybe map it as a gateway
)

AC6
The tests should be easy to write
(
  maybe keep outside the file logic
  maybe follow the clean architecture pattern
)

AC7
The tests should be quick to run and not be flaky
(
  maybe keep outside the file logic
)