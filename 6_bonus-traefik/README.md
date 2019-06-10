# Bonus steps

## Dynamic cluster management + Load balancing: multiple server nodes

Traefik puts in place the **dynamic cluster management** for us. To do that, it listens to the events Docker creates through the `/var/run/docker.sock` socket. This means we give the container full access to the socket on our host machine. There's probably a security argument to be had there, but it's not in the scope of this step.

It is also a **load balancer** by default, using the algorithm _weighted round-robin_. Since we don't assign weights (our servers are of equal capacity, so no reason to weight differently), this algorithm functions the same way as a standard _round-robin_ algorithm.

### Configuration

To make it work, and to test our load balancer easily, we use `docker-compose`. This will allow us to link the containers, and to start a specified number of apps to test the load balancer (using `docker-compose scale app=5`, for example).

The configuration can be found in this folder's `docker-compose.yml` file.

Basically, the Traefik container is setup to serve a web UI on port 2205, and to handle requests coming on port 80.

```yml
  traefik:
    image: traefik # The official Traefik docker image
    command:
      - --api    # Enables the web UI
      - --docker # Tells Traefik to listen to docker
    ports:
      - "80:80"     # The HTTP port
      - "2205:8080" # The Web UI (enabled by --api)
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock # So that Traefik can listen to the Docker events
```

Then, we define our static application to serve on port 80, and to answer to the header "Host:demo.res.ch".

```yml
  static:
    image: res/apache-static
    labels:
      - traefik.backend=apache-static
      - traefik.frontend.rule=Host:demo.res.ch
      - traefik.port=80
```

Finally, we define our dynamic application to serve on port 3000, and to answer to **the same Host header** as the static app.

```yml
  dynamic:
    image: res/express-dynamic
    labels:
      - traefik.backend=express-dynamic
      - traefik.frontend.rule=Host:demo.res.ch;PathPrefixStrip:/api/jokes/
      - traefik.port=3000
```

- The addition of the `PathPrefixStrip` frontend matcher creates a route for the reverse proxy to follow when the path `/api/jokes/` is used.

### How to use

_By default, we use the port 2205 as our web UI port. If you'd prefer another one, you can change it in the `ports` section of the `traefik` service, in the yml file._

- Make sure you are in the folder where the `docker-compose.yml` file is.
- Launch the Traefik container with `docker-compose up -d traefik`.
- You can now visit the web UI by browsing to `http://localhost:2205` in your web browser.
- You'll see that only the reverse proxy (/ load balancer / cluster management) is active.
- You can then launch a static app, using `docker-compose up -d static`, and check that it appears in the web interface.
- In order to launch a certain number (here, 5) of dynamic app containers, use `docker-compose scale dynamic=5`.

To validate our work, we did a simple check to observe the load balancing in action. In our `express.js` application, 
we generated a random id with the `uuid` npm module and added it to our json payload. Each server will have its id, so when a response is sent, we can identify the sender.
We sent several requests to `/api/jokes/` and saw that the server's id varied, it means the load balancer is working.


As for the cluster management, we observed that killing an `express.js` container did not impact our infrastructure.
## Management UI

## Load balancing: round-robin vs sticky sessions
