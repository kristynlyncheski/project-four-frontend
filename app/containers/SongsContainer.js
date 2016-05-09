import React from 'react';
import {Link} from 'react-router';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import Songs from '../components/Songs';
// import LoginMain from '../utils/LoginMain.js';
import ajaxHelpers from '../utils/ajaxHelpers';
import axios from 'axios';

const SongsContainer = React.createClass({
  getInitialState: function(){
    return{
      savedSongs: [],
      playlists: []
    }
  },
  componentDidMount: function(){
    this.getSavedAjaxFxn();
    this.getUserPlaylists();
  },
  getSavedAjaxFxn: function(){

    let params = {
      user_id: localStorage.spotifyUserID,
      selected: true
    };

    let that = this;

    ajaxHelpers.getSavedSongs(params)
    .then(function(response){
      console.log("getSavedSongs",response);

      let songs = response.data.songs;

      // if (songs.length == 0){
      //   songs = [
      //     {
      //       artist_name:[""]
      //     }
      //   ]
      // }

      // console.log("songs",songs)
      // songs[0]["artist_name"] = [""];
      // console.log("songs",songs)

      that.setState({
        savedSongs: songs,
      });
    });
  },
  getUserPlaylists: function(){

    let that = this;
    $.ajax({
      url: "https://api.spotify.com/v1/users/" + localStorage.spotifyUserID + "/playlists?limit=50",
      headers: {
       'Authorization': 'Bearer ' + localStorage.accessToken
       },
    }).done(function(response){
      console.log("getUserPlaylists response",response);
      let playlists = response.items;

      let userPlaylistInfo = [];

      for (var i = 0; i < playlists.length; i++){
        if (playlists[i].owner.id == localStorage.spotifyUserID){
          let playlistInfo = {
            playlist_id: playlists[i].id,
            playlist_name: playlists[i].name
          };
          userPlaylistInfo.push(playlistInfo);
          that.setState({
            playlists: userPlaylistInfo
          });
          // console.log("that.state.playlists",that.state.playlists);
        }; // end of if
      }; // end of for
    });
  },
  handlePlaylistAdd: function(eventKey,e){

    let playlist_id = eventKey[0];
    let song_id = eventKey[1];
    let playlist_name = eventKey[2]

    let url = "https://api.spotify.com/v1/users/" + localStorage.spotifyUserID + "/playlists/" + playlist_id + "/tracks?uris=" + encodeURIComponent("spotify:track:" + song_id);

    let that = this;

    $.ajax({
      method: 'post',
      url: url,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.accessToken,
        'Content-Type':'application/json'
       }
    })
    .done(function(response) {
      console.log("response:", response);

      let data = {
        user_id: localStorage.spotifyUserID,
        song_id: song_id,
        playlist_added_to: playlist_name,
      };

      ajaxHelpers.updateUserSong(data)
      .then(function(response){
        // console.log("response",response);
        that.getSavedAjaxFxn();
      });
    });
  },

  render: function(){
    return(
      <div className="main-container">
        <Header parentComponent="saved" />
        <div className="inner-containers">
          <h3>Your Saved Songs</h3>
          <Songs
            savedSongs={this.state.savedSongs}
            playlists={this.state.playlists}
            handlePlaylistAdd={this.handlePlaylistAdd}
          />
        </div>
        <Footer parentComponent="saved" />
      </div>
    )
  }
});

export default SongsContainer;


// <div className="main-container">
//   <Header parentComponent="saved" />
//   <div className="inner-containers">
//     <Link to="/songs">
//       <h3>Songs</h3>
//     </Link>
//     <Link to="/events">
//       <h3>Events</h3>
//     </Link>
//   </div>
//   <Songs />
//   <Footer parentComponent="saved" />
// </div>
