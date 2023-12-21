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

### AC4[done]
Change how to show the content of a result, to show a consecutive part of the page
- and maybe a bit more amount text than what it is now
- and remove the ... at the start and end of the shown content

### AC5[done]
Change the font size for the title and the content, probably is the content that should be a bit smaller
Also put the title in a header element, but it shouldn't be a too big font
- It seems that it might create issues as it adds a lot of decorations on the text

### AC6[done]
Remove any code related to expanding the results
This also means making sure the result text is selectable with the mouse
(At the moment is not because it's inside a button)

### AC7[done]
Check if might be worth having some different colors for the text
Uaually the title is blue but we can try different things
- I think color is too much dependent on the background of the page, so keeping it black is best

### AC8[done]
Try different fonts for the title of the page and the result content

### AC9[done]
Redesign the size and font of "No Results" and "Error" messages

### AC10[done]
Change the color of the highlight to make it less strong on the eye
- it has been removed completely in previous ACs

### AC11[done]
Redesign the background and text color of the "No Results" and "Error" messages
- I think it's more accessible, clean and customisable to keep it black text over white background, as it is now

### AC12
Do we need some different style for the mobile?
- maybe just background and shadow to make each result look like a card

### AC13[done]
Maybe add back the underline on the title when the mouse hovers, seems that many search engines do that and it's definitively clearer that the element is clickable

### AC14
Find a better way of showing the single result errors (parse page and loading result)
- The website user should understand the error more or less
- The website creator should spot that there has been an error with that page
- Maybe the user should still be able to try and open the page
- Perhaps we can show the result in the normal way, but instead of the result content we show the error message, making it clear that it is an error message

TODO check that the generated bundle has all the correct fonts and css applied
- added css for overall font of page(helvetica)
- added css for title of results(verdana) and underline on mouse hover