# LIRI Bot

A Language Interpretation and Recognition Interface command line node application.

LIRI displays latest tweets and allows for movie and music information basic search.

### App Design Overview

To display personal tweets, a twitter account is required. Private twitter keys have to be added to keys.js file. Visit [https://apps.twitter.com/app/new](https://apps.twitter.com/app) to get your twitter keys.

The app accesses Twitter, Spotify and IMDB APIs to retrieve data of interest.

LIRI when executed, will take the following command search lines:

* node liri.js my-tweets
* node liri.js spotify-this-song '<song name here>'
* node liri.js movie-this  '<movie name here>'
* node liri.js do-what-it-says

Data pertinent to songs and movie titles will be displayed as well as latest tweets. In addition, LIRI will save search results in a log.txt file.


### Copyright

Jorge Wong (C) 2016. All Rights Reserved.
