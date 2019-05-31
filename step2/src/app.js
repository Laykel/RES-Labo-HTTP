const express = require('express');
const joke = require('./joke.js');

const app = express();
const port = 2205;

// Route requests to root
app.get('/', (request, response) => {
  response.send(joke.generateMessages());
}).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
