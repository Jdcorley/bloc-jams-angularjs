(function() {
    function SongPlayer() {
      var SongPlayer = {};
      var currentSong = null;
      /*
      * @desc Buzz object audio file
      * @type {object}
      */
      var currentBuzzObject = null;

      SongPlayer.play = function(song) {
        if (currentSong !== song) {
          /*
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {object} song
          */
          var setSong = function(song) {
            if (currentBuzzObject) {
              currentBuzzObject.stop();
              currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.aufioUrl, {
              formats: ['mp3'],
              preload: true
            });
            currentSong = song;
          };
        setSong(song);
        currentBuzzObject.play();
        song.playing = true;
      }

      SongPlayer.pause = function(song) {
        currentBuzzObject.pause();
        song.playing = false;
      };

      return SongPlayer;
    };



  angular
  .module('blocJams')
  .factory('SongPlayer', SongPlayer);
})();
