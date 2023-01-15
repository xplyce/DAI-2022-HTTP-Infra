## Etape 3: Static HTTP server with apache httpd

### Docker compose to build the infrastructure

Pour pouvoir utiliser les commandes ``docker compose build`` et ``docker compose up``
afin de générer les images et de les lancer, on a besoin d'écrire un docker-compose.yml.
Dans ce docker-compose.yml, on retrouve les images des serveurs static et dynamic. On 
peut y accéder via localhost:8080 ou localhost:9090. Ces deux adresses ne sont 
plus disponnible avec la configuration final de l'étape 3, car nous avons dû 
modifier le numéro de port pour y avoir accès uniquement via localhost et localhost/api. 

```
web-static:
  build: ./images/static/.
  ports:
    - "8080:80"
web-dynamic:
  build: images/dynamic/.
  ports:
    - "9090:3000"
```

### Reverse proxy with Traefik

Afin de pouvoir accéder au serveur static via localhost et au serveur dynamic via 
localhost/api, il nous fallait un reverse proxy qui redirige les requêtes sur les 
bons numéros de port. C'est pour cela que nous utilisons le reverse proxy Traefik. 
Ce dernier nous permet également d'avoir un dashboard avec diverses informations sur 
notre reverse proxy. Pour accéder à ce dashboard il faut utiliser l'adresse suivante
localhost:8080. 

Pour configurer ce reverse proxy nous avons dû ajouter un container avec l'image
traefik:v2.9. Ce dernier nous permet également de sécurisé notre site en accèdant 
au serveur static et dynamic directement via localhost ou localhost/api sans avoir
à entrer l'adresse des ports en dur. Pour ce faire nous avons dû ajouter les deux
labels ci-dessous on était ajouter, un pour web-static et un pour web-dynamic. 

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
    
  #labels de web-static
  labels:
    - "traefik.autodetect=true"
    - "traefik.http.routers.web-static.rule=Host(`localhost`)"
    
  #labels de web-dynamic
  labels:
    - "traefik.autodetect=true"
    - "traefik.http.routers.dynamic.rule=(Host(`localhost`) && PathPrefix(`/api`))"
```

### Dynamic cluster management

Avec la configuration du docker-compose.yml actuel alors traefik est déjà capable 
de dynamiquement detecté plusieurs instances et nous envoyer sur une des instances. 
Par défaut traefik applique le round robin pour savoir qu'elle instance du serveur 
utilisé. On peut vérifier le bon fonctionnement du load balancer grâce à l'affichage
de l'id de session qui se modifie à chaque fois que le refresh la page. 
