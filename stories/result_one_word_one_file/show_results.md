## Show Results

As a visitor of the website
I want to be able to see the results of my search
So that i can use them

[done]
AC1
Given I am on the search page
When I enter and run the search for the hardcoded word
I want to see the results for that word
- also should be possible to style the sws_searchbar element to decide how much space the searchbar is going to fill

[done]
AC2
Given I searched for the hardcoded word
When I click on one of the results
I want to see the text where the result is
And I want the word i searched for to be highlighted

[done]
AC3
Given I searched for the hardcoded word
And I click on one of the results
When I click again on the result
I want the result to collapse
And clicking again will show the content again(the cnntent not duplicated)


AC5
Given I searched for the hardcoded word
When I search for it again
I want to see just the new results and the old result should disappear

AC6
Given the network is not working
When I run a search
I want to be informed that something gone wrong
And the page to still work

[in progress]
AC7
We want to be able to test the logic in the web application without needing to spin up a browser