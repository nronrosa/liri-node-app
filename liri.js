require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");

var command = process.argv[2];
var userInputText = process.argv.slice(3).join(" ");

function checkCommand(action, input) {
    switch (action) {
        case "concert-this":
            concerts(input);
            break;

        case "spotify-this-song":
            spotifySong(input);
            break;

        case "movie-this":
            movieThis(input);
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
};

checkCommand(command, userInputText);

function concerts(band) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";
    if (band === "") {
        console.log("You must enter a band/artist");
    } else {
        axios.get(queryUrl).then(
                function (response) {
                    if (response.data.length === 0) {
                        console.log("Sorry, no information. Try another.");
                    } else {
                        for (var i = 0; i < response.data.length; i++) {
                            console.log("\r\n------CONCERT SEARCH for " + band + "---------");
                            console.log("Venue: " + response.data[i].venue.name);
                            var location = response.data[i].venue.city + ", " + response.data[i].venue.region + " " + response.data[i].venue.country
                            console.log("Location: " + location);
                            var eventDate = moment(response.data[i].datetime).format("MM-DD-YYYY");
                            console.log("Date: " + eventDate);
                        }
                    }
                }
            )
            .catch(function (error) {
                console.log(error);
            });
    };
};

function spotifySong(song) {
    if (song === "") {
        song = "The Sign: Ace of Base";
    }
    spotify
        .search({
            type: "artist,track",
            query: song
        })
        .then(function (response) {
            for (var i = 0; i < 7; i++) {
                console.log("\r\n------SONG SEARCH for '" + song + "'---------");
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

function movieThis(movie) {
    if (movie === "") {
        movie = "Mr. Nobody";
        console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!");
    };

    axios.get("http://www.omdbapi.com/?t=" + movie + "&apikey=trilogy").then(
            function (response) {
                console.log("\r\n------MOVIE SEARCH for " + movie + "---------");
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country where Produced: " + response.data.Country);
                console.log("Language of movie: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        )
        .catch(function (error) {
            console.log(error);
        });
};

function doIt() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var file = data.split(",");
        checkCommand(file[0], file[1]);
    });
};