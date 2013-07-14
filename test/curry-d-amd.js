define(function (require) {
    'use strict';
    var expect = require('chai').expect;
    var _ = require('lodash');

    require('./curry-d');
    exports.test('AMD in browser', expect, _, require('curry-d'));
    exports.test('AMD in browser min', expect, _, require('curry-d-dist'));
});
