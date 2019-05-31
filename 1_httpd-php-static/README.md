# Step 1: Static Apache httpd server

## General architecture

- _Maybe a small schema here._
- _The path to our sources ?_
- Using the `php:7.3-apache` docker image, as I'm more familiar with that directory structure and we might have a use for PHP in a future step.
- The folder `public` contains the website's sources.

## The landing page website

- The website served by our image is a simple landing page, with some jokes in it.
- It uses the [Grayscale](https://startbootstrap.com/previews/grayscale/) free bootstrap theme.

## How to use

- In the folder where our `Dockerfile` is located, `docker build -t res/apache-static .`
- Then, `docker run -d -p 2205:80 res/apache-static .` (For example. You can use your preferred port for this.)
- And we can see the sources in the `public` folder served by the server at address `127.0.0.1:2205` in a browser, or any HTTP client.
- Pay attention to the rights on the folder containing the sources. The apache server must be able to read its content.