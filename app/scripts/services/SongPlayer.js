(function() {
    function SongPlayer() {
      /*
       * @desc song player object
       * @type {object}
       */
      var SongPlayer = {};
      /*
       * @desc current song's state
       * @type {object}
       */
      SongPlayer.currentSong = null;
      /*
       * @desc Buzz object audio file
       * @type {object}
       */
      var currentBuzzObject = null;

      /*
       * @function setSong
       * @desc Stops currently playing song and loads new audio file as currentBuzzObject
       * @param {object} song
       */
      var setSong = function(song) {
        if (currentBuzzObject) {
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
        }
        currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
        });
        SongPlayer.currentSong = song;
      };
      /*
      * @function playSong
      * @desc plays audio file currentBuzzObject, sets song.playing to true
      *@param {object} song
      */
      var playSong = function(song){
        currentBuzzObject.play();
        song.playing = true;
      };
      /*
      * @method
      * @desc compares SongPlayer.currentSong to song if different uses setSong and playSong to play the correct song
      *@param song file
      */
      SongPlayer.play = function(song) {
        if (SongPlayer.currentSong !== song) {
          setSong(song);
          playSong(song);
        }
      };
      /*
      * @method
      * @desc takes currentBuzzObject (song file) sets it to pause
      *@param song file
      */
      SongPlayer.pause = function(song) {
        currentBuzzObject.pause();
        song.playing = false;
      };

      return SongPlayer;
    }


      angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);


    })();
