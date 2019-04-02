# liri-node-app

### Overview of Project
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### What this project uses
This project uses Nnodejs, Moment.js, JavaScript, functions, NPM: axios, node-spotify-api, dotenv

### How it functions
From terminal you will use a command and user input to retrieve data from APIs. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

Type in the command line 'node liri.js' and one of the following commands and the input text:
* Movies command: movie-this
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

* Songs command: spotify-this-song
Will retrieve the following:
    ```
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
    ```
* Concerts command: concert-this
Will retrieve the following:
    ```
    *Name of the venue
    *Venue location
    *Date of the Event (using moment to format)
    ```
* Do What It Says (FS file) command: do-what-it says 
Will retrieve the the text inside of a file named random.txt and then use it to call one of LIRI's commands.