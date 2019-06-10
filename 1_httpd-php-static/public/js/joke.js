// Generates requests to /api/jokes/ every 5 seconds
// Replaces whatever text is in the "loading" tag id

$(function() {
  function loadJokes() {
    // Query our dynamic server
    $.getJSON("/api/jokes/", function(jokes) {
      // Log the jokes
      console.log(jokes);
      // Default message
      let message = "No joke today";

      if (jokes.messages.length > 0) {
        message = jokes.messages[0];
      }

      // Write the message at the right place in the HTML
      $("#loading").text(message);
    });
  }

  loadJokes();
  setInterval(loadJokes, 5000);
});