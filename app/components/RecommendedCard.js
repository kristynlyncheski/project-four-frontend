import React from 'react';
import {Card, CardTitle} from 'react-materialize';
import DetailsContainer from '../containers/DetailsContainer';

const RecommendedCard = React.createClass({
  getInitialState: function(){
    return{
      showingTrack: 0,
    }
  },
  render: function(){
    let tracks = this.props.tracks.map((track,index) => {

      return (
        <div key={index}>
          <div className="rec-img">
            <img src={track.img} />
          </div>
          <h3 className="song-title">{track.song_title}</h3>
          <p className="artist-name">{track.artist_name.toString().replace(",",", ")}</p>
        </div>
      )
    });
    // console.log("tracks",tracks);
    let index = this.state.showingTrack;

    return(
      <div>
        {tracks[index]}
      </div>
    )
  }
});

export default RecommendedCard;


//
// <Card header={<CardTitle reveal image={track.img} waves='light'/>}
//   title={track.song_title}
//   reveal={<DetailsContainer tracks={this.props.tracks} />}>
//   <p>{track.artist_name.toString().replace(",",", ")}</p>
// </Card>
