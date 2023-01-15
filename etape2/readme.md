## Etape 2: Dynamic HTTP server with express.js

### npm

Pour cette étape, nous avons utilisé npm pour la gestion des paquetages. Afin de l'utiliser, il faut d'abord l'initialiser à l'aide de la commande ``npm init``. Ceci va nous permette de facilement créer un fichier package.json avec des informations telles que le nom du projet, une description ... (voir package.json ci-dessous). On peut également retrouvé les dépendances de notre projet ce qui permet de facilité l'installation de ces dernière en effectuant un ``npm install``. 

package.json
```
{
  "name": "nicolas_marko",
  "version": "0.1.0",
  "description": "etape 2",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Nicolas Philipp",
  "license": "ISC",
  "dependencies": {
    "chance": "^1.1.9",
    "express": "^4.18.2",
    "node": "^19.2.0"
  }
}
```

### docker

Afin de générer une image et de l'exécuter, nous avons mis à disposition un Dockerfile et deux script : 
1. Dockerfile
```
FROM node:18.12.1

COPY src /opt/app

CMD ["node", "opt/app/index.js"]
```

2. build-image.sh
```
docker build -t marko_nicolas/express .
```

3. docker-run.sh
```
docker run -p 9090:3000 marko_nicolas/express
```

Une fois l'image construite et exécutée, nous pouvons accèder à l'interface web via "localhost:9090". Cette dernière va générer une liste de 0 à 10 animaux avec un age et un pays d'origine pour chaque animal. 

### implémentation de index.js 

Notre code va attendre qu'une requete de type get soit effectué sur le port 3000 afin d'envoyer en retour une liste d'animaux en format json. Afin d'effectué l'attente nous utilisons la fonction listen. Lorsque la requete get est formulée, on génère une liste d'animaux via la fonction generateAnimals(). Cette dernière utilise chance.js afin de générer des données aléatoires. Une fois la liste d'animaux générer on l'envoie en réponse à la requête get. 

```js
var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send( generateAnimals() );
});

app.listen(3000, function () {
   console.log('Accepting HTTP request on port 3000');
});

function generateAnimals() {
    var numberOfAnimals = chance.integer({min: 0, max: 10});

    console.log(numberOfAnimals);
    var animals = [];
    var ages = ['teen', 'child']
    for (var i = 0; i < numberOfAnimals; i++) {
        var rnd = chance.integer({min: 0, max: 1});
        animals.push({
            typeOfAnimal: chance.animal({type: 'pet'}),
            ageOfAnimal: chance.age({type: ages[rnd]}),
            countryOfAnimal: chance.country({ full: true })
        });
    }
    console.log(animals);
    return animals;
}
```
