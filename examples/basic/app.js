var React = require('react');
var Picture = require('../../lib/index');

var App = React.createClass({

  render: function() {
    return (
      <div>
        <Picture />
      </div>
    );
  }

});

React.renderComponent(<App/>, document.getElementById('example'));

