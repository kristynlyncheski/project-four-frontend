import React from 'react';

const Settings = React.createClass({

  render: function(){
    let tracks = this.props.topTracks.map((track,index) => {
      return (
        <div key={index}>
          <p>{index + 1}. {track.song_title} by {track.artists.toString().replace(",",", ")}</p>
        </div>
      )
    });

    let artists = this.props.topArtists.map((artist,index) => {
      return (
        <div key={index}>
          <p>{index + 1}. {artist.name}</p>
        </div>
      )
    });
    // console.log("tracks",tracks)
    return(
      <div className="user-top-list-container">
        <div className="user-top-list text-right">
          <h4 className="top">Top Artists</h4>
          <div>{artists}</div>
        </div>
        <div className="user-top-list">
          <h4 className="top">Top Tracks</h4>
          <div>{tracks}</div>
        </div>
      </div>
    )
  }
});



export default Settings;
