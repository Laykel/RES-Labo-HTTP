$(function() {
  function loadJokes() {
    // Query our dynamic server
    $.getJSON("/api/jokes/", function(jokes) {
      // Log the jokes
      console.log(jokes);
      // Default message
      let message = "No joke today";

      if (jokes.length > 0) {
        message = jokes[0].message;
      }

      // Write the message at the right place in the HTML
      $("#loading").text(message);
    });
  }

  loadJokes();
  setInterval(loadJokes, 5000);
});