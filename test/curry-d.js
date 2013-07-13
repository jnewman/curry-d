/*jshint evil:true,maxstatements:1000*/
exports = typeof exports === 'undefined' ? {} : exports;
exports.test = function (expect, _, curryD) {
    var curry = curryD.curry;
    var curryRight = curry.r;
    var uncurry = curry.un;

    var fns = null;
    beforeEach(function () {
        fns = {
            add2: function (a, b) {
                return a + b;
            },
            add3: function (a, b, c) {
                return a + b + c;
            },
            sum: function () {
                var sum = 0;
                for (var args = _.toArray(arguments); args.length > 0;) {
                    sum += args.pop();
                }
                return sum;
            },
            div5: function (a, b, c, d, e) {
                return a / b / c / d / e;
            },
            wideRange: function (last) {
                return _.range(1, last + 1);
            }
        };
    });

    afterEach(function () {
        fns = null;
    });

    var assertNumericCurriedByLength = function (currier, toCurry, len, total, fudge) {
        var curried = currier(toCurry);

        var oneShort = _.reduce(fns.wideRange(len - 1), function (c, num) {
            var ced = c(num);
            expect(ced).to.be.a('function');
            return ced;
        }, curried);

        var result = oneShort(len);
        expect(result).to.be.a('number');
        expect(result).to.be.closeTo(total, fudge || 0);
    };

    var verifyFnLength = function (currier, forward) {
        it('returns a function until it reaches its length', function () {
            assertNumericCurriedByLength(currier, fns.add2, 2, 3);
            assertNumericCurriedByLength(currier, fns.add3, 3, 6);

            var nums = fns.wideRange(5);
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

    var verifyForcedLength = function (currier, forward) {
        it('returns a function until it reaches forced size', function () {
            assertNumericCurriedByForce(currier, fns.add2, 2, 3);
            assertNumericCurriedByForce(currier, fns.add3, 3, 6);
            assertNumericCurriedByForce(currier, fns.sum, 20, 210);

            var nums = fns.wideRange(5);
            if (forward === false) {
                nums.reverse();
            }

            assertNumericCurriedByForce(currier, fns.div5, 5, eval(nums.join('/')), 0.001);
        });
    };

    var verifyAllowsMultiple = function (currier) {
        it('allows extra arguments', function () {
            var curried = currier(fns.sum, 11);

            var oneShort = _.reduce(fns.wideRange(5), function (c, n) {
                var result = c(n, 1);
                expect(result).to.be.a('function');
                return result;
            }, curried);

            expect(oneShort(1)).to.equal(21);
        });
    };

    var verifyForcesSingle = function (currier) {
        it('goes one-by-one if forceOne', function () {
            var curried = _.partialRight(currier, null, true, true)(fns.add3);

            var oneShort = _.reduce(fns.wideRange(2), function (c, n) {
                var result = c(n, 99, 114);
                expect(result).to.be.a('function');
                return result;
            }, curried);

            expect(oneShort(3)).to.equal(6);
        });
    };

    var verifyPreventsArgOverflow = function (currier) {
        it('stops taking arguments when the length is filled', function () {
            var curried = currier(fns.sum, 11);

            var oneShort = _.reduce(fns.wideRange(5), function (c, n) {
                var result = c(n, 1);
                expect(result).to.be.a('function');
                return result;
            }, curried);

            expect(oneShort(1, 999, 141, 1)).to.equal(21);
        });
    };

    describe('curry', function () {
        verifyFnLength(curry);
        verifyForcedLength(curry);
        verifyAllowsMultiple(curry);
        verifyForcesSingle(curry);
        verifyPreventsArgOverflow(curry);
    });

    describe('curry right', function () {
        verifyFnLength(curryRight, false);
        verifyForcedLength(curryRight, false);
        verifyAllowsMultiple(curryRight);
        verifyForcesSingle(curryRight);
        verifyPreventsArgOverflow(curryRight);
    });


    describe('uncurry', function () {
        var checkAdd2 = function (currier) {
            expect(uncurry(currier(fns.add2)(99))(42, 42)).to.equal(84);
        };

        var checkAdd20 = function (currier) {
            expect(uncurry(currier(fns.sum, 20)(99)).apply(null, fns.wideRange(20))).to.equal(210);
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
};
