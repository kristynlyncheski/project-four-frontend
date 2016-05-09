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
      <div><img src="http://downgraf.com/wp-content/uploads/2014/09/01-progress.gif" width="300" /></div>
    )
  }
});

export default Callback;
