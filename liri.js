// environment variables
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


var command = process.argv[2];
var userInputText = process.argv.slice(3).join(" ");


switch (command) {
    case "concert-this":
        concerts();
        break;

    case "spotify-this-song":
        spotifySong();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        doIt();
        break;

    default:
        console.log("Need to know how Liri.js works? Type in the command line 'node liri.js' and one of the following commands and the input text:");
        console.log("\r 'concert-this' and the name of a band");
        console.log("\r 'spotify-this-song' and the name of a song");
        console.log("\r 'movie-this' and the name of a movie");
        console.log("\r That's it! Enjoy!");
};


function concerts() {
    var queryUrl = "https://rest.bandsintown.com/artists/" + userInputText + "/events?app_id=codingbootcamp";
    if (userInputText === "") {
        console.log("You must enter a band/artist");
    } else {
        axios.get(queryUrl).then(
            function (response) {
                for (i = 0; i < response.data.length; i++) {
                    console.log("\r\n------YOUR CONCERT SEARCH for " + userInputText + "---------");
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



function spotifySong() {
    if (userInputText === "") {
        userInputText = "The Sign by Ace of Base";
    }
    spotify
        .search({
            type: "track",
            query: userInputText
        })
        .then(function (response) {
            for (i = 0; i <= 7; i++) {
                console.log("\r\n------YOUR SONG SEARCH for '" + userInputText + "'---------");
                console.log("Artist: " + response.tracks.items[i].album.artists[0].name);
                console.log("Album: " + response.tracks.items[i].album.name);
                console.log("Song: " + response.tracks.items[i].name);
                console.log("Preview Song: " + response.tracks.items[i].external_urls.spotify);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
};



function movie() {
    var queryUrl = "http://www.omdbapi.com/?t=" + userInputText + "&y=&plot=short&apikey=trilogy";
    if (userInputText === "") {
        userInputText = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");
    } else {
        axios.get(queryUrl).then(
            function (response) {
                console.log("\r\n------YOUR MOVIE SEARCH for " + userInputText + "---------");
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

function doIt() {
    // We will read the existing  file
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        userInputText = data;
        spotifySong ();
    });
}