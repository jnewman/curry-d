/*jshint evil:true*/
define([
    'mocha', 'chai',
    'lodash',
    'curry-d'
], function (
    mocha, chai,
    _,
    curryD
) {
    'use strict';
    var expect = chai.expect;
    var curry = curryD.curry;
    var curryRight = curryD.curryRight;
    var uncurry = curryD.uncurry;

    var fns = null;
    beforeEach(function () {
        fns = {
            add2: function (a, b) {
                return a + b;
            },
            add3: function (a, b, c) {
                return a + b + c;
            },
            add20: function () {
                var sum = 0;
                for (var args = _.toArray(arguments); args.length > 0;) {
                    sum += args.pop();
                }
                return sum;
            },
            div5: function (a, b, c, d, e) {
                return a / b / c / d / e;
            },
            mkNums: function (size) {
                var ns = [];
                for (var i = 1; i <= size; ++i) {
                    ns.push(i);
                }
                return ns;
            }
        };
    });

    afterEach(function () {
        fns = null;
    });

    var assertNumericCurriedByLength = function (currier, toCurry, len, total, fudge) {
        var curried = currier(toCurry);

        var oneShort = _.reduce(fns.mkNums(len - 1), function (c, num) {
            var ced = c(num);
            expect(ced).to.be.a('function');
            return ced;
        }, curried);

        var result = oneShort(len);
        expect(result).to.be.a('number');
        expect(result).to.closeTo(total, fudge || 0);
    };

    var verifyFnLength = function (currier, forward) {
        it('returns a function until it reaches its length', function () {
            assertNumericCurriedByLength(currier, fns.add2, 2, 3);
            assertNumericCurriedByLength(currier, fns.add3, 3, 6);

            var nums = fns.mkNums(5);
            if (forward === false) {
                nums.reverse();
            }
            assertNumericCurriedByLength(currier, fns.div5, 5, eval(nums.join('/')), 0.001);
        });
    };

    var assertNumericCurriedByForce = function (currier, toCurry, len, total, fudge) {
        return assertNumericCurriedByLength(
            _.partialRight(currier, len),
            toCurry,
            len,
            total,
            fudge
        );
    };

    var verifryForcedLength = function (currier, forward) {
        it('returns a function until it reaches forced size', function () {
            assertNumericCurriedByForce(currier, fns.add2, 2, 3);
            assertNumericCurriedByForce(currier, fns.add3, 3, 6);
            assertNumericCurriedByForce(currier, fns.add20, 20, 210);

            var nums = fns.mkNums(5);
            if (forward === false) {
                nums.reverse();
            }

            assertNumericCurriedByForce(currier, fns.div5, 5, eval(nums.join('/')), 0.001);
        });
    };

    describe('curry', function () {
        verifyFnLength(curry);
        verifryForcedLength(curry);
    });

    describe('curry right', function () {
        verifyFnLength(curryRight, false);
        verifryForcedLength(curryRight, false);
    });


    describe('uncurry', function () {
        var checkAdd2 = function (currier) {
            expect(uncurry(currier(fns.add2)(99))(42, 42)).to.equal(84);
        };

        var checkAdd20 = function (currier) {
            expect(uncurry(currier(fns.add20, 20)(99)).apply(null, fns.mkNums(20))).to.equal(210);
        };

        it('can be uncurry', function () {
            checkAdd2(curry);
            checkAdd20(curry);
        });

        it('can be uncurryRight', function () {
            checkAdd2(curryRight);
            checkAdd20(curryRight);
        });
    });
});
