(function () {
    'use strict';

    var expect = require('chai').expect;
    var _ = require('lodash');

    require('./curry-d').test('Require in Node', expect, _, require('../src/curry-d'));
})();
