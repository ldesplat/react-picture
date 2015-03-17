var React = require('react');
var Utils = require('../utils');


/** Equivalent to html <img> element
  *
  * <img alt src srcset sizes crossorigin usemap ismap width height>
  */
var ImageComponent = module.exports = React.createClass({


    propTypes: {
        srcSet: React.PropTypes.string.isRequired,
        alt: React.PropTypes.string.isRequired,
        extra: React.PropTypes.object
    },


    getDefaultProps: function () {

        return {
            extra: {}
        };
    },


    getInitialState: function () {

        var nativeSupport = true;
        if (typeof document !== 'undefined') {
            var img = document.createElement('img');
            nativeSupport = 'srcset' in img;
        }

        return {
            w: Utils.getWidth(),
            h: Utils.getHeight(),
            x: Utils.getDensity(),
            nativeSupport: nativeSupport
        };
    },


    componentDidMount: function () {

        if (!this.state.nativeSupport) {
            window.addEventListener('resize', this.resizeThrottler, false);
        }
    },


    componentWillUnmount: function () {

        if (!this.state.nativeSupport) {
            window.removeEventListener('resize', this.resizeThrottler, false);
        }
    },


    render: function () {

        if (!this.props.srcSet) {
            return null;
        }

        var candidates = ImageComponent._buildCandidates(this.props.srcSet);

        if (this.state.nativeSupport) {
            return this.renderNative(candidates);
        }

        return (
            <img alt={this.props.alt} src={ImageComponent._matchImage(candidates, Utils.getHeight(), Utils.getWidth(), Utils.getDensity())} {...this.props.extra}/>
        );
    },


    renderNative: function (candidates) {

        return (
            <img alt={this.props.alt} src={candidates[0].url} srcSet={this.props.srcSet} {...this.props.extra} />
        );
    },


    // Taken from https://developer.mozilla.org/en-US/docs/Web/Events/resize
    resizing: false,
    resizeThrottler: function () {

        if (!this.resizing) {
            this.resizing = true;

            if (window && window.requestAnimationFrame) {
                window.requestAnimationFrame(this.onResize);
            } else {
                setTimeout(this.onResize, 66);
            }
        }
    },


    onResize: function () {

        this.setState({w: Utils.getWidth(), h: Utils.getHeight(), x: Utils.getDensity()});
        this.resizing = false;
    },


    statics: {

        _buildCandidates: function (srcset) {

            return srcset.split(',').map(function (srcImg) {

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


        __compare: function (a, b, state, accessorFn) {

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


        _matchImage: function (candidates, height, width, density) {

            if (!candidates || candidates.length === 0) {
                return null;
            }

            return candidates.reduce(function (a, b) {

                if (a.x === b.x) {
                    // Both have the same density so attempt to find a better one using width
                    if (a.w === b.w) {
                        // Both have the same width so attempt to use height
                        if (a.h === b.h) {
                            return a; // hey, it came first!
                        }

                        return ImageComponent.__compare(a, b, height, function (img) { return img.h; });
                    }

                    return ImageComponent.__compare(a, b, width, function (img) { return img.w; });
                }

                return ImageComponent.__compare(a, b, density, function (img) { return img.x; });
            }).url;
        }
    }
});
