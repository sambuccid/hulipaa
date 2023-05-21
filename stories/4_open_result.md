## Open result
As a visitor of the website
I want to be able to open the page that contains the result
so that I view it

As the creator of the website
I need to be able to specify where each result should link to
So that the visitor can open the correct page

### AC1 [done]
(Creator website)
Given I have a function that given the path of the file with the page returns the relative uri of the page where the user needs to be redirected
When I call the `buildIndex` function to start the generation of the results
And I pass in my uri generation function
Then the generated results will contain the `link` property that is associated with the page

### AC2[done]
Spike to investigate how difficult would be to use a regex or a substitution language to specify the uri given the path of the page's file
#### Verdict
It should be fairly easy to implement
The replace function on a string is already very powerful when used with regular expressions.
We could have a passed in regular expression alongside a replacement string, and they would be called on the full path(path+fileName) of the page
for example:
```
full path: ".input/folder1/page.json"
substitution regex: /(.*)\/(.*)\.(.*)/
substitution string: "$1/generated/$2.html"
result: ".input/folder1/generated/page.html"
```

### AC3[done]
Given the visitor search for a string
When it gets some results
Then the results will look similar to the `result_ux.png` file
And they will have:
- A main section that will take most of the space with the name of the page
- A smaller bottom section of the result with a different colour that will contain an arrow pointing down

### AC4[done]
Given the visitor search for a string
And it gets some results
And the results will have 2 sections
When the user clicks on the smaller bottom section
Then the section will expand with an animation downwards showing the content of the page with the highlighted content, as already described in previous user stories

### AC5[done]
Given the visitor search for a string
And it gets some results
And the results will have 2 sections
When the user clicks on the main top section
Then it will be redirected to the page using the `link` property of the result

### AC6
Ensure error messages are not shown with the expand div
this should also fix some of the failing unit tests

### AC7
(Spike/Story timeboxed)
Given the visitor search for a string
And it gets some results
And the results will have 2 sections
When the user hovers with the mouse on either of the 2 sections
Then the color of the sections will have a quick animation showing a slightly brighter colour
