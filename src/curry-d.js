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
    var slice = Array.prototype.slice;
    var RIGHT = 'unshift';

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
         * @param {Array.<*>} [held=[]]
         * @return {function} A function that executes fn once it's been passed all its arguments.
         */
        return function currier(fn, len, forceOne, seal, held) {
            seal = seal !== false;
            len = !!len ? len : fn.length;

            held = held || [];
            var captured = function curried(args) {
                var next = null;
                var old = held.slice();
                args = slice.call(arguments);
                if (forceOne) {
                    held[adder](args[0]);
                }
                else {
                    // If multiple we should reverse the args when right.
                    held[adder].apply(held, reverse ? args.reverse() : args);
                }

                if (held.length < len) {
                    next = currier(fn, len, !!forceOne, !!seal, held);
                    held = old;
                    return next;
                } else {
                    if (seal) {
                        // Clear off the beginning if it's a right
                        held = !reverse ? held.slice(0, len) : held.slice(held.length - len);
                    }
                    return fn.apply(this, held);
                }
            };
            captured._fn = fn;
            return captured;
        };
    };

    exports.curry = makeCurry('push');
    exports.curryRight = exports.curry.r = makeCurry(RIGHT);
    exports.uncurry = exports.curry.un = function (curried) {
        return curried._fn || curried;
    };
}));
