## Etape 5: Load balancing: round-robin and sticky sessions

### Sticky session
#### docker-compose.yml
Nous avons ajouter dans le serveur statique ces 2 lignes qui nous
permettent d'activer les sticky sessions.
```
# sticky session
- "traefik.http.services.static.loadbalancer.sticky.cookie=true"
- "traefik.http.services.static.loadbalancer.sticky.cookie.name=static-cookie"
```

#### index.php

Ces lignes vont afficher l'id de la session sur la page web pour
pouvoir montrer que malgré qu'il a 3 serveurs statiques, le load balancer
choisira toujours le même serveur. Ceci est du au ajout des cookies
dans chaque requête que est envoyer. 
```
<!-- sticky session affichage de hostname -->
    <?php
    echo '<h2 class="text-white-50 mx-auto mt-2 mb-5">';
    echo 'Votre ID de session est le : '.gethostname();
    echo '</h2>';
    ?>
<!-- fin sticky session -->
```

### round robin

