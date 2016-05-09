import React from 'react';
import {Button} from 'react-materialize';

const History = React.createClass({
  view: function(){
    if (this.props.view == 'user-info'){
      return;
    } else if (this.props.view == 'history'){
      let historyContainer = document.querySelector(".history-container");
      historyContainer.style.display = "block";
      return this.showHistory();
    } else {
      return
    };
  },
  hideHistory: function(){
    this.props.hideHistory();
    this.props.historyDisplay();
  },
  showHistory: function(){
    let history = this.props.history.map((track,index) => {
      // console.log(track.date_added_to_playlist);
      let dateAdded = new Date(track.date_added_to_playlist);
      let formattedDate = dateAdded.toLocaleDateString("en-US");
      return (
        <div className="songs-collection" key={index}>
          <div className="history-details">
            <div>{track.songs.song_title} ({track.songs.artist_name})</div>
            <div>Added to {track.playlist_added_to} on {formattedDate}</div>
          </div>
        </div>
      )
    });
    return(
      <div>
        <Button waves='light' className="history-btn" onClick={this.hideHistory}>Hide</Button>
        <div className="saved-songs-container">
          {history}
        </div>

      </div>
    )
  },
  render: function(){
    return(
      <div className="history-container">
        {this.view()}
      </div>
    )
  }
});

export default History;
