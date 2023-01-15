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

Pour valider que nous utilisons toujours le round robin pour les serveurs
dynamique, nous avons ajouter a index.js l'envoie du hostname a chaque fois
que les animaux son générer.

#### index.js
```
animals.push({
        hostname: os.hostname()
    });
```

Ensuite nous avons modifier notre fonction d'actualisation de la page web
de l'étape 4 pour qu'elle affiche également l'hostname actueldu serveur 
dynamique.

#### animals.js
```
send = "Hostname dynamic : " + animals[0].hostname ;
```

### Validation

Pour la partie sticky sesssion, nous affichons l'hostname du serveur 
dynamique sur la page web dans "Votre ID de session est le : 7f928069b022".
Même après plusieurs actualisation de la page web, l'hostname ne change pas
se qui veut dire que le load balancer choisi toujours le même serveur donc que
nos sticky session sont correctes.

Pour le round robin, voici un exemple d'affichage 
"Hostname dynamic : 4cdd6cd5e8a1 animal : Birds age : 15 country : Seychelles".
Ceci est le message actualiser toute les 3 secondes de l'étape 4 auquelles nous
avons ajouter l'hostname du serveur dynamique. Comme nous pouvons le voir sur 
la page web, l'hostname dynamique varie parmis 3 hostname différent ( vu que 
nous aovns lancer 3 serveur dynamique) ce qui veut dire qu'il est bien en 
round robin.



