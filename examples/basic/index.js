var React = require('react');
var RP = require('react-picture');

var App = React.createClass({

    imgs: [
        '//placebacon.net/200/150 600w',
        '//placebacon.net/300/300 800w',
        '//placebacon.net/400/400 1000w'
    ],

    render: function () {

        return (
            <div>
                <RP.Image alt='Bacon...' srcSet={ this.imgs.join(', ') } extra={ { className: 'baconImg' } }/>
                <RP.BaseImage alt='Bacon...' srcSet={ this.imgs.join(', ') } extra={ { className: 'baconImg' } } nativeSupport='none'/>
                <RP.BaseImage alt='Bacon...' srcSet={ this.imgs.join(', ') } extra={ { className: 'baconImg' } } nativeSupport='full'/>
            </div>
        );
    }

});

React.render(<App/>, document.getElementById('root'));
