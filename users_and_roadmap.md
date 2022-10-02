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
### install library
As the creator of the website
I want to be able to import the library in both the back-end and the front-end
So that I can use it

### search bar
As the creator of the website
I want to be able to place the searchbarin my website
So that the user can see it

### results for one word in one file
As a visitor of the website
I want to be able to use the searchbar to see all the occurrences of a hardcoded word in aspecific page
So that I can find where the word is
#### generate results
As the programmer
I want to start by being able to generate the results for a specific word in a specific file
So that I can start flashing out the algorithm
(the results will have the format of {results: [{title:"", path:"", numberOfMatches:0}])
#### show results
As a visitor of the website
I want to be able to see the results of my search
So that i can use them

### results for all words in one file
As a visitor of the website
I want to be able to use the searchbar to see all the occurrences of any word in aspecific page
So that I can find the topic I want
#### generate results
- expand the program so that we can search for any specific word in a specific file
(no need to think about empty results)
#### show results
As a visitor of the website
I want to be able to see the results of my search
So that i can use them

### empty results
As a visitor of the website
If I search for a word that is not present in the page
I want the page to still work
And have a message telling me that there were no results
