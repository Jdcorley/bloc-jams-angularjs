(function() {
    function SongPlayer($rootScope, Fixtures) {
      /*
       * @desc song player object
       * @type {object}
       */
      var SongPlayer = {};


    SongPlayer.volume = null;
    /*
    * @desc Current playback time (in seconds) of currently playing song
    * @type {Number}
    */
    SongPlayer.currentTime = null;
      /*
       * @desc Buzz object audio file
       * @type {object}
       */
      var currentBuzzObject = null;
      /*
       * @desc gets current album from fixtures
       * @type {object}
       */
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
       * @function setSong
       * @desc stopSong(); and loads new audio file as currentBuzzObject
       * @param {object} song
       */
      var setSong = function(song) {
        if (currentBuzzObject) {
          stopSong();
        }
        currentBuzzObject = new buzz.sound(song.audioUrl, {
          formats: ['mp3'],
          preload: true
        });

        currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
     });
     currentBuzzObject.bind('volumeupdate', function() {
      $rootScope.$apply(function() {
          SongPlayer.volume = currentBuzzObject.setVolume();
      });
     });
        SongPlayer.currentSong = song;
      };
      /*
      * @function playSong
      * @desc plays audio file currentBuzzObject, sets song playing to true
      *@param {object} song
      */
      var playSong = function(song){
        currentBuzzObject.play();
        SongPlayer.currentSong.playing = true;
      };
      /*
      * @function stopSong
      * @desc stops audio file currentBuzzObject, sets song.playing to null
      *@param {object} song
      */
      var stopSong = function(song){
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
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
      * @desc sets currentSongIndex to current song then subtracts one and sets song to play unless currentSongIndex<0 then stopSong();
      *@param none
      */
      SongPlayer.previous =function () {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
          stopSong();
        }else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
        }
      };
      /*
      * @method
      * @desc sets currentSongIndex to current song then adds one and sets song to play unless currentSongIndex===currentAlbum.length then stopSong();
      *@param none
      */
      SongPlayer.next= function (){
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;
        if (currentSongIndex === currentAlbum.length) {
          stopSong();
        } else {
          var song = currentAlbum.songs[currentSongIndex];
          setSong(song);
          playSong(song);
        }
      };
      /*
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
     SongPlayer.setCurrentTime = function(time) {
         if (currentBuzzObject) {
             currentBuzzObject.setTime(time);
         }
     };

     SongPlayer.setVolume = function () {
        if (currentBuzzObject) {
       currentBuzzObject.setVolume(volume);
    }
  };

      return SongPlayer;
    }


      angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope','Fixtures',SongPlayer]);


    })();
