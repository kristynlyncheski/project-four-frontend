import KEYS from '../private/KEYS';
var React = require('react');
var Router = require('react-router');
import ajaxHelpers from './ajaxHelpers';

const SCOPES = "user-top-read playlist-read-collaborative playlist-read-private playlist-modify-public playlist-modify-private"

const LoginMain = {
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getAccessToken: function(){
    if (!localStorage.accessToken || localStorage.expireTime < Date()) {
      window.location = "https://accounts.spotify.com/authorize?client_id=" + KEYS.CLIENT_ID + "&redirect_uri=" + KEYS.REDIRECT_URI + "&scope=" +  encodeURIComponent(SCOPES) + "&response_type=token&state=123";
    } else {
      console.log("got access token from local storage");
      // return localStorage.accessToken;
    }
  },

  // checking for token now
  getParameter: function(name,url){
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&#]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    //http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
  },
  checkForToken: function(){

    let accessToken = this.getParameter("access_token");
    let expiresIn = this.getParameter("expires_in");
    let errorParam = this.getParameter("error");

    let that = this;

    if (!errorParam) {
      $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
         'Authorization': 'Bearer ' + accessToken
         },
      }).done(function(response){
        console.log("LoginAuth.checkForToken response",response);

        let expireTime = new Date();
        expireTime.setSeconds(expireTime.getSeconds() + expiresIn);

        localStorage.setItem("accessToken",accessToken);
        localStorage.setItem("expires",expireTime);
        localStorage.setItem("spotifyUserID",response.id);
        localStorage.setItem("spotifyEmail",response.email);
        localStorage.setItem("spotifyName",response.display_name);

        let userInfo = {
          user_id: response.id,
          display_name: response.display_name,
          email: response.email,
          img: response.images[0].url
        };

        ajaxHelpers.addUser(userInfo)
        .then(function(response){
          // console.log(response);
        });

        // console.log("userInfo",userInfo);

        //This is where user prefs and info are called (from the callback page)
        that.getUserPrefs();


        //*** going to have to create a user record if needed to the database
        //*** otherwise have to find the matching account in my database using ID & email

        // window.location = stateParam;

      }).fail(function(response){
        console.log("it failed");
        console.log(response);
      });
    };
  },
  getUserPrefs: function(){
    let artistString;
    let trackString;

    //artists ajax call

    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists?limit=3",
      headers: {
       'Authorization': 'Bearer ' + localStorage.accessToken
       },
    }).done(function(response){
      // console.log("response",response);
      // console.log("artist response 1",response.items[0].id);
      let artistID1 = response.items[0].id;
      // console.log("artist response 2",response.items[1].id);
      let artistID2 = response.items[1].id;
      // console.log("artist response 3",response.items[2].id);
      let artistID3 = response.items[2].id;
      // artistString = artistID1 + "," + artistID2;

      let userArtistData = {
        user_id: localStorage.spotifyUserID,
        artist_one: artistID1,
        artist_two: artistID2,
        artist_three: artistID3
      };

      ajaxHelpers.updateUser(userArtistData)
      .then(function(response){
        // console.log("response",response);
      });


    }).fail(function(response){
      console.log("it failed");
      console.log(response);
    });

    //tracks ajax call
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?limit=3",
      headers: {
       'Authorization': 'Bearer ' + localStorage.accessToken
       },
    }).done(function(response){
      // console.log("response",response);
      // console.log("track response 1",response.items[0].id);
      let trackID1 = response.items[0].id;
      // console.log("track response 2",response.items[1].id);
      let trackID2 = response.items[1].id;
      // trackString = trackID1 + "," + trackID2;
      let trackID3 = response.items[2].id;
      // console.log("track response 3",response.items[2].id);

      let userSongData = {
        user_id: localStorage.spotifyUserID,
        song_one: trackID1,
        song_two: trackID2,
        song_three: trackID3
      };

      ajaxHelpers.updateUser(userSongData)
      .then(function(response){
        console.log("response",response);
      });

    }).fail(function(response){
      console.log("it failed");
      console.log(response);
    });

  },
};

export default LoginMain;
