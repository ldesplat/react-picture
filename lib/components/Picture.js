var React = require('react');

var Picture = module.exports = React.createClass({

	propTypes: {
		imgArray: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
		alt: React.PropTypes.string.isRequired,
		uri: React.PropTypes.string,
		nativeSupport: React.PropTypes.bool
	},

	getDefaultProps: function() {
		var nativeSupport = true;
		if (typeof Image !== 'undefined') {
			nativeSupport = 'srcset' in new Image();
		}

		return {
			uri: '',
			nativeSupport: nativeSupport
		}
	},

	getInitialState: function() {
		return {
			w: this._getWidth(),
			h: this._getHeight(),
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
		if (this.props.nativeSupport) return this.renderNative();

		return (
			<img src={this.props.imgArray[0].split(' ')[0]} alt={this.props.alt} />
		);
	},

	renderNative: function() {
		return (
			<img alt={this.props.alt} src={this.props.imgArray[0].split(' ')[0]} srcSet={this.props.imgArray.join(', ')} />
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
