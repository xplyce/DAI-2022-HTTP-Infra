## Etape 4: AJAX requests with JQuery

Pour cette étape, nous avons eu besoin de créer un javascript 
animals.js pour mettre en place la mise a jour dynamique de la 
page web pour afficher un animal, son age et son pays d'origine.
De plus, l'actualisation se fait toute les 3 secondes.

### animals.js
Faire une requête sur localhost/api et recuperer la liste d'animaux
pour la stocker dans la variable animals et l'actualiser toute les 
3 secondes.
```
setInterval(async() => {

    const animals = await fetch('/api/').then(response => response.json());
    send = "";
    if (animals.length > 0) {
        send = "animal : " + animals[0].typeOfAnimal +
               " age : " + animals[0].ageOfAnimal +
               " country : " + animals[0].countryOfAnimal;
    }

    document.getElementById("api-animals").innerHTML = send}, 3000)
```

### index.html

Ce premier ajout dans le html a pour but de lancer d'executer
animals.js a chaque fois que la page web est actualiser.
```
<!-- Custom script to load scripts -->
<script src="js/animals.js"></script>
```

Cet ajout a pour but d'afficher l'id api-animals qui va nous
permettre d'afficher sur notre page web l'animal, son age et son pays.
```
<h2 class="text-white-50 mx-auto mt-2 mb-5" id="api-animals"> </h2>
```

