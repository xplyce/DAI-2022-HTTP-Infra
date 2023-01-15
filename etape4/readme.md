## Etape 4: AJAX requests with JQuery

Pour cette étape, nous avons eu besoin de créer un javascript 
animals.js pour mettre en place la mise a jour dynamique de la 
page web pour afficher un animal, son age et son pays d'origine.
De plus, l'actualisation se fait toute les 3 secondes.

### animals.js


```
setInterval(async() => {

    const animals = await fetch('/api/').then(response => response.json());

    if (animals.length > 0) {
        send = "[jkadfbsajshdfbsadj : " + animals[0].typeOfAnimal +
            ", ageOfAnimal : " + animals[0].ageOfAnimal + ", countryOfAnimal :"
            + animals[0].countryOfAnimal + "]";
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
d'afficher sur notre page web l'animal, son age et son pays.
```
<p id="api-animals"></p>
```

