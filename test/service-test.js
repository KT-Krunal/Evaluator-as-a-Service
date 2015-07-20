var expect = require("chai").expect;
var restify = require('restify');

var client = restify.createJsonClient({
  url: 'http://127.0.0.1:8080'
});

describe("Expression Evaluator API", function() {

    describe("evaluate expression using API call", function() {

        it("returns status 200", function() {
            client.get('/evaluator/10+10', function(err, req, res, data) {
                expect(res.statusCode).to.equal(200);
            });
        });

        it("returns result of response object to 20 when expression is 10+10", function() {
            client.get('/evaluator/10+10', function(err, req, res, data) {
                expect(data.result).to.equal(20);
            });
        });
    });
});