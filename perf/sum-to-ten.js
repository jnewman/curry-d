'use strict';

var _ = require('lodash');
var curry = require('curry');
var curryD = require('../src/curry-d');

var sum = function () {
    return _.reduce(arguments, function (total, n) {
        return total + n;
    });
};

var adders = [
    function (a) {
        return sum.apply(null, arguments);
    },
    function (a, b) {
        return sum.apply(null, arguments);
    },
    function (a, b, c) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d, e) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d, e, f) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d, e, f, g) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d, e, f, g, h) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d, e, f, g, h, i) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d, e, f, g, h, i, j) {
        return sum.apply(null, arguments);
    }
];

var sumOneByOne = function (currier, times) {
    _.reduce(_.range(1, times), function (adder, n) {
        return adder(n);
    }, currier(adders[times - 1]))(1);
};

module.exports = {
    title: 'Curry sum showdown',

    tests: {
        'curry': function () {
            var sumByOneWCurry = _.partial(sumOneByOne, curry);
            sumByOneWCurry(10);    
            sumByOneWCurry(9);    
            sumByOneWCurry(8);    
            sumByOneWCurry(7);    
            sumByOneWCurry(6);    
            sumByOneWCurry(5);    
            sumByOneWCurry(4);    
            sumByOneWCurry(3);    
            sumByOneWCurry(2);    
        },

        'curry-d': function () {
            var sumByOneWCurryD = _.partial(sumOneByOne, curryD.curry);
            sumByOneWCurryD(10);    
            sumByOneWCurryD(9);    
            sumByOneWCurryD(8);    
            sumByOneWCurryD(7);    
            sumByOneWCurryD(6);    
            sumByOneWCurryD(5);    
            sumByOneWCurryD(4);    
            sumByOneWCurryD(3);    
            sumByOneWCurryD(2);
        }
    }
};
