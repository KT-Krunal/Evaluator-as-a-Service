var restify = require('restify');

var client = restify.createJsonClient({
  url: 'http://127.0.0.1:8080'
});

/**
* @class generates expression, requests the evaluation and prints out the result
*/
function Producer() {
    var 
    from = 1,
    to = 1000,
    self = this,
    //private methods
    getRandomInteger,
    evaluateExpression;

    /**
    * @function generates random integer within the range
    * 
    * @returns {Number} 
    */
    getRandomInteger = function() {
        return from + Math.floor(Math.random() * (to-from));
    };

    /**
    * @function sends expression to evaluator and prints out the result
    * 
    * @param {String} expression
    *   @example 5+15
    */
    solveExpression = function(expression) {
        client.get('/evaluator/' + expression, function(err, req, res, data) {
            if(err) {
                console.log('expression could not be evaluated. Error:' + err);
            } else {
                if(data.resolved === true) {
                    console.log('result for the expression ' + data.expression + ' is ' + data.result);
                } else {
                    console.log('failed to resolve expression ' + data.expression + ' with error code' + data.errorCode);
                }
            }
        }
    )};

    /**
    * @function this method sets up the timer and sends generated expression for evaluation
    */
    this.produce = function() {
        var expression = getRandomInteger() + '+' + getRandomInteger();
        console.log('generated expression is: ' + expression);
        //make API call and get the result
        solveExpression(expression);
        //set timer of 1 sec to generate new expression and request
        setTimeout(self.produce, 500);
    };
}

var producer = new Producer();
producer.produce();

