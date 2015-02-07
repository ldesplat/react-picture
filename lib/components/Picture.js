var React = require('react');

var Picture = module.exports = React.createClass({

	propTypes: {
		imgArray: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		alt: React.PropTypes.string.isRequired,
		uri: React.PropTypes.string,
		nativeSupport: React.PropTypes.bool
	},

	getDefaultProps: function {
		return {
			uri: '',
			nativeSupport: false
		}
	},

	getInitialState: function {
		return {
			w: _getWidth(),
			h: _getHeight(),
			x: window.devicePixelRatio
		}
	},

	componentDidMount: function() {
		if (this.props.nativeSupport) return;

		window.addEventListener("resize", this._onResize, false);
	},

	componentWillUnmount: function() {
		if (this.props.nativeSupport) return;

		window.removeEventListener("resize", this._onResize, false);
	},

	shouldComponentUpdate: function() {
		return true
	},

	render: function() {
		if (this.props.nativeSupport) return renderNative();

		return (
			<img src="http://placehold.it/350x150" />
		);
	},

	renderNative: function() {
		return (
			<img alt={this.props.alt} src={this.props.imgArray[0].split()[0]} srcset={this.props.imgArray.join(', ')} />
		);
	},

	_onResize: function() {
		this.setState({w: this._getWidth(), h: this._getHeight()});
	},

	_getWidth: function() {
		return window.innerWidth || document.documentElement.clientWidth;
	},

	_getHeight: function() {
		return window.innerHeight || document.documentElement.clientHeight;
	}

});
