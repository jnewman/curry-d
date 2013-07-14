'use strict';

var _ = require('lodash');
var curry = require('curry');
var curryD = require('../src/curry-d');

'use strict';

var _ = require('lodash');

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
    },
    function (a, b, c, d, e, f, g, h, i, j, k) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d, e, f, g, h, i, j, k, l) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d, e, f, g, h, i, j, k, l, m) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
        return sum.apply(null, arguments);
    },
    function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
        return sum.apply(null, arguments);
    }
];

var sumOneByOne = function (currier, times) {
    _.reduce(_.range(1, times), function (adder, n) {
        return adder(n);
    }, currier(adders[times - 1]))(1);
};

module.exports = {
    title: 'Curry sum to ten showdown',

    tests: {
        'curry': function () {
            var sumByOneWCurry = _.partial(sumOneByOne, curry);
            sumByOneWCurry(11);
            sumByOneWCurry(12);
            sumByOneWCurry(13);
            sumByOneWCurry(14);
            sumByOneWCurry(15);
        },

        'curry-d': function () {
            var sumByOneWCurryD = _.partial(sumOneByOne, curryD.curry);
            sumByOneWCurryD(11);
            sumByOneWCurryD(12);
            sumByOneWCurryD(13);
            sumByOneWCurryD(14);
            sumByOneWCurryD(1);
        }
    }
};
