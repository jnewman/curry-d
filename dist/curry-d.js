/*global exports:true,define:false*/
/*jshint maxstatements:20*/
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
    var slice = Array.prototype.slice;
    var RIGHT = 'right';

    var makeCurry = function (adder) {
        var reverse = adder === RIGHT;

        /**
         * Make a function that returns another function until it has all its arguments. Note that
         * the function === the return value until it's called w/ the specified arguments.
         *
         * @param {function} fn
         * @param {number} [len=fn.length] Forces the collected arguments to a specific value.
         * @param {boolean} [forceOne=false] Whether to prevent more than one arg at a time.
         * @param {boolean} [seal=true] Whether to prevent args beyond the len.
         * @param {Array.<*>} [held=[]] Arguments fro a previous call.
         * @return {function} A function that executes fn once it's been passed all its arguments.
         */
        return function currier(fn, len, forceOne, seal, held) {
            len = !!len ? len : fn.length;
            forceOne = !!forceOne;
            seal = seal !== false;
            held = held || [];
            var position = held.length;
            var captured = function curried(args) {
                var oldPosition = position;
                var nextHeld = held.slice();
                if (forceOne) {
                    nextHeld[position++] = args;
                }
                else {
                    nextHeld = nextHeld.concat(slice.call(arguments));
                }

                var next = null;
                var nextLen = nextHeld.length;
                if (nextLen < len) {
                    next = currier(fn, len, forceOne, seal, nextHeld);
                    position = oldPosition;
                    return next;
                } else {
                    if (seal) {
                        // Clear off the beginning if it's a right
                        if (reverse) {
                            nextHeld.reverse().splice(0, nextLen - len);
                            return fn.apply(this, nextHeld);
                        }
                        // Clear extras.
                        else {
                            return fn.apply(this, nextHeld.slice(0, len));
                        }
                    }
                    else {
                        return fn.apply(this, reverse ? nextHeld.reverse() : nextHeld);
                    }
                }
            };
            captured._fn = fn;
            return captured;
        };
    };

    exports.curry = makeCurry();
    exports.curryRight = exports.curry.r = makeCurry(RIGHT);
    exports.uncurry = exports.curry.un = function (curried) {
        return curried._fn || curried;
    };
}));
