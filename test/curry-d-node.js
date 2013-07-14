(function () {
    'use strict';
    require('./curry-d').test(
        'Require in Node',
        require('chai').expect,
        require('lodash'),
        require('../')
    );
})();
