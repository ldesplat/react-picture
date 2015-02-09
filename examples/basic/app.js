var React = require('react');
var Img = require('../../lib/index').Image;
//var PictureContainer = require('../../lib/index').PictureContainer

var App = React.createClass({

	imgs: [
		"//placebacon.net/200/150 600w",
		"//placebacon.net/300/300 800w",
		"//placebacon.net/400/400 1000w"
	],

  render: function() {

    return (
      <Img alt="stuffy" srcSet={this.imgs.join(', ')} extra={{className:"stuffy", role:"presentation"}}/>
    );
  }

});

React.render(<App/>, document.getElementById('example'));

