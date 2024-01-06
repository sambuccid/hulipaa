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

#### ~~generate results~~
#### ~~show results~~

### ~~results for all words in one file~~
As a visitor of the website
I want to be able to use the searchbar to see all the occurrences of any word in aspecific page
So that I can find the topic I want

#### ~~generate results~~

#### ~~show results~~


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

#### ~~generate results~~

#### ~~show results~~


### ~~search multiple words~~
As a visitor of the website
I want to be able to use the searchbar typing multiple words
So that I can find more relevant results
(I want the results to be ordered by relevance)

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

### install library
As the creator of the website
I want to be able to import the library in both the back-end and the front-end
So that I can use it

### improve documentation
As the creator of the website
I want to have clear instruction about the library
So that I can decide if to use it, and know how to use it
- also fix the formatting of markdowns, by adding to emtpy spaces at the end of the line to force a linebreak
- add section where to explain common errors
  - including the errors the are shown in the results themselfes and how to fix them

### fix packages vulnerabilities
Check vulnerabilities from packages and use version of the packages that are not affected

# Other versions
Other stories that still need to be prioritised and assigned to a version.

## User Stories

### auto completition

### possibility to pass in an array of paths of the pages to scan
So that it becomes more extensible and there is a way to use the library without having to accomodate many use cases where the pages are in sub-folders, in different folders etc.

### Tech debt
- remove inline css and specific code used just in dev environment
- code structure
- code linting(eslint, prettier)
- improve ci/cd pipeline

### fully integrated with 11ty(spike)
Need to see how much work would be needed to integrate it as a 11ty plugin
this involves it working with all the type of data(json, MD and so on) seamlessly

### secure
Need to go throught the code and check that everything is secure and doesn't expose
private informations

### when showing results the code should escape html
If the pages are in html or contain html, we should not render it in the results

### Use regex to define link for each page
It is possible to use a regex and a substitution string to cover most scenarios to generate the link of a page
For now we just ask to pass a function to the library, but for most cases it might be overkill.
We did a spike in the "open result" story(AC2) and we should have already all the necessary tools, there are also some examples of useful regexes in the story

### visually appealing
Need to provide the default configuration for the front end with a generic, neutral but visually appealing theme/style

### basic frontend configuration
It needs to be possible to configure basic style things on the front end like for example changing background and foreground colors

### spell checking on the code
