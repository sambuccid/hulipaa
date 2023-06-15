## results for all words in all files
As a visitor of the website
I want to be able to use the searchbar to see all the occurrences of any word in a list of pages
So that I can find the topic I want

### Generate Results
As the programmer
I need the backend to generate the results for all the pages
So that then frontend can then use them

#### AC1[done]
Given there are 2 files
When I generate the results
Then all the words in both files should be generated as results

#### AC2[done]
Given there are 2 files
And some files contain the same words
When I generate the results
Then the results for the word contained in multiple files should contain 2 result objects under the `results` array in json
And the number of the occurrences for each result object should be correct


### Show Results
As a visitor of the website
I want to be able to see the results of my search
So that i can use them

#### AC1[done]
Given there are multiple pages with the same word
And I am on the search page
When I search for the word
I want to see multiple results, one for each page
And it should be possible to expand each result independently
And it should be possible to open each page

#### AC2[done]
Given there are multiple pages with the same word
And one of the pages contain that word more times that the other
When I am on the search page and search for the word
And the results are shown
I want that the page with more occurrences is shown first

#### AC3[done]
Given there are multiple pages with the same word
And I am on the search page
When I search for the word
I want the results to be clearly separated from one another

#### AC4[done]
Given there are multiple pages with the same word
And I am on the search page
When I search for the word
And I click on a result of a page that can't be found(404)
I want to still be able to access all other results without running the search again

TODO in UI:
do not rely on results having always at least one object
investigate problem with "this" word
