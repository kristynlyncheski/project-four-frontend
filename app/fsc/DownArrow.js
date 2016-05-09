import React from 'react';
import {Link} from 'react-router';
var FontAwesome = require('react-fontawesome');
import {Icon} from 'react-materialize';


// fix the click of the arrow -- because z-index is over footer

function DownArrow(props){
  return(
    <div className="down-arrow-container">
      <FontAwesome
        name='angle-down'
        size='5x'
        onClick={props.onClick}
        className="down-arrow"
      />
    </div>
  )
};

export default DownArrow;
//
// <Link to="/details">
//   <FontAwesome
//     name='angle-down'
//     size='3x'
//     onClick={props.onClick}
//   />
// </Link>
