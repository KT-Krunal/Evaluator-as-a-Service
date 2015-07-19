InVisionApp
==========

### Introduction
A simple project to showcase Producer/Consumer concept to evaluate math expressions. In this system the Generator sends a series of random arithmetic expressions, while the Evaluator will accept these expressions, compute the result and then report the solution to the Generator.

Evaluator/Consumer is a RESTful API service. Generator generates the expression and sends the request every half second.

### Installation

- download the code
- go to the directory from command prompt/terminal
- run following command
```node
$> npm install InVisionApp
```

## Running the application

- Start the evaluator service first in termial/command prompt.
```node
$> node evaluator/service.js
```

- Start the generator in another termial/command prompt. Application allows to run any number of generators. Just open new terminal window/command prompt and run the command
```node
$> node generator/app.js
```

