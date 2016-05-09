import React from 'react';
import Header from './Header';
import Footer from './Footer';
// import LoginMain from '../utils/LoginMain';
import RecComp from '../components/RecComp';
// import RecommendedCard from '../components/RecommendedCard';
// import DetailsContainer from './DetailsContainer';
import ajaxHelpers from '../utils/ajaxHelpers';



const Recommendations = React.createClass({
  getInitialState: function(){
    return{
      userInfo: {},
      view: 'track-main',
      recommendedSongs: [
        {
          song_title: "",
          song_id: "",
          preview: "",
          album: "",
          img: "",
          artist_name: [],
          artist_id: [],
        }
      ],
      preview: ''
    };
  },
  callForUserInfo:function(){
    let user = {
      user_id: localStorage.spotifyUserID
    };

    let that = this;

    ajaxHelpers.getUserInfo(user)
    .then(function(response){
      // console.log(response);
      that.setState({
        userInfo: response.data.users[0]
      });
      that.recommendAjax(that.state.userInfo);
    });
  },
  recommendAjax: function(userInfo){
    //these need to be parameters in fxn(tracks,artists)

    let tracks = userInfo.song_one + "," + userInfo.song_two + "," + userInfo.song_three;
    let artists = userInfo.artist_one + "," + userInfo.artist_two;

    // console.log(tracks,artists);

    let that = this;

    //recommendation ajax
    $.ajax({
      url: "https://api.spotify.com/v1/recommendations?seed_tracks=" + tracks + "&seed_artists=" + artists + "&limit=20",
      headers: {
       'Authorization': 'Bearer ' + localStorage.accessToken
       },
    }).done(function(response){
      // console.log("response",response.tracks);

      var savedTracks = {
        tracks: [],
      };

      for (var i = 0; i < response.tracks.length; i++){
        let track = response.tracks[i];
        savedTracks.tracks[i] = {
          song_title: track.name,
          song_id: track.id,
          preview: track.preview_url,
          album: track.album.name,
          img: track.album.images[0].url,
          artist_name: [],
          artist_id: [],
        };
        for (var j = 0; j < track.artists.length; j++){
          savedTracks.tracks[i].artist_name.push(track.artists[j].name);
          savedTracks.tracks[i].artist_id.push(track.artists[j].id);
        };
      };
      console.log("savedTracks",savedTracks);
      // console.log("savedTracks.tracks",savedTracks.tracks);

      that.setState({recommendedSongs: savedTracks.tracks});

    }).fail(function(response){
      console.log("it failed");
      console.log(response);
    });

    console.log("this.state.recommendedSongs",this.state.recommendedSongs);

  },
  componentDidMount: function(){
    {this.callForUserInfo()}
  },
  showDetailsFxn: function(){
    console.log("downarrow clicked")
    this.setState({
      view: 'track-details'
    });
  },
  showTrackFxn: function(){
    console.log("up arrow clicked")
    this.setState({
      view: 'track-main'
    });
    this.pausePreview();
  },
  handleSave: function(status){
    this.setState({
      view:'track-main'
    });
    this.songAjaxFxn(true);
    this.setSelectedFxn(true);
    this.pausePreview();
    this.pausePreview();
  },
  handleSkip: function(){
    this.setState({
      view:'track-main'
    });
    this.songAjaxFxn(false);
    this.setSelectedFxn(false);
    // console.log("preview state", this.state.preview)
    if (this.state.preview){
      // console.log("testing preview");
      this.pausePreview();
    };
  },
  songAjaxFxn: function(status){
    let tracklist = this.state.recommendedSongs;
    // tracklist.shift();
    // console.log(tracklist);
    // this.setState({
    //   recommendedSongs:tracklist
    // });
    if (this.state.recommendedSongs.length < 1){
      this.recommendAjax();
    };

    let that = this;


    let track = this.state.recommendedSongs[0];
    console.log("track",track);
    let songInfo = {
      song_title: track.song_title,
      song_id: track.song_id,
      preview: track.preview,
      album: track.album,
      img: track.img,
      artist_name: track.artist_name[0],
      artist_id: track.artist_id[0]
    };

    // console.log("songInfo",songInfo);


    ajaxHelpers.addSong(songInfo)
    .then(function(response){
      console.log(response);
      tracklist.shift();
      console.log(tracklist);
      that.setState({
        recommendedSongs:tracklist
      });
    });
  },
  setSelectedFxn: function(status){
    let track = this.state.recommendedSongs[0];
    // console.log("track",track);
    let selectedInfo = {
      song_id: track.song_id,
      user_id: localStorage.spotifyUserID,
      selected: status
    };

    ajaxHelpers.addUserSong(selectedInfo)
    .then(function(response){
      console.log(response);
    });
  },
  setPreview: function(){
    // console.log("this is clicked");
    let audio = new Audio(this.state.recommendedSongs[0].preview);

    // console.log(this.state.recommendedSongs[0].preview);
    // console.log(this.state.recommendedSongs[0]);
    this.setState({
      preview: audio
    },this.playPreview);

  },
  playPreview:function(){

    console.log("play log", this.state.preview);

    this.state.preview.play();
    // audio.play();
    //http://stackoverflow.com/questions/9419263/playing-audio-with-javascript

  },
  pausePreview: function(){
    // console.log("this is clicked");
    console.log("pause log", this.state.preview);
    if (this.state.preview){
      this.state.preview.pause();
    }
  },
  render: function(){
    return(
      <div className="main-container">
        <Header
          parentComponent="recommendations"
          showSongs={this.showSongs}
          pause={this.pausePreview}
         />
       <RecComp
           tracks={this.state.recommendedSongs}
           view={this.state.view}
           showDetailsFxn={this.showDetailsFxn}
           showTrackFxn={this.showTrackFxn}
           play={this.setPreview}
         />
        <Footer
          parentComponent="recommendations"
          tracks={this.state.recommendedSongs}
          handleSave={this.handleSave}
          handleSkip={this.handleSkip}
        />
      </div>
    )
  }
});

export default Recommendations;
