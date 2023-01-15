## Etape 3: Static HTTP server with apache httpd

### Docker compose to build the infrastructure

Pour pouvoir utiliser les commandes ``docker compose build`` et ``docker compose up``
afin de générer les images et de les lancer, il nous fallait écrire un docker-compose.yml.
Dans ce docker-compose.yml on retrouve les deux serveurs 

```
web-static:
  build: ./images/static/.
  ports:
    - "80"
web-dynamic:
  build: images/dynamic/.
  ports:
    - "3000"
```

### Reverse proxy with Traefik

```
reverse-proxy:
  # The official v2 Traefik docker image
  image: traefik:v2.9
  # Enables the web UI and tells Traefik to listen to docker
  command: --api.insecure=true --providers.docker
  ports:
    # The HTTP port
    - "80:80"
    # The Web UI (enabled by --api.insecure=true)
    - "8080:8080"
  volumes:
    # So that Traefik can listen to the Docker events
    - /var/run/docker.sock:/var/run/docker.sock
```

### Dynamic cluster management

```
web-static:
  build: ./images/static/.
  scale: 3
  ports:
    - "80"
  labels:
    - "traefik.autodetect=true"
    - "traefik.http.routers.web-static.rule=Host(`localhost`)"
web-dynamic:
  build: images/dynamic/.
  scale: 3
  ports:
    - "3000"
  labels:
    - "traefik.autodetect=true"
    - "traefik.http.routers.dynamic.rule=(Host(`localhost`) && PathPrefix(`/api`))"
```
