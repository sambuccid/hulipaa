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

[in progress]
AC2
Given I searched for the hardcoded word
When I click on one of the results
I want to see the text where the result is
And I want the word i searched for to be highlighted
Remaining:
- then limit the content to just the right lines
-- show 15 characters before searched word of current line
-- show 15 characters after searched word of current line
-- if in current line before or after there aren't 15 chars don't show lines before or after(for now)
-- show "..." Before or after cut out text
- decide if it looks alright, with long text or multiple short lines
- then highlight the right words(<mark>)

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