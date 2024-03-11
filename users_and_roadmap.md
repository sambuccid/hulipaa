# Users
I'm a visitor and user of a static website, my main concerns around the library is the ability to search in the website and everything that is around that.  
I also mind how the UX of the fronted is and how easy it is to use.

I'm the creator of the website, my main concern is about how easy the library is to setup and customise.  
I need to be able to give my users the correct and specific results and to be able to integrate seamlessy the library in my website so that it doesn't look like an external component of the website.
I value
- semplicity of the library
- velocity to customise
- extensibility and customizability

# ~~MVP~~
The MVP version of the library.

## ~~user/tech stories for MVP~~
### ~~search bar~~

### ~~results for one word in one file~~
As a visitor of the website  
I want to be able to use the searchbar to see all the occurrences of a hardcoded word in aspecific page  
So that I can find where the word is

### ~~results for all words in one file~~
As a visitor of the website  
I want to be able to use the searchbar to see all the occurrences of any word in aspecific page  
So that I can find the topic I want

### ~~Open result~~
As a visitor of the website  
I want to be able to open the page that contains the result  
so that I view it

### ~~Parse input pages~~
As the creator of the website  
I want to be able to define a way of parsing the input data  
So that the content of the data can be used to generate the results

### ~~results for all words in all files~~
As a visitor of the website  
I want to be able to use the searchbar to see all the occurrences of any word in a list of pages  
So that I can find the topic I want

### ~~search multiple words~~
As a visitor of the website  
I want to be able to use the searchbar typing multiple words  
So that I can find more relevant results  
*(I want the results to be ordered by relevance)*

### ~~empty results~~
As a visitor of the website  
If I search for a word that is not present in the page  
I want the page to still work  
And have a message telling me that there were no results

### ~~fix tech debt~~
Address any tech debt that is left that needs to be fixed before releasing the library

# Version 0.2.0
This version of the library ensures the library can be used in a real life scenario and improves UI and Documentation.

## User stories

### ~~paginate results~~
As a visitor of the website  
When I search for a word that is contained in thousands of pages  
I want the results to be paginated  
So I can see the results more easily  
And The results page doesn't become too big

### ~~improve UI~~
As a visitor of the website  
I want the UI to be simple but nice

### ~~install library~~
As the creator of the website  
I want to be able to import the library in both the back-end and the front-end  
So that I can use it

### ~~improve documentation~~
As the creator of the website  
I want to have clear instruction about the library  
So that I can decide if to use it, and know how to use it

### ~~fix packages vulnerabilities~~
Check vulnerabilities from packages and use version of the packages that are not affected

### Fix big with file containing 2 words
Given a file contains a word exactly 2 times
When I'm searching for that word
I want to be able to see the preview of the file correctly

### Update demo website
Update demo website to use new verison of library
- Increase number of pages generated, try around 30000
  - And update all READMEs that mention it
- And add screenshot to readme and "Open website" section of tutorial
- Also create video/gif where we
  - add a page to demo website
  - run the generation of search results
  - start webserver (with generation of pages)
  - search for the word, or even multiple words
- Add the video/gif to the readme, right at the end of the Demo section

# Other versions
Other stories that still need to be prioritised and assigned to a version.

## User Stories

### pass data of page to generateLink function
As the creator of the website  
I want to receive the data of the page as a parameter of the generateLink function  
So that if I used the data to create the url of the page I can do the same generating the link  
Without having to load the file manually

### auto completition

### check we support Node 20
Check or add support for recent version of node

### possibility to pass in an array of paths of the pages to scan
So that it becomes more extensible and there is a way to use the library without having to accomodate many use cases where the pages are in sub-folders, in different folders etc.

### Tech debt
- remove inline css and specific code used just in dev environment
- code structure
- code linting(eslint, prettier)
- improve ci/cd pipeline
- script to copy Readme to sub-folders that generate npm package

### Get started page
Create a get started page.  
It should be way smaller that the full tutorial.  
And it should contain the fewest steps required to have the library working.

### fully integrated with 11ty(spike)
Need to see how much work would be needed to integrate it as a 11ty plugin.  
This involves it working with all the type of data(json, MD and so on) seamlessly.

### secure
Need to go through the code and check that everything is secure and doesn't expose private informations

### when showing results the code should escape html
If the pages are in html or contain html, we should not render it in the results

### Use regex to define link for each page
It is possible to use a regex and a substitution string to cover most scenarios to generate the link of a page.  
For now we just ask to pass a function to the library, but for most cases it might be overkill.  
We did a spike in the "open result" story(AC2) and we should have already all the necessary tools, there are also some examples of useful regexes in the story

### visually appealing
Need to provide the default configuration for the front end with a generic, neutral but visually appealing theme/style

### basic frontend configuration
It needs to be possible to configure basic style things on the front end like for example changing background and foreground colors

### Css customisation
As the website creator I want to be able to customise all the elements of the library  
So that the style of my search page is consistent with the rest of my website.
- Extract all css styles on their own css classes
- Document these CSS classes and how to customise them
- Add Customise section to Readme

### Validation of configuration
Try to validate all the parameters provided.  
Trying to spot any errors given by a configuration issue as early as possible.

### spell checking on the code
