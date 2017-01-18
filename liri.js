// retrieve packages to handle twitter, spotify
var twitter = require("twitter");
var spotify = require('spotify');

// retrieve packages to handle textfile read/write
var fs = require("fs");

// var inquirer = require("inquirer");

// retrieve packages to handle requests such as omdb
var request = require("request");

// retrieving keys from keys.js file
var myKeys = require("./keys.js");

// store user entry command: search twitter, spotify, omdb or from search parameters inside txt file contents
var choice = process.argv[2];

// store user entry search: title of movie or song
//	arguments array from number 3 and on are concatenated together with space separator
var title = process.argv.splice(3).join(" ");
console.log("title: " + title);
// var title = process.argv[3];

// calling function to sort user entries
options();

// sorts what each user command/entry should do, and calls pertinent function accordingly
function options() {
	if (choice == "my-tweets") {
		myTweets();
	} else if (choice == "spotify-this-song") {
		spotifyThisSong();
	} else if (choice == "movie-this") {
		movieThis();
	} else if (choice == "do-what-it-says") {
		doWhatItSays();
	} else {
		console.log("not a choice available")
	}
}	// end options

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// node liri.js my-tweets @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function myTweets() {
	// var twitter = require("twitter");
	// retrieve client twitter keys
	var client = new twitter({
  		consumer_key: myKeys.twitterKeys.consumer_key,
  		consumer_secret: myKeys.twitterKeys.consumer_secret,
  		access_token_key: myKeys.twitterKeys.consumer_access_token_key,
  		access_token_secret: myKeys.twitterKeys.consumer_access_token_secret
	});

	// twitter search parameters
	var params = {
		// tweets search set to specific twitter user screen name
		screen_name: 'jwongc',
		// limits max tweets retrieved to 20
		count: 20	
	};

	// run tweeter module passing search parameter defined above in variable params
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		// if no error available tweets are displayed, will enumerate a max of 20 retrieved tweets
		if (!error) {
			// check for tweets posted availability
			if (tweets.length == 0) {
				console.log("===-------------------------------------------------===");
    			console.log("you have no tweets posted");
    			console.log("===-------------------------------------------------===");
			} else {
    			console.log("===-------------------------------------------------===");
    			console.log("my " + tweets.length + " most recent tweets");
    			console.log("===-------------------------------------------------===");
    			for (var i=0; i<tweets.length ; i++) {
					console.log("@ " + (i + 1) + " @");	
    				console.log("Added on: " + tweets[i].created_at); 
					console.log("Tweet: " + tweets[i].text);
					console.log("-------------------------------------------------------");
  				}	// end for loop
    			console.log("end of tweets");
    			console.log("===-------------------------------------------------===");
  			}	// end check tweets availability
		}	// end if no error statement
	});	// end client.get
}	// end function myTweets

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// node liri.js spotify-this-song @@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	
function spotifyThisSong () {
	// var spotify = require("spotify");
	// if no song title entered, the default is 
	if (title == "") {
    	title = "the sign";
    }

    // run spotify module inserting song title as query
	spotify.search({ type: 'track', query: title }, function(err, data) {
		var match = 0;	// keeps track of matched song titles

    	if ( err ) {
    		// notify error if there were any
        	console.log('Error occurred: ' + err);
        	return;
    	} else {
    		console.log("===-------------------------------------------------===");
    		console.log("spotify this song: " + title);
    		console.log("===-------------------------------------------------===");
    		for (var i=0; i<data.tracks.items.length ; i++) {
    			// verify that song title matches on spotify returned data
    			if (data.tracks.items[i].name.toLowerCase() == title.toLowerCase()) {
    				match++;
    				console.log("@ " + match + " @");
    				console.log("Artist(s): " + data.tracks.items[i].artists[0].name); 
					console.log("Song Name: " + data.tracks.items[i].name);
					console.log("Preview Link: " + data.tracks.items[i].preview_url);
					console.log("Album: " + data.tracks.items[i].album.name);
    				console.log("-------------------------------------------------------");
    			} 
    		}	// end for loop
    		if (match == 0) {
    			console.log("===-------------------------------------------------===");
    			console.log("no song title match found on spotify");
    			console.log("===-------------------------------------------------===");
    		}
    	}	// end else
	});	// end spotify search
}	// end spotify function

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// node liri.js movie-this @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

function movieThis() {
	// var request = require("request");
	// if no movie title entered, the default is 
	if (title == "") {
		title = "Mr Nobody";
	}
	// movie title inserted into query URL to be sent to omdb api
	var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&tomatoes=true&plot=short&r=json";

	// run request module
	request(queryUrl, function(error, response, body) {
		// If there were no errors and the response code was 200 (code for request succesful)
		if (!error && response.statusCode === 200) {
			// check if title not found. If found displays movie information
			if (JSON.parse(body).Title == undefined) {
				console.log("title is: " + title);
				console.log("===-------------------------------------------------===");
				console.log("could not find movie information on database");
				console.log("===-------------------------------------------------===");
			} else {
				console.log("===-------------------------------------------------===");
    			console.log("movie: " + title);
    			console.log("===-------------------------------------------------===");
				console.log("Title: " + JSON.parse(body).Title);
				console.log("Year: " + JSON.parse(body).Year);
				console.log("Rated: " + JSON.parse(body).Rated);
				console.log("Country: " + JSON.parse(body).Country);
				console.log("Language: " + JSON.parse(body).Language);
				console.log("Plot: " + JSON.parse(body).Plot);
				console.log("Actors: " + JSON.parse(body).Actors);
				console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
				console.log("Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL);
				console.log("===-------------------------------------------------===");
			} // end movie undefined check
		}
	});	// end request module
}	// end movie function

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// node liri.js do-what-it-says @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// reads data from pre-existing text file
function doWhatItSays () {
	// run read/write module. Reads data from text file
	fs.readFile("random.txt", "utf-8", function(error, data) {
		console.log(data);
		// splitting data array
		var dataArr = data.split(",");
		console.log(dataArr);
		console.log(dataArr.length);
		// selecting array pair (aka key-value, aka choice: title)
		for (var i=0; i<dataArr.length; i+=2) {	
			// choice is the command to be executed: movie-this, spotify-this-song or my-tweets
			choice = dataArr[i].trim();
			console.log("choice: " + choice);
			// title is the movie or song to be searched
			title = dataArr[i+1].trim();
			console.log("title: " + title);
			// calls relevant function according to command
			options();
			// var pauseGame = setTimeout(options, 2000);
		}
	});
}