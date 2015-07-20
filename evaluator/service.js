'use strict';

var 
restify = require('restify'),
Consumer = require('./consumer.js'),
consumer = new Consumer();

//set up the server 
var server = restify.createServer({
    name: 'evaluator-service',
    version: '0.0.1'
});

server
    .use(restify.acceptParser(server.acceptable))
    .use(restify.queryParser())
    .use(restify.bodyParser());
 

//only API supported by the service
server.get('/evaluator/:expression', function (req, res, next) {
    console.log('request received for expression: ' + req.params.expression);
    var responseObj = consumer.evaluateExpression(req.params.expression);
    console.log('response object is: ' + JSON.stringify(responseObj));
    res.send(responseObj);
    return next();
});
 
server.listen(8080, function () {
    console.log('%s listening..', server.name);
});