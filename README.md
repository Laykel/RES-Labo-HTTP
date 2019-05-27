# HTTP Infrastructure Lab

_Authors: Alison Savary, Luc Wachter_

## Step 1: Static Apache httpd server

- In directory `step1`.
- Using the `php:7.3-apache` docker image.
- `docker run -d -p 2205:80 php:7.3-apache`
- Then we can `telnet 127.0.0.1 2205`, and `GET HTTP/1.1 /`.
  - We get an error, because we don't have access to the server's root.
- Once our `Dockerfile` is done, `docker build -t res/apache-static .`
- Then, `docker run -d -p 2205:80 res/apache-static .`
- And we can see our sources served by the server at address `127.0.0.1:2205`.

## Step 2: Dynamic express.js server

## Step 3: Reverse proxy with apache (static configuration)

## Step 4: AJAX requests with JQuery

## Step 5: Dynamic reverse proxy configuration
