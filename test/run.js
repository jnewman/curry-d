(function (global) {
    var TESTS = [
        'test/curry-d-amd',
        'test/curry-d-global'
    ];

    require({
        paths: {
            'chai': '../node_modules/chai/chai',
            'lodash': '../node_modules/lodash/lodash',
            'mocha': '../node_modules/mocha/mocha',
            'curry-d': '../src/curry-d',
            'curry-d-dist': '../dist/curry-d.min',
            'test': '.'
        },

        shim: {
            mocha: {
                exports: 'mocha'
            }
        }
    });

    require([
        'require',
        'lodash',
        'mocha'
    ], function (
        require,
        _,
        mocha
    ) {
        'use strict';
        _.noConflict();

        mocha.ui('bdd');
        mocha.reporter('html');

        var runner = typeof global !== 'undefined' && global.mochaPhantomJS ?
            global.mochaPhantomJS : mocha;

        require(TESTS, _.bind(runner.run, runner));
    });
})(this);
