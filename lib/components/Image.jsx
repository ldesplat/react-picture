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

        return {
            updateOnResize: true,
            extra: {}
        };
    },

    getInitialState: function() {

        var nativeSupport = true;
        if (typeof this.props.nativeSupport !== 'undefined') {
            nativeSupport = this.props.nativeSupport;
        } else if (typeof document !== 'undefined') {
            var img = document.createElement('img');
            nativeSupport = ('sizes' in img) && ('srcset' in img);
        }

        return {
            w: this._getWidth(),
            h: this._getHeight(),
            x: this._getDensity(),
            candidates: this._buildCandidates(this.props.srcSet),
            nativeSupport: nativeSupport,
            debounceOnResize: this.__debounce(this._onResize, 150)
        };
    },


    componentWillReceiveProps: function(nextProps) {

        if (nextProps && nextProps.srcSet) {
            this.setState({candidates: this._buildCandidates(nextProps.srcSet)});
        }
    },


    componentDidMount: function() {

        if (this.state.nativeSupport) {
            return;
        }

        if (this.props.updateOnResize) {
            window.addEventListener('resize', this.state.debounceOnResize, false);
        }
    },


    componentWillUnmount: function() {

        if (this.state.nativeSupport) {
            return;
        }

        if (this.props.updateOnResize) {
            window.removeEventListener('resize', this.state.debounceOnResize, false);
        }
    },


    render: function() {

        if (this.state.nativeSupport) {
            return this.renderNative();
        }

        return (
            <img alt={this.props.alt} src={this._matchImage()} {...this.props.extra}/>
        );
    },


    renderNative: function() {

        return (
            <img alt={this.props.alt} src={this.state.candidates[0].url} srcSet={this.props.srcSet} {...this.props.extra} />
        );
    },


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
                    candidate.w = parseInt(str.substring(0, str.length - 1));
                } else if (str.indexOf('h', str.length - 1) !== -1) {
                    candidate.h = parseInt(str.substring(0, str.length - 1));
                } else if (str.indexOf('x', str.length - 1) !== -1) {
                    candidate.x = parseFloat(str.substring(0, str.length - 1));
                } else {
                    console.warn('Invalid parameter passed to Image srcSet: [' + str + '] in ' + srcImg);
                }
            }

            return candidate;
        });
    },


    __debounce: function(fn, wait) {

        var timeout;
        return function() {

            var self = this;
            var args = arguments;

            var later = function() {

                timeout = null;
                fn.apply(self, args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },


    __compare: function(a, b, state, accessorFn) {

        var aDt = accessorFn(a) - state;
        var bDt = accessorFn(b) - state;

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
                    }

                    return this.__compare(a, b, this.state.h, function(img) { return img.h; });
                }

                return this.__compare(a, b, this.state.w, function(img) { return img.w; });
            }

            return this.__compare(a, b, this.state.x, function(img) { return img.x; });
        }.bind(this)).url;
    },


    _onResize: function() {

        // TODO: We need to time delay this, only update maybe once a second or 2
        this.setState({w: this._getWidth(), h: this._getHeight()});
    },


    _getWidth: function() {

        if (typeof window !== 'undefined') {
            return window.innerWidth || document.documentElement.clientWidth;
        }

        return 0;
    },


    _getHeight: function() {

        if (typeof window !== 'undefined') {
            return window.innerHeight || document.documentElement.clientHeight;
        }

        return 0;
    },


    _getDensity: function() {

        if (typeof window !== 'undefined') {
            return window.devicePixelRatio;
        }

        return 1;
    }


});
