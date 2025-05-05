/* getting slider from simple slider and dog picture api */
async function dogSlider() {
    let slider = document.getElementById("dogSlider");

    for (let i = 0; i < 10; i++) {
        let res = await fetch("https://dog.ceo/api/breeds/image/random");
        let data = await res.json();
        let img = document.createElement("img");
        img.src = data.message;
        slider.appendChild(img);
    }

    simpleslider.getSlider({
        container: slider,
        transitionTime: 1,
        delay: 3.5
    });
}

dogSlider();

async function loadDogBreeds() {
    let response = await fetch("https://dogapi.dog/api/v2/breeds");
    let data = await response.json();
    let breeds = data.data;

    const container = document.getElementById("dogBreedButtons");
    container.innerHTML = "";

    breeds.forEach(breed => {
        const button = document.createElement("button");
        button.setAttribute("class", "button-82-pushable");
        button.setAttribute("data-breed-name", breed.attributes.name);
        button.innerHTML = `
            <span class="button-82-shadow"></span>
            <span class="button-82-edge"></span>
            <span class="button-82-front text">${breed.attributes.name}</span>
        `;
        button.addEventListener("click", () => showBreedInfo(breed));
    
        container.appendChild(button);
    });
}

function showBreedInfo(breed) {
    const info = document.getElementById("dogBreedInfo");
    info.innerHTML = `
        <h2>${breed.attributes.name}</h2>
        <h2>Description: ${breed.attributes.description}</h2>
        <h2>Min Life: ${breed.attributes.life.min}</h2>
        <h2>Max Life: ${breed.attributes.life.max}</h2>
    `;
}

loadDogBreeds() 

if (annyang){
    const commands = {
        "hello": () => {alert("Hello World!");},
        "change the color to *color": (color) => {document.body.style.backgroundColor = color;},
        "navigate to *page": (page) => {
            responsepage = page.toLowerCase();
            if (responsepage === "home"){
                window.location.href = "home.html";
            }
            else if (responsepage === "stocks"){
                window.location.href = "stocks.html";
            }
            else if (responsepage === "dogs"){
                window.location.href = "dogs.html";}
        },
        "load dog breed *dogbreed": dogbreed => {
            const dogBreedLower = dogbreed.toLowerCase();
            const allBreedsLower = allBreeds.toLowerCase()
            if (dogBreedLower in allBreedsLower){
                showBreedInfo(dogBreedLower)
            }
        }
    };
    annyang.addCommands(commands);
}