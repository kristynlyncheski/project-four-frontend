import React from 'react';
import LoginMain from '../utils/LoginMain';

const Callback = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  componentDidMount: function(){
    LoginMain.checkForToken();
    this.context.router.push('/recommendations');
  },
  render: function(){
    return(
      <div></div>
    )
  }
});

export default Callback;
