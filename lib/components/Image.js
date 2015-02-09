var React = require('react');

/** Equivalent to html <img> element
  * 
  * <img alt src srcset sizes crossorigin usemap ismap width height>
  */
var ImageComponent = module.exports = React.createClass({

	propTypes: {
		srcSet: React.PropTypes.string.isRequired,
		alt: React.PropTypes.string.isRequired,
		nativeSupport: React.PropTypes.bool,
		updateOnResize: React.PropTypes.bool,
		extra: React.PropTypes.object
	},

	getDefaultProps: function() {
		var nativeSupport = true;
		if (typeof Image !== 'undefined') {
			nativeSupport = 'srcset' in new Image();
		}

		return {
			uri: '',
			nativeSupport: nativeSupport,
			updateOnResize: true,
			extra: {}
		}
	},

	getInitialState: function() {
		if (this.props.nativeSupport) return {}

		return {
			w: this._getWidth(),
			h: this._getHeight(),
			x: window.devicePixelRatio,
			candidates: this._buildCandidates(this.props.srcSet)
		}
	},

	componentWillReceiveProps: function(nextProps) {
		if (nextProps.nativeSupport !== this.props.nativeSupport) {
			this.setState(this.getInitialState());
		} else if (nextProps && nextProps.srcSet && 
				(nextProps.nativeSupport === false || this.props.nativeSupport === false)) {
			this.setState({candidates: this._buildCandidates(nextProps.srcSet)});
		}
	},

	componentDidMount: function() {
		if (this.props.nativeSupport) return;

		if (this.props.updateOnResize) {
			window.addEventListener("resize", this._onResize, false);
		}
	},

	componentWillUnmount: function() {
		if (this.props.nativeSupport) return;

		if (this.props.updateOnResize) {
			window.removeEventListener("resize", this._onResize, false);
		}
	},

	render: function() {
		if (this.props.nativeSupport) return this.renderNative();

		return (
			<img src={this._matchImage()} alt={this.props.alt} {...this.props.extra}/>
		);
	},

	renderNative: function() {
		return (
			<img alt={this.props.alt} src={this.props.srcset} srcSet={this.props.srcSet} {...this.props.extra} />
		);
	},

	/**
	  * TODO: Very slow implementation, should implement like in the spec
	  *       But it is not very important right now since it is only
	  *       calculated on property change or startup
	  */
	_buildCandidates: function(srcset) {
		return srcset.split(',').map(function(srcImg) {
			var stringComponents = srcImg.trim().split(' ');
			var candidate = {
				url: stringComponents[0].trim(),
				w: 0,
				h: 0,
				x: 1.0
			};

			for (var i = 1; i < stringComponents.length; i++) {
				var str = stringComponents[i].trim();
				if (str.indexOf('w', str.length - 1) !== -1) {
					console.log('parsing w: ' + parseInt(str.substring(0,str.length-1)));
					candidate.w = parseInt(str.substring(0,str.length-1));
				} else if (str.indexOf('h', str.length-1) !== -1) {
					candidate.h = parseInt(str.substring(0,str.length-1));
				} else if (str.indexOf('x', str.length-1) !== -1) {
					candidate.x = parseFloat(str.substring(0,str.length-1));
				} else {
					console.warn('Invalid parameter passed to Image srcSet: [' + str + '] in ' + srcImg);
				}
			}

			return candidate;
		});
	},

	__compare: function(a, b, state, accessorFn) {
		var aDt = accessorFn(a) - state;
		var bDt = accessorFn(b) - state;
		console.log(aDt, bDt);

		if ((aDt === 0 && bDt !== 0) ||  // a perfectly matches target but b does not
				(bDt < 0 && aDt >= 0)) // b is less than target but a is the same or better
		{
			return a;
		}

		if ((bDt === 0 && aDt !== 0) || // b perfectly matches target but a does not 
			(aDt < 0 && bDt >= 0)) // a is less than target but b is the same or better
		{
			return b;
		}

		if (Math.abs(aDt) < Math.abs(bDt)) 
		{
			return a;
		} 

		if (Math.abs(bDt) < Math.abs(aDt)) 
		{
			return b;
		}

		return a;
	},

	_matchImage: function() {
		return this.state.candidates.reduce(function(a, b) {
			if (a.x === b.x) {
				// Both have the same density so attempt to find a better one using width
				if (a.w === b.w) {
					// Both have the same width so attempt to use height
					if (a.h === b.h) {
						return a; // hey, it came first!
					} else {
						return this.__compare(a, b, this.state.h, function(img) { return img.h });
					}
				} else {
					return this.__compare(a, b, this.state.w, function(img) { return img.w });
				}
			} else {
				return this.__compare(a, b, this.state.x, function(img) { return img.x });
			}
		}.bind(this)).url;
	},

	_onResize: function() {
		// TODO: We need to time delay this, only update maybe once a second or 2
		this.setState({w: this._getWidth(), h: this._getHeight()});
	},

	_getWidth: function() {
		return window.innerWidth || document.documentElement.clientWidth;
	},

	_getHeight: function() {
		return window.innerHeight || document.documentElement.clientHeight;
	}

});
