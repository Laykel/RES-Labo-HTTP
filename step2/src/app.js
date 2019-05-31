const express = require('express');
const joke = require('./joke.js');

const app = express();
const port = 3000;

// Route requests to root
app.get('/', (request, response) => {
  // Log the headers (debug)
  console.log(request.headers);
  // Send JSON back to host
  response.json(joke.generateMessages());
}).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
