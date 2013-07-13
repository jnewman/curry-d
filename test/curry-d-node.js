(function () {
    'use strict';

    var curryD = require('../src/curry-d');

    var expect = require('chai').expect;
    var _ = require('lodash');

    require('./curry-d').test('Require in Node', expect, _, curryD);
})();
