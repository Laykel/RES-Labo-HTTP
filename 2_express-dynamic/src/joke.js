// Module that exports a function to generate an array of funny messages
// Uses the loader-message npm module

const fun = require('loader-message');

// Generate random int between min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate and return a witty comment and its timestamp
exports.generateMessages = () => {
  const nbrOfMessages = randomIntFromInterval(0, 10);

  const messages = [];

  for (let i = 0; i < nbrOfMessages; i += 1) {
    messages.push(fun.phrase());
  }

  return messages;
};
