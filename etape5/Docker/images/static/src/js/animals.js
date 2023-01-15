setInterval(async() => {

    const animals = await fetch('/api/').then(response => response.json());
    send = "";
    if (animals.length > 0) {
        send = "animal : " + animals[0].typeOfAnimal +
               " age : " + animals[0].ageOfAnimal +
               " country : " + animals[0].countryOfAnimal;
    }

    document.getElementById("api-animals").innerHTML = send}, 3000)
