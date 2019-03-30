// environment variables
require("dotenv").config();
var keys = require("./keys.js");

// var to packages
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");

var moment = require('moment');


var command = process.argv[2];

// ***********************************************************************************
// COMMANDS 
// Make it so liri.js can take in one of the following commands:
// * `concert-this`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`
// ***********************************************************************************

// BANDS
// if request is concert-this get artist from bands in town -axios
// `node liri.js concert-this <artist/band name here>`
//    * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
//      * Name of the venue
//      * Venue location
//      * Date of the Event (use moment to format this as "MM/DD/YYYY")

if (command === "concert-this") {
    var artist = process.argv.slice(3).join(" ");
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    if (artist === "") {
        console.log("Sorry, no show times for that artist at this time!");
        console.log("Try again in a month!");
    } else {
        axios.get(queryUrl).then(
            function (response) {
                for (i = 0; i < response.data.length; i++) {
                    console.log("Venue: " + response.data[i].venue.name);
                    var location = response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country
                    console.log("Location: " + location);
                    var eventDate = moment(response.data[i].venue.datetime).format("MM-DD-YYYY");
                    console.log("Date: " + eventDate);
                }
            }
        );
    };
};



// ***********************************************************************************
// SPOTIFIY
// if request is spotify-this-song get song from spotify using environment vars -spotify
// node liri.js spotify-this-song '<song name here>'`
//    * This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
//    * The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:



// ***********************************************************************************
// MOVIES
// if request is movie-this get details from omdb in town -axios
// `node liri.js movie-this '<movie name here>'`
//    * This will output the following information to your terminal/bash window:
//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```
//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
//      * It's on Netflix!
//    * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.


if (command === "movie-this") {
    var movieName = process.argv.slice(3).join(" ");
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    if (movieName === "") {
        movieName = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");
    } else {
        axios.get(queryUrl).then(
            function (response) {
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country where Produced: " + response.data.Country);
                console.log("Language of movie: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        );
    };
};

// ***********************************************************************************

// DO WHAT IT SAYS
// if request is do-what-it-says get artist from bands in town - fs
// `node liri.js do-what-it-says`
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Edit the text in random.txt to test out the feature for movie-this and concert-this.
// ***********************************************************************************