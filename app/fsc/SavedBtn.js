import React from 'react';
import {Link} from 'react-router';
var FontAwesome = require('react-fontawesome');
import {Button, Icon} from 'react-materialize';

function SavedBtn(props){
  return(
    <Link to="/songs" onClick={props.pause}>
      <Icon>favorite</Icon>
    </Link>
  )
};

export default SavedBtn;

//  <FontAwesome
  //   name='heart'
  //   size='3x'
  // />
