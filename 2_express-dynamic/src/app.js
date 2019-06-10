// Express.js server that sends JSON payloads to clients
// Listens for HTTP requests on port 3000

const express = require('express');
const uuid = require('uuid/v4');
const joke = require('./joke.js');

const app = express();
const port = 3000;

// Unique id for this server
const id = uuid();

// Route requests to root
app.get('/', (request, response) => {
  // Log the headers (debug)
  console.log(request.headers);

  const payload = {
    serverId: id,
    timestamp: new Date().toISOString(),
    messages: joke.generateMessages(),
  };

  // Send JSON back to host
  response.json(payload);
}).listen(port, () => {
  console.log(`Listening on port ${port}`);
});
