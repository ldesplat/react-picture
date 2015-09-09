# react-picture
[![Build Status](https://travis-ci.org/ldesplat/react-picture.svg?branch=master)](https://travis-ci.org/ldesplat/react-picture)

React component for rendering responsive images. Attempts to implement `<img srcset=...>` support in non-compliant browsers, otherwize renders the native `<img srcset>`. Will eventually support Picture & Source elements.

## How to use

```npm install react-picture```

Then use in your react app like so:

```
var Img = require('react-picture').Image;
...
   render: function() {
   	  var imgs = '//placebacon.net/200/150 600w, //placebacon.net/300/300 800w';

      return (
      	<Img alt='Your picture description' srcSet={imgs} extra={{className:'myImg'}}/>
      );
   }
...
```

The following properties can be passed to the Image component:
- `alt` - Required and describes your picture
- `srcSet` - Required and consists of a string formated like srcset
- `extra` - Optional object which contains properties that will be put on img tag

## Features

- Use `<img srcset>` when supported
- Implement srcset support for browsers that do not have it, using javascript. Currently missing sizes implementation.

## Roadmap

### 0.1.0
- Implement sizes attribute

### 1.0
- Stable API
- Correct implementation of match method
- ~~Verify srcset feature detection~~
- ie8 & up browser support (w/React polyfills only)
- Performance optimizations
- ~~Ismorphic support~~
- 100% test coverage
- ~~Travis CI~~

### To be discussed
- PictureContainer
- Karma tests

### 2.0
- Picture element
- Source element

## References

- [The picture element](http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#the-picture-element)
- [The img element](http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#the-img-element)

## Alternative libraries

- If you are not using react in your app, [BBC-News/Imager.js](https://github.com/BBC-News/Imager.js) is a very good library
- srcset polyfill [borismus/srcset-polyfill](https://github.com/borismus/srcset-polyfill)
- picture polyfill [scottjehl/picturefill](https://github.com/scottjehl/picturefill)

## Acknowledgements

- React's excellent library & documentation
- Ryan Florence's components on github which were stolen to start up (webpack setup, browserify, scripts)
- [This excellent article](http://www.html5rocks.com/en/mobile/high-dpi/)
