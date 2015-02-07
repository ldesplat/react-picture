var React = require('react');
var Picture = require('../../lib/index').Picture;
//var PictureContainer = require('../../lib/index').PictureContainer

var App = React.createClass({

	imgs: [
		"//placebacon.net/200/150 600w",
		"//placebacon.net/300/300 800w"
	],

  render: function() {
    return (
      <Picture alt="stuffy" imgArray={this.imgs}/>
    );
  }

});

React.render(<App/>, document.getElementById('example'));

