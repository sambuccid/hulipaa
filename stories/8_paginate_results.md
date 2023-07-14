## Paginate Results
As a visitor of the website
When I search for a word that is contained in thousands of pages
I want the results to be paginated
So I can see the results more easily
And The results page doesn't become too big

### AC1[done]
Given the word I search for is contained in more than 15 pages
When I search for the word
Then no more than 15 results are displayed
And at the end of the page there are buttons to move to a different page

### AC2[done]
Given I search for a word contained in more than 15 pages
And some pagination buttons are shown
When I click on one of the buttons
Then the results are updated showing the results for that page

### AC3
When I search for a word contained in more than 15 pages
Then the pagination button for the first page should be highlighted
And changing page should highlight the other buttons
And just one button can be highlighted at any point

### AC4
When I search for a word contained in more than 15 pages
Then it shouldn't be possible to click on the pagination button for the current page

### AC5
Given the word I search for is contained in less than 15 pages
When I search for the word
Then there aren't any pagination buttons

### AC6
Given the word I search for is contained in more than 15 pages
When I search for the word
Then there is a next-page-button shown
And clicking on it will open the next page of results
And the button will be hidden if we are in the last page

### AC7
Given the word I search for is contained in more than 15 pages
When I search for the word
And move to another page
Then there is a previous-page-button shown
And clicking on it will open the previous page of results
And the button will be hidden if we are in the first page

### AC8
Given the word I search for is contained in more than 15 pages
And I search for the word
When the pagination buttons are displayed
I want that them to have a clean look and feel
- There is a potentially unlimited number of paginations, so the buttons should be relatively small
  - should look good with 2 pages, 4 pages as well as 10 pages)

