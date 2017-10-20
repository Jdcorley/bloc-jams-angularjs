(function() {
    function SongPlayer(Fixtures) {
      /*
       * @desc song player object
       * @type {object}
       */
      var SongPlayer = {};

      var currentAlbum = Fixtures.getAlbum();
      /*
      * @function getSongIndex
      * @desc gets the indexOf the currentAlbum song
      * @param takes a song {object}
      */
      var getSongIndex = function(song) {
        return currentAlbum.songs.indexOf(song);
      }
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
        song = song || SongPlayer.currentSong;
        if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
    } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
            playSong(song);
        }
   }
};
      /*
      * @method
      * @desc takes currentBuzzObject (song file) sets it to pause
      *@param song file
      */
      SongPlayer.pause = function(song) {
        song = song || SongPlayer.currentSong;
        currentBuzzObject.pause();
        song.playing = false;
      };
      /*
      * @method
      * @desc sets new variable currentSongIndex to current song then subtracts one and sets song to play unless currentSongIndex<0 then haults player
      *@param none
      */
      SongPlayer.previous =function () {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
          currentBuzzObject.stop();
          SongPlayer.currentSong.playing = null;
        }else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
        }
      };

      return SongPlayer;
    }


      angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures',SongPlayer]);


    })();
