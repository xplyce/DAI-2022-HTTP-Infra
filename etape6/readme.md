## Etape 6: Management UI
Pour cette dernière étape, nous avons décider portainer car c'est une solution
pratique pour la gestion de container docker.

### docker-compose.yml

Voici ci-dessous ce qu'il faut ajouter dans le docker compose
pour activer docker compose. Ici, le port 9000 a été choisi.
```
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./portainer-data:/data
    ports:
      - 9000:9000
```

Pour lancer portainer, il suffit d'accéder a la page localhost:9000.