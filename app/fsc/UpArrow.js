import React from 'react';
import {Link} from 'react-router';
var FontAwesome = require('react-fontawesome');

function UpArrow(props){
  return(
    <div className="up-arrow-container">
      <FontAwesome
        name='angle-up'
        size='5x'
        onClick={props.onClick}
        className="up-arrow"
      />
    </div>  
  )
};

export default UpArrow;
