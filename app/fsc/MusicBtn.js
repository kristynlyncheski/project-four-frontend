import React from 'react';
import {Link} from 'react-router';
var FontAwesome = require('react-fontawesome');
import {Button, Icon} from 'react-materialize';


function MusicBtn(props){
  return(
    <Link to="/recommendations">
      <div className="small-logo">
        <span className="underline">
          music
        </span><br />
        box
      </div>
    </Link>
  )
};

export default MusicBtn;
// <FontAwesome
//   name='music'
//   size='3x'
// />

// <Icon>headset</Icon>
