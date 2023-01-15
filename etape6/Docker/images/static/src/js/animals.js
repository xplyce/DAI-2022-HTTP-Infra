setInterval(async() => {

    const animals = await fetch('/api/').then(response => response.json());
    send = "Hostname dynamic : " + animals[0].hostname ;
    if (animals.length > 1) {
        send +=" animal : " + animals[1].typeOfAnimal +
               " age : " + animals[1].ageOfAnimal +
               " country : " + animals[1].countryOfAnimal;
    }

    document.getElementById("api-animals").innerHTML = send}, 3000)
