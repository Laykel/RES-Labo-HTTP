# Bonus steps

## Dynamic cluster management + Load balancing: multiple server nodes

Traefik puts in place the dynamic cluster management for us. To do that, it listens to the events Docker creates through the `/var/run/docker.sock` socket. This means we give the container full access to the socket on our host machine. There's probably a security argument to be had there, but it's not in the scope of this step.

It is also a load balancer by default, using the algorithm "weighted round-robin". Since we don't assign weights (our servers are of equal capacity, so no reason to weight differently), this algorithm functions the same way as a standard round-robin algorithm.

### Configuration

```yml
version: '3'

services:
  # Our Traefik RP / LB
  reverse-proxy:
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

## Management UI

## Load balancing: round-robin vs sticky sessions
