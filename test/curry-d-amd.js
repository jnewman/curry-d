define(function (require) {
    'use strict';
    var curryD = require('curry-d');

    var expect = require('chai').expect;
    var _ = require('lodash');

    require('./curry-d');
    exports.test('AMD in browser', expect, _, curryD);
});
