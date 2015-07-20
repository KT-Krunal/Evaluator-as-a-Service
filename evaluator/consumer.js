'use strict';
/**
* @class validates the expression and returns the result
* currently it only supports + and - operations
* it only allows positive integers 
* it only allows 2 values
*/
var Consumer = function() {

    //possible error codes
    var errorCodes = {
        unSupportedOperation: 100,
        expressionNullEmpty: 101,
        invalidExpression: 102
    }

    /**
    * @function validate expression
    *
    * @param {String} expression
    * @returns {valid: true|false, errorCode: 'code', value1: 'value 1', value2: 'value 2', operation: 'operation'}
    */ 
    this.validateExpression = function(expression) {
        //check expression is not null or empty
        if(!expression) {
            return {
                valid: false,
                errorCode: errorCodes.expressionNullEmpty
            }
        }

        //check expression has 2 positive numbers and contains supported math operation in between
        if(!(/^\d*[-+]\d*$/.test(expression))) {
            return {
                valid: false,
                errorCode: errorCodes.invalidExpression
            }
        }

        //parse the values and operation
        var values = expression.split(/[+-]/);

        return {
            valid: true,
            value1: parseInt(values[0]),
            value2: parseInt(values[1]),
            operation: expression.charAt(values[0].length)
        }
    };


    /**
    * @function resolves the mathemetical expression and returns response object
    * @param {String} expression - it's a string with 2 positive integers in the front and end, seperated by supported 
    * mathematical operation (currently + and - only)

    * @returns {resolved: true|false, errorCode: 'code', result: 'result', expression: 'expression'}
    */
    this.evaluateExpression = function(expression) {
        //let's decode the expression and make sure it's valid
        var result = this.validateExpression(expression);
        var responseObj = {};
        responseObj.expression = expression;
        if(result.valid === true) {
            switch(result.operation) {
                case '+':
                    responseObj.result = result.value1 + result.value2;
                    responseObj.resolved = true;
                    break;
                case '-':
                    responseObj.result = result.value1 - result.value2;
                    responseObj.resolved = true;
                    break;
                default:
                    responseObj.resolved = false;
                    responseObj.errorCode = errorCodes.unSupportedExpression;
                    break;

            }
        } else {
            responseObj.resolved = false;
            responseObj.errorCode = result.errorCode;
        };

        return responseObj;

    };
};

module.exports = Consumer;
