setInterval(async() => {

    const animals = await fetch('/api/').then(response => response.json());

    if (animals.length > 0) {
        send = "[typeOfAnimal : " + animals[0].typeOfAnimal +
            ", ageOfAnimal : " + animals[0].ageOfAnimal + ", countryOfAnimal :"
            + animals[0].countryOfAnimal + "]";
    }

    document.getElementById("api-animals").innerHTML = send}, 5000)
