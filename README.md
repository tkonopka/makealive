# makealive

`makealive` brings static html documents to life through controlled use of javascript.

## Documentation

See the [webpage](https://github.io/tkonopka/makealive) for background and usage details.


## Installation

Clone the repository and run the following `npm` commands

```
npm run build
npm run minify
```

Upon completion the `dist` directory should contain files `makelive.min.js` and 
`makealive-lib.min.js`. The first file contains the core library. The second file 
contains the core library plus all conversion functions from the `lib` directory. 

To create a custom build (core package plus a small set of conversion functions),
concatenate the core `src/makealive.js` file with conversion functions of choice.



### License

The core library is released under the MIT License.

Feedback, comments, and contributions are welcome.
