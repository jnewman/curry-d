/*global exports:true,define:false*/
//noinspection ThisExpressionReferencesGlobalObjectJS
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory(root);
    }
}(this, function (exports) {
    'use strict';
    var slice = [].slice;

    var makeCurry = function (adder) {
        /**
         * Make a function that returns another function until it has all its arguments. Note that
         * the function === the return value until it's called w/ the specified arguments.
         *
         * @param {function} fn
         * @param {number} [len=fn.length] Forces the collected arguments to a specific value.
         * @return {function} A function that executes fn once it's been passed all its arguments.
         */
        return function curry(fn, len) {
            len = !!len ? len : fn.length;
            var held = [];
            return function curried(args) {
                curried._fn = fn;
                held[adder].apply(held, slice.call(arguments, 0));
                if (held.length < len) {
                    return curried;
                } else {
                    return fn.apply(this, held);
                }
            };
        };
    };

    exports.curry = makeCurry('push');
    exports.curryRight = exports.curry.r = makeCurry('unshift');
    exports.uncurry = exports.curry.un = function (curried) {
        return curried._fn;
    };
}));
