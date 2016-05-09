import React from 'react';
import {Link} from 'react-router';
// import Header from '../containers/Header';
// import Footer from '../containers/Footer';
import Events from '../components/Events';
// import LoginMain from '../utils/LoginMain.js';

const EventsContainer = React.createClass({
  componentDidMount: function(){
  },
  render: function(){
    return(
      <div>
        <div>
          <Link to="/songs">
            <h3>Songs</h3>
          </Link>
          <Link to="/events">
            <h3>Events</h3>
          </Link>
        </div>
        <Events />
      </div>
    )
  }
});

export default EventsContainer;
