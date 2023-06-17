## Search Multiple Words
As a visitor of the website
I want to be able to use the searchbar typing multiple words
So that I can find more relevant results
(I want the results to be ordered by relevance)

### AC1[done]
Given I enter N words in the searchbox
When I search
I want to see the results for all the words

### AC2[done]
Given there is page1 that contains 2 occurrences of the word `test` and 1 occurrence of `halloumi`
And there is page2 that contains 1 occurrences of the word `test` and 3 of `halloumi`
When I search for `test halloumi`
I the results to be ordered by totla number of occurrences
So displaying the page2 result first and the the page1 result
Because the number of total occurrences in page2(1+3) was greater than then ones of page1(2+1)

### AC3[done]
Given I search for multiple words
When the results are displayed
I want that the same page is not repeated multiple times

### AC4[done]
Given I search for multiple words
And the results are loaded
When I expand 1 result
I want to have highlighted all the searched words
And I want to see the section where those words are present the most
