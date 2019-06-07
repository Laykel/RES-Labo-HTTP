# HTTP Infrastructure Lab

Authors: _Alison Savary, Luc Wachter_

## Step 1: Static Apache httpd server

- A docker image ready to setup a static Apache `httpd` server to serve a simple bootstrap landing page.
- Full documentation in directory `1_httpd-php-static`'s readme: [link](1_httpd-php-static/README.md).

## Step 2: Dynamic express.js server

- A docker image ready to setup a dynamic `express.js` server, built on `Node.js`.
- It serves a random number of witty comments in JSON through HTTP.
- Full documentation in directory `2_express-dynamic`'s readme: [link](2_express-dynamic/README.md).

## Step 3: Reverse proxy with apache (static configuration)

- A docker image ready to setup a simple reverse proxy using Apache `httpd`.
- Warning: this setup uses hardcoded IP addresses for the content servers. It isn't a good idea.
- Full documentation in directory `3_httpd-reverse-proxy`'s readme: [link](3_httpd-reverse-proxy/README.md).

## Step 4: AJAX requests with JQuery

- For this step, no new docker image was created.
- What was changed is how the first step's website behaves.
  - It now shows a "funny" loading message in green right below the "Not a lab" title.
  - This message is updated every 5 seconds.
  - The only changes are in `index.html`, where the script is imported and where an h2 tag (with id "loading") is added.
  - The file `joke.js` is created with the code necessary to update the tag.
- In order to do this, it makes an ajax request (using JQuery) to our dynamic Express.js server, and displays the first message in the array.
- This wouldn't work without a reverse proxy because of the **same-origin policy**.
  - The website comes from one static server while the dynamic content comes from another.
  - This isn't allowed by the browser, but the reverse proxy is a single origin, so this works.

## Step 5: Dynamic reverse proxy configuration

- Copied from step 3, with the following changes.
