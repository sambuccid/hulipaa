# UI Manual Tests
This file has a list of the manual tests to run to check that the UI works correctly, they cover most of the feature, but some of the hidden features are not listed here, for a complete list of them read the user stories.

I decided that unit tests for the front end take too long to write and for a project this small don't really provide much value.
So instead we have this file wehere we have the tests to manually run to check that the UI works correctly.

## User story 1
- When opening the page there should be a searchbar
- The searchbar has a textbox where to enter text
- And there should be a button to actually search for the word
- Clicking on the button it should search for the entered word
- Hitting Enter when focused on the testbox it should search for the entered word

## User story 2/4
- The results of a search contain the title of the page
- Clicking on the section with the title of the page will open the page
- The results of a search has a section with an arrow pointing down that you can expand and that will have the preview of the page where the result is
- On the preview of the result the searched word should be highlited
- Clicking again on the section of the result that expands will collapse the section
- Clicking the search button twice will show just the last results
- Both sections of the result should make the mouse have a pointer icon to show that is possible to click them
- There should be errors shown when:
  - the network is not working
  - there is no result for the searched word
- The errors should be displayed without the expand section

## User story 3
- Having an accented letter in either the result file or the searchbar should let everything work as expected

## User story 5
- When loading the preview of the result, if the parse function is not valid or it throws an expection an error message will be shown

## User story 6
This is about having multiple results, searching for words repeated in multiple pages
- Multiple results are shown, each result expands and collapses independently and we can open them
- Searching for a word present more in one page than the other, check that the results are ordered based on the number of occurrences of the word in the page
- When there is an error with a result(due to 404 or parsing) just the single result should be affected and the other results should still be accessible

## User story 7
When the user searched for multiple words
- Results for all the words are shown
- Searching for words mentioned in all pages it will sort the results based on the number of total occurrences of all the words on each page