/*global curry:false,curryRight:false,uncurry:false*/
define(function (require) {
    'use strict';
    var curryD = {
        curry: curry,
        curryRight: curryRight,
        uncurry: uncurry
    };

    var expect = require('chai').expect;
    var _ = require('lodash');

    require('./curry-d');
    exports.test('Global in browser', expect, _, curryD);
});
