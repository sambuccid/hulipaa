## Show Results

As a visitor of the website
I want to be able to see the results of my search
So that i can use them

### AC1 [done]
Given I am on the search page
When I enter and run the search for the hardcoded word
I want to see the results for that word
- also should be possible to style the hulipaa_searchbar element to decide how much space the searchbar is going to fill

### AC2 [done]
Given I searched for the hardcoded word
When I click on one of the results
I want to see the text where the result is
And I want the word i searched for to be highlighted

### AC3 [done]
Given I searched for the hardcoded word
And I click on one of the results
When I click again on the result
I want the result to collapse
And clicking again will show the content again(the cnntent not duplicated)

### AC4 [done]
Given I searched for the hardcoded word
When I search for it again
I want to see just the new results and the old result should disappear

### AC5 [done]
Given the network is not working
When I run a search
I want to be informed that something gone wrong
And the page to still work

### AC5.1 [done]
When I search for a word that doesn't exist
I want to be informed that there are no results
And the page to still work

### AC6 [done]
We want to be able to test the logic in the web application without needing to spin up a browser