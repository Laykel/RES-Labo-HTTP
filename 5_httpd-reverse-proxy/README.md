# Step 5: Reverse proxy with Apache httpd

## General architecture

- The goal is to make the configuration of the web servers' IP addresses more dynamic, so that we don't have to rebuild the reverse proxy every time if the IPs don't match.
- Identical to step 3, with the following changes:
  - Copied the `apache2-foreground` shell script from Dockerhub's [php image configuration](https://github.com/docker-library/php/blob/8203d502a18ecfe79ac011f85843754fb524b899/7.3/stretch/apache/apache2-foreground) and adapted it to generate our `001-reverse-proxy.conf` file dynamically, using the provided environment variables.
  - In order to create it, we added a php script as a template for apache's `sites-available` `conf` file, with code that retrieves the environment variables `STATIC_APP` and `DYNAMIC_APP` and use it as the web servers' IP addresses.
  - We then adapted the Dockerfile to copy the `apache2-foreground` script and the php script in the container's filesystem.

## How to use

- Run static site and dynamic content without port mapping:
  - `docker run -d --name apache-static res/apache-static`
  - `docker run -d --name express-dynamic res/express-dynamic`
- Use `docker inspect <container_name> | grep -i ipaddress` to find out the two servers' IP addresses.

- In the folder where our `Dockerfile` is located, run `docker build -t res/httpd-rp .`.
- Then, `docker run -d -e STATIC_APP=172.17.0.x -e DYNAMIC_APP=172.17.0.y:3000 -p 2205:80 res/httpd-rp`. (We use 2205 in this example. You can use your preferred port for this.)
- The two parameters after the `-e` flags are environment variables for your container.
- You must provide the IP addresses you found in the preceding step after those flags.

- Now we can access `http://demo.res.ch:2205` or `http://demo.res.ch:2205/api/jokes/` through our favourite HTTP client, and get what we expect.

## Disclaimer

Warning: this is only a marginally better solution than step 3's. You must check the containers' IP addresses yourself and set the environment variables everytime you run the container.
