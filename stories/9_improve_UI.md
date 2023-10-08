## Improve UI
As a visitor of the website
I want the UI to be simple but nice

### AC1[done]
Load each result already prepopulated
- The code attached to expanding the results can be kept, there is an AC to clean it up

### AC2[done]
Remove the background and the border, there should be the title at the top and under it the result

### AC3[done]
Adapt how "No Results" and "Error" messages are shown

### AC4[in progress]
Change how to show the content of a result, to show a consecutive part of the page
- and maybe a bit more amount text than what it is now
- and remove the ... at the start and end of the shown content
(Happening in WholeSectionFormatter.spec.js with TDD)

### AC5
Change the font size for the title and the content, probably is the content that should be a bit smaller
Also put the title in a header element, but it shouldn't be a too big font

### AC6
Check if might be worth having some different colors for the text
Uaually the title is blue but we can try different things

### AC7
Try different fonts for the title of the page and the result content

### AC8
Redesign the size and font of "No Results" and "Error" messages
- We might want at some point to write longer and more useful error messages, suggesting what to do to the user
- So maybe a smaller font might be better

### AC9
Change the color of the highlight to make it less strong on the eye

### AC10
Redesign the background and text color of the "No Results" and "Error" messages

### AC11
Do we need some different style for the mobile?
- maybe just background and shadow to make each result look like a card)

### AC12
Find a better way of showing the single result errors (parse page and loading result)
- The website user should understand the error more or less
- The website creator should spot that there has been an error with that page
- Maybe the user should still be able to try and open the page
- Perhaps we can show the result in the normal way, but instead of the result content we show the error message, making it clear that it is an error message

### AC13
Remove any code related to expanding the results
- As part of that remove all references to `expandDiv` and instead use `resultContentDiv`