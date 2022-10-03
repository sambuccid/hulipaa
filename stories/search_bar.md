### search bar
As the creator of the website
I want to be able to place the searchbar in my website
So that the user can see it

### ACs
[Done]
In order to use the searchbar I should add a html tag like `<div class="sws_searchbar" />`

[Done]
Given I added a searchbar successfully
When I open the page
Then the searchbar should be visible
And it should be where I placed it

The searchbar should have a textbox where to enter text
The searchbar should have a button at the right of the textbox
The search button should have a search icon

Given I added some text in the textbox
When I click the search button
Then placed under the textbox there should be a section for the results
And a message of successfull execution should be displayed (temporarily used as placeholder for real results)

Given I added some text in the textbox
And I still have the html focus on the textbox
When I press enter
Then placed under the textbox there should be a section for the results
And a message of successfull execution should be displayed (temporarily used as placeholder for real results)