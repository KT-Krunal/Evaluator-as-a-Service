var expect    = require("chai").expect;
var Consumer = require("../evaluator/consumer.js");
var consumer = new Consumer();

describe("Consumer", function() {
    describe("validateExpression check", function() {
        it("returns valid=false in result object when expression is null", function() {

            var result = {};

            result = consumer.validateExpression();
            expect(result.valid).to.be.equal(false);
        });

        it("returns errorCode=101 in result object when expression is null", function() {

            var result = {};

            result = consumer.validateExpression();
            expect(result.errorCode).to.be.equal(101);
        });

        it("returns errorCode=102 in result object when unsupported operation is passed", function() {

            var result = {};

            result = consumer.validateExpression("5*5");
            expect(result.errorCode).to.be.equal(102);

            result = consumer.validateExpression("5/5");
            expect(result.errorCode).to.be.equal(102);

            result = consumer.validateExpression("5%5");
            expect(result.errorCode).to.be.equal(102);
        });

        it("returns errorCode=102 in result object when value(s) in expression is not positive", function() {

            var result = {};

            result = consumer.validateExpression("-5+5");
            expect(result.errorCode).to.be.equal(102);

        });

        it("returns errorCode=102 in result object when expression has more than 2 values", function() {

            var result = {};

            result = consumer.validateExpression("5+5+5");
            expect(result.errorCode).to.be.equal(102);

        });

        it("returns valid=true in result object when valid expression is passed", function() {

            var result = {};

            result = consumer.validateExpression("5+5");
            expect(result.valid).to.be.equal(true);

        });

        it("returns value1=100, value2=10, operation=+ in result object when expression is 100+10", function() {

            var result = {};

            result = consumer.validateExpression("100+10");
            expect(result.valid).to.be.equal(true);
            expect(result.value1).to.be.equal(100);
            expect(result.value2).to.be.equal(10);
            expect(result.operation).to.be.equal('+');
        });
    });

    describe("evaluateExpression check", function() {
        it("returns result=100 in response object when expression is 90+10", function() {

            var result = {};

            result = consumer.evaluateExpression("90+10");
            expect(result.result).to.be.equal(100);
        });


        it("returns result=80 in response object when expression is 90-10", function() {

            var result = {};

            result = consumer.evaluateExpression("90-10");
            expect(result.result).to.be.equal(80);
        });
    });

});