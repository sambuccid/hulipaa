# UI Manual Tests
This file has a list of the manual tests to run to check that the UI works correctly, they cover most of the feature, but some of the hidden features are not listed here, for a complete list of them read the user stories.

## User story 1
- When opening the page there should be a searchbar
- The searchbar has a textbox where to enter text
- And there should be a button to actually search for the word
- Clicking on the button it should search for the entered word
- Hitting Enter when focused on the testbox it should search for the entered word

## User story 2/4/9
- The results of a search contain the title and a preview of the page
- Clicking on the section with the title of the page will open the page
- Clicking the search button twice will show just the last results  
  avoding any duplication of them
- The title of the result should make the mouse have a pointer icon to show that it's possible to click it
- When the mouse ison the title of the result, the title should be undrelined
- It should be possible with the mouse to select the text in the result preview
- There should be errors shown when:
  - the network is not working
  - there is no result for the searched word
- When the website is opened on a device with a small screen, the results are shown with a "card" effect

## User story 3
- Having an accented letter in either the result file or the searchbar should let everything work as expected

## User story 5/9
- When loading the preview of the result, if the parse function is not valid or it throws an expection an error message will be shown
  - These errors are shown just for that specific result
  - These errors should be shown with a slightly red background
  - These errors integrate well with the "card" effect when a small device uses the website

## User story 6
This is about having multiple results, searching for words repeated in multiple pages
- Multiple results are shown
- Searching for a word present more in one page than the other, check that the results are ordered based on the number of occurrences of the word in the page
- When there is an error with a result(due to 404 or parsing) just the single result should be affected and the other results should still be accessible

## User story 7
When the user searched for multiple words
- Results for all the words are shown
- Searching for words mentioned in all pages it will sort the results based on the number of total occurrences of all the words on each page

## User story 8
When results are more than 15
- results are limited to 15
- there are pagination buttons to navigate through the list of results
- the highlighted button represent the current loaded page
- clicking on a pagination button it shows the results for that page
- can't click on the pagination button for the current page
- when an error occurs the pagination buttons are not displayed
- pagination buttons are not shown when there is just one page needed
- next page button shown, it works and is hidden if we are in the last page
- previous page button shown, it works and is hidden if we are in the first page

## Others
When there is a page that contains 2 search bars, they still work fine and independently from each other
