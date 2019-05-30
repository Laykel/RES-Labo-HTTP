const fun = require('loader-message');
const express = require('express');

const app = express();

const port = 2205;

app.get('/', (request, response) => {
  response.send(fun.phrase());
}).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
