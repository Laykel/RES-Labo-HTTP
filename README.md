# HTTP Infrastructure Lab

_Authors: Alison Savary, Luc Wachter_

## Step 1: Static Apache httpd server

- In directory `1_httpd-php-static`.
- Maybe a small schema here.
- Using the `php:7.3-apache` docker image.
- Using the [Grayscale](https://startbootstrap.com/previews/grayscale/) free bootstrap theme.
- `docker run -d -p 2205:80 php:7.3-apache`
- Then we can `telnet 127.0.0.1 2205`, and `GET HTTP/1.1 /`.
  - We get an error, because we don't have access to the server's root.
- Once our `Dockerfile` is done, `docker build -t res/apache-static .`
- Then, `docker run -d -p 2205:80 res/apache-static .`
- And we can see our sources served by the server at address `127.0.0.1:2205`.

## Step 2: Dynamic express.js server

- In directory `2_express-dynamic`.
- Using port 3000.
- Maybe a small schema here.
- Using the "loader-message" npm module to generate witty comments.
- Addition of the timestamp to make more interesting JSON objects.
- Using the express framework to respond to http requests.

## Step 3: Reverse proxy with apache (static configuration)

- In directory `3_httpd-reverse-proxy`.

## Step 4: AJAX requests with JQuery

- Wouldn't work without a reverse proxy because of the same-origin policy.
- The website comes from one static server while the dynamic content comes from another.
- This isn't allowed by the browser, but the reverse proxy is a single origin.

## Step 5: Dynamic reverse proxy configuration
