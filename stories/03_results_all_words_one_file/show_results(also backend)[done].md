## Show all results of one page
As a visitor of the website  
I want to be able to see the results of my search  
So that i can use them

### AC1 [**done**]
Investigate if it's possible to have end-to-end tests that cover both generation of results and search of them
##### What we would need:
- have e2e folder
- have input and output folders inside that
- start generate script for those
- have folder with frontend pages
- probably use pipeline service
- start website in background
- use cucumber or capybara to go through pages
##### Gains:
- we discover part of the integration issues between backend and frontend now instead of later
- we have tests that check some integration issues
##### Verdict:
I think the effort would be more that it's worth it, the main effort would be the setting-up/configuration part, configuring pipeline and setting up project with cucumber or capybara

### AC2 [**done**]
Given there is a page with a long word first and then a shorter word that is a sub-part of the longer word(... them ... the ...)  
And I have searched for the smaller word(the)  
When I click on a result of a page
I want to see highlighted the smaller word

### AC3 [**done**]
The search should be case insensitive and without accents
- the results will need to get generated all lower case and without accents
- the search transforms letters to lower case and without accents before searching
- when the user clicks on a result, the code transfrom the found text and the searched word before comparing them so it highlights the correct word