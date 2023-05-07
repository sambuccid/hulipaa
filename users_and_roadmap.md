# Users
I'm a visitor and user of a static website, my main concerns around the library is the ability to search in the website and everything that is around that.
I also mind how the UX of the fronted is and how easy it is to use.

I'm the creator of the website, my main concern is about how easy the library is to setup and customise.
I need to be able to give my users the correct and specific results and to be able to integrate seamlessy the library in my website so that it doesn't look like an external component of the website.
I value
- semplicity of the library
- velocity to customise
- extensibility and customizability

# MVP
The Minimal Viable Product consists of:
- a static results generator
-- that accepts a folder full of json files
-- accepts a parser function for the files
-- generates files containing the results
- a front-end library
-- that can be imported easily
-- tht allows to search for a word
-- that can show results with highlighting
-- it doesn't need to be customisable for now

## user/tech stories for MVP(incomplete)
### ~~search bar~~

### ~~results for one word in one file~~
As a visitor of the website
I want to be able to use the searchbar to see all the occurrences of a hardcoded word in aspecific page
So that I can find where the word is

Should be able to end to end manually test with changing page
#### ~~generate results~~
#### ~~show results~~

### ~~results for all words in one file~~
As a visitor of the website
I want to be able to use the searchbar to see all the occurrences of any word in aspecific page
So that I can find the topic I want

Should be able to end to end test it
#### ~~generate results~~

#### ~~show results~~


### Open result
As a visitor of the website
I want to be able to open the page that contains the result
so that I view it

### Parse input files
As the creator of the website
I want to be able to define a way of parsing the input data
So that the content of the data can be used to generate the results

### results for all words in all files
As a visitor of the website
I want to be able to use the searchbar to see all the occurrences of any word in a list of pages
So that I can find the topic I want

Should be able to end to end manually test it
#### generate results
- expand the program so that we can search for all the files
(no need to think about empty results)
#### show results
As a visitor of the website
I want to be able to see the results of my search
So that i can use them
(
AC-N
Given I am on the search page
When I enter and run the search
I want the results to be clearly separated from one another
AC-N
Given I have searched for something on the search page
When I click on a result of a page that can't be found(404)
I want to still be able to access all other results without running the search again
)

### search multiple words
As a visitor of the website
I want to be able to use the searchbar typing multiple words
So that I can find more relevant results
(I want the results to be ordered by relevance)

### empty results
As a visitor of the website
If I search for a word that is not present in the page
I want the page to still work
And have a message telling me that there were no results

### install library
with a manual test
* along all the other things test also if we can reach the path of the files
(this might include using webpack or some other bundling)

# Version 0.0.1
This is the version of the library that we think is enough useful, easy to use and configurable.
## user/tech stories(incomplete)

### auto completition

### fully integrated with 11ty(spike)
Need to see how much work would be needed to integrate it as a 11ty plugin
this involves it working with all the type of data(json, MD and so on) seamlessly

### secure
Need to go throught the code and check that everything is secure and doesn't expose
private informations

### when showing results the code should escape html
If the pages are in html or contain html, we should not render it in the results

### visually appealing
Need to provide the default configuration for the front end with a generic, neutral but visually appealing theme/style

### basic frontend configuration
It needs to be possible to configure basic style things on the front end like for example changing background and foreground colors

# Other versions
- use prettier
- get some kind of spell checking on the code
- configure path where to have results(/search/word.json)