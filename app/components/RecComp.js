import React from 'react';
import RecommendedCard from '../components/RecommendedCard';
import DetailsContainer from '../containers/DetailsContainer';
import DownArrow from "../fsc/DownArrow";
import UpArrow from "../fsc/UpArrow";


const RecComp = React.createClass({
  // getInitialState:function(){
  //   return{
  //     view: 'track-main',
  //   };
  // },
  view: function(){
    if (this.props.view == 'track-main'){
      return this.showTrack();
    } else if (this.props.view == 'track-details'){
      return this.showDetails();
    } else {
      return
    };
  },
  // showTrackFxn: function(){
  //   console.log("up arrow clicked")
  //   this.setState({
  //     view: 'track-main'
  //   });
  // },
  showTrack: function(){
    return(
      <div>
        <RecommendedCard tracks={this.props.tracks} />
        <DownArrow onClick={this.props.showDetailsFxn}/>
      </div>
    )
  },
  // showDetailsFxn: function(){
  //   console.log("downarrow clicked")
  //   this.setState({
  //     view: 'track-details'
  //   });
  // },
  showDetails: function(){
    return(
      <div>
        <UpArrow onClick={this.props.showTrackFxn}/>
        <DetailsContainer
          tracks={this.props.tracks}
          play={this.props.play}
        />
      </div>
    )
  },
  render: function(){
    return(
      <div className="inner-container">
        {this.view()}
      </div>
    )
  },
});

export default RecComp;
