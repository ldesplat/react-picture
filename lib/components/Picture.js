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
			nativeSupport = 'srcsetss' in new Image();
		}

		return {
			uri: '',
			nativeSupport: nativeSupport
		}
	},

	getInitialState: function() {
		if (this.props.nativeSupport) return {}

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
			<img src={this._matchImage()} alt={this.props.alt} />
		);
	},

	renderNative: function() {
		return (
			<img alt={this.props.alt} src={this.props.imgArray[0].split(' ')[0]} srcSet={this.props.imgArray.join(', ')} />
		);
	},

	_matchImage: function() {
		console.log('_matchImage');
		var bestMatch = null;
		var self = this;
		this.props.imgArray.map(function(imgString) {
			// this maybe should be done when props are set & modified
			// & not everytime we are looking for a new match
			var stringComponents = imgString.split(' ');
			var imgObject = {
				uri: stringComponents[0],
				width: 0,
				height: 0,
				x: 1.0
			};

			for (var i = 1; i < stringComponents.length; i++) {
				var str = stringComponents[i].trim();
				// component ends with w, hence it is width spec
				if (str.indexOf('w', str.length - 1) !== -1) {
					imgObject.width = parseInt(str.substring(0,str.length-1));
				} else if (str.indexOf('h', str.length-1) !== -1) {
					imgObject.height = parseInt(str.substring(0,str.length-1));
				} else if (str.indexOf('x', str.length-1) !== -1) {
					imgObject.x = parseFloat(str.substring(0,str.length-1));
				} else {
					console.warn('Invalid parameter passed to img array: [' + str + '] in ' + imgString);
				}
			}

			imgObject.wdiff = imgObject.width - self.state.w;
			imgObject.hdiff = imgObject.height - self.state.h;
			imgObject.xdiff = Math.abs(imgObject.x - self.state.x);

			return imgObject;
		}).forEach(function(imgObject) {
			if (!bestMatch) {
				bestMatch = imgObject;
				return;
			}

			if (bestMatch.xdiff < imgObject.xdiff) return;

			if (imgObject.xdiff < bestMatch.xdiff) {
				bestMatch = imgObject;
				return;
			}

			if (imgObject.wdiff >= 0) {
				if (bestMatch.wdiff < 0) {
					bestMatch = imgObject;
					return;
				}

				if (imgObject.wdiff < bestMatch.wdiff) {
					bestMatch = imgObject;
					return;
				}
			}

			if (imgObject.hdiff >= 0) {
				if (bestMatch.hdiff < 0) {
					bestMatch = imgObject;
					return;
				}

				if (imgObject.hdiff < bestMatch.wdiff) {
					bestMatch = imgObject;
					return;
				}
			}
		});
		return bestMatch.uri;
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
