//noinspection ThisExpressionReferencesGlobalObjectJS
(function (global) {
    var TESTS = [
        'test/curry-d'
    ];

    require({
        paths: {
            'chai': '../node_modules/chai/chai',
            'lodash': '../node_modules/lodash/lodash',
            'mocha': '../node_modules/mocha/mocha',
            'curry-d': '../src/curry-d',
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

        //noinspection JSUnresolvedVariable
        var runner = typeof global !== 'undefined' && global.mochaPhantomJS ?
            global.mochaPhantomJS : mocha;

        require(TESTS, _.bind(runner.run, runner));
    });
})(this);
