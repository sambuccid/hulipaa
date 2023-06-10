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



TODO in UI:
do not rely on results having always at least one object