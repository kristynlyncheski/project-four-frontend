import React from 'react';
import {Link} from 'react-router';
var FontAwesome = require('react-fontawesome');
// import DownArrow from "../fsc/DownArrow";
import Recommendations from "../containers/Recommendations";
import {Button, Icon} from 'react-materialize';


const Header = React.createClass({
  handleFooter: function() {
    if (this.props.parentComponent == "settings") {
      return;
    } else if (this.props.parentComponent == "recommendations") {
      return(
        <div className="footer-container">
          <div>
            <Button floating large className='salmon' waves='light' icon='close' onClick={this.props.handleSkip}/>
          </div>
          <div>
            <Button floating large className='salmon' waves='light' icon='add' onClick={this.props.handleSave}/>
          </div>
        </div>
      );
    } else if (this.props.parentComponent == "details") {
      return(
        <div className="footer-container">
          <div>
            <Button floating large className='salmon' waves='light' icon='close' onClick={this.props.handleSkip}/>
          </div>
          <div>
            <Button floating large className='salmon' waves='light' icon='close' onClick={this.props.handleSave}/>
          </div>
        </div>
      );
    } else {
      return
    }
  },
  render: function(){
    return(
      <div className="main-footer-container">
        {this.handleFooter()}
      </div>
    )
  }
});

export default Header;

// <FontAwesome
//   name='times'
//   size='3x'
//  onClick={this.props.handleSkip}
// />
// <FontAwesome
//   name='plus'
//   size='3x'
//  onClick={this.props.handleSave}
// />
