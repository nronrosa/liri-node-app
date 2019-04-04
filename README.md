# liri-node-app

### Overview of Project
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### What this project uses
This project uses Nnodejs, Moment.js, JavaScript, functions, NPM: axios, node-spotify-api, dotenv

### How it functions
From terminal you will use a command and user input to retrieve data from APIs. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

Type in the command line 'node liri.js' and one of the following commands and the input text:
## Movies command: movie-this
Will retrieve the following:
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
       ```
* Images:
![movie-this with Movie and Movie-this with movie not found](/assets/images/movieThis_movie_and_notFound.png) 

![movie-this with no user text will provide infomration for movie Mr. Nobody](/assets/images/movieThis_blank.png) 
     
## Songs command: spotify-this-song
Will retrieve the following:
    ```
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
    ```
* Images:
![spotify-this-song with song](/assets/images/spotifyThisSong_song.png) 

![spotify-this-song with song not found](/assets/images/spotifyThisSong_song_notFound.png) 

![spotify-this-song with blank will provide information for The Sign by Ace of Base](/assets/images/spotifyThisSong_blank.png) 
    
## Concerts command: concert-this
Will retrieve the following:
    ```
    * Name of the venue
    * Venue location
    * Date of the Event (using moment to format)
    ```
* Images:
![concert-this with band, blank, and not found](/assets/images/concert-this.png) 

## Do What It Says (FS file) command: do-what-it says 
    ```
    * Will retrieve the the text inside of a file named random.txt and then use it to call one of LIRI's commands.
    ```
* Images:
![do-what-it-says: spotify-this-song](/assets/images/do-what-it-says_spotify.png) 

![do-what-it-says: conert-this and movie-this](/assets/images/do-what-it-says_movie_concert.png) 

## Liri.js with no command: default
Will provide default text that will display instructions in how to use Liri.js.
* Images:
![no liri.js command](/assets/images/no-liri-command.png) 