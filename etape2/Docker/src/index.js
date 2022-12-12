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
   console.log('Accepting HTTP request on port 3000')
});

//dans un fichier appart qu'on import
function generateAnimals() {}