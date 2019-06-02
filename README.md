# HTTP Infrastructure Lab

_Authors: Alison Savary, Luc Wachter_

## Step 1: Static Apache httpd server

- A docker image ready to setup a static Apache `httpd` server to serve a simple bootstrap landing page.
- Full documentation in directory `1_httpd-php-static`'s readme: [link](1_httpd-php-static/README.md).

## Step 2: Dynamic express.js server

- A docker image ready to setup a dynamic `express.js` server, built on `Node.js`.
- It serves a random number of witty comments in JSON through HTTP.
- Full documentation in directory `2_express-dynamic`'s readme: [link](2_express-dynamic/README.md).

## Step 3: Reverse proxy with apache (static configuration)

- Full documentation in directory `3_httpd-reverse-proxy`'s readme: [link](3_httpd-reverse-proxy/README.md).

- Run static site and dynamic content without port mapping.
`docker run -d --name apache-static res/apache-static` --> 172.17.0.2
`docker run -d --name express-dynamic res/express-dynamic` --> 172.17.0.3

`a2enmod proxy proxy_http`
`a2ensite 001-reverse-proxy.conf`

- Empty default VHost to make sure our reverse proxy VHost is not the default one. (Not mandatory. You can also `a2dissite 000*`.)
- In the folder where our `Dockerfile` is located, run `docker build -t res/httpd-rp .`
- Then, `docker run -d -p 2205:80 res/httpd-rp` (We use 2205 in this example. You can use your preferred port for this.)
- Change in `/etc/hosts` ...
- Access `http://demo.res.ch:2205` or `http://demo.res.ch:2205/api/jokes/`.

## Step 4: AJAX requests with JQuery

- Wouldn't work without a reverse proxy because of the same-origin policy.
- The website comes from one static server while the dynamic content comes from another.
- This isn't allowed by the browser, but the reverse proxy is a single origin.

## Step 5: Dynamic reverse proxy configuration
