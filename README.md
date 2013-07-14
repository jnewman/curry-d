# curry-d

An implementation of curry that uses a dispatcher to achieve arbitrary curry length. This micro
library trades the ability to check arity with length (it's len instead) for
[~2.2x](https://github.com/jnewman/curry-d/blob/master/perf/samples.csv) perf on high arity
functions and 1.2x on <= 10  and increased flexibility (decide if there should be only one arg and
allow extra args).

[![Build Status](https://api.travis-ci.org/jnewman/curry-d.png?branch=master)](https://travis-ci.org/jnewman/curry-d)  

[![Browser Support](https://ci.testling.com/jnewman/curry-d.png)](https://ci.testling.com/jnewman/curry-d)

## Usage

### Node

Install as usual:

    npm install curry-d

Functions are props of exports

    var bint = require('curry-d').curryRight(parseInt)(2);
    bint('101010'); // 42

### RequireJS

Add the path to curry-d, then require as usual:

    define(function () {
        var bint = require('curry-d').curryRight(parseInt)(2);
        bint('101010'); // 42
    });

### Globally in the browser

    var bint = curryRight(parseInt)(2);
    bint('101010'); // 42

## Functions

This module exports three functions: curry, curryRight, and uncurry.

### curry

curry fills a functions signature from left to right until all args are defined:

    var add = function (a, b) {
        return a + b;
    };

    // add.length === 2, so it must be given two args.
    var curried = curry(add)(40); // a function
    curried(2); // 42

In case you need to curry a varargs function you can specify the number of arguments desired at
curry time:

    var sum = function () {
        return require('lodash').reduce(arguments, function (total, n) {return total + n;});
    };

    var curried = curry(sum)(40); // undefined
    var curried = curry(sum, 2)(40); // a function
    curried(2); // 42

You can optionally add multiple arguments in each call:

    curry(sum, 2)(40, 2); // 42

Unless you want to force a single argument per call (handy w/ e.g., _.forEach):

    curry(sum, 2, true)(40, 99)(2); // 42

However, you cannot overflow your arguments:

    curry(sum, 2)(40, 2, 99); // 42

Unless you really want to:

    curry(sum, null, null, false)(40, 2, 99); // 141

### curryRight

curryRight works just like curry, but in the opposite direction:

    var divide = function (a, b) {
        return a / b;
    };

    curry(divide)(1, 2); // .5

    curryRight(divide)(1, 2); // 2

### uncurry

uncurry takes a curried function and returns the original. Handy if you've curried something but
need the original too. Or if you're unsure if something is curried, uncurry is a noop if the
function is not curried:

    uncurry(curry(divide)(1)) === divide; // true


