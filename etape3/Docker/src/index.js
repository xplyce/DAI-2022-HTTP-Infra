var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send( generateAnimals() );
});

app.get('/test', function(req, res) {
    res.send("Hola");
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
