
document.addEventListener("DOMContentLoaded", function () {
    const compareButton = document.querySelector("#btn");
    compareButton.addEventListener("click", clickToCompare);
})

// Create Dino Constructor

class Dino {
    constructor(data) {
        this.species = data.species
        this.height = data.height
        this.weight = data.weight
        this.diet = data.diet
        this.where = data.where
        this.when = data.when
        this.fact = data.fact
    }
}

// Create Human Object
class Human {
    constructor(name, height, weight, diet) {
        this.name = name
        this.height = height
        this.weight = weight
        this.diet = diet
    }
}

// Use IIFE to get human data from form


// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
function compareWeight(dino, human) {
    if (dino.weight === human.weight) {
        return `has the same weight of ${human.name}`
    }
    if (dino.weight > human.weight) {
        return `${dino.weight - human.weight} lbs heavier than ${human.name}`
    }
    if (dino.weight < human.weight) {
        return `${human.weight - dino.weight} lbs lighter than ${human.name}`
    }
}


// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

function compareHeight(dino, human) {
    if (dino.height === human.height) {
        return `has the same height of ${human.name}`
    }
    if (dino.height > human.height) {
        return `${dino.height - human.height} inches taller than ${human.name}`
    }
    if (dino.height < human.height) {
        return `${human.height - dino.height} inches shorter than ${human.name}`
    }
}

// Create Dino Compare Method 3

function compareDiet(dino, human) {
    if (dino.diet.toLowerCase() === human.diet.toLowerCase()) {
        return `has the same diet of ${human.name}`
    } else {
        return `${dino.diet},but ${human.name} is ${human.diet} `
    }

}

// NOTE: Weight in JSON file is in lbs, height in inches.
const factsToChooseFrom = ["where", "when", "fact", compareDiet, compareHeight, compareWeight]

function randomPickFromArray(list) {
    const ranDomindex = Math.floor(Math.random() * list.length);
    return list[ranDomindex]
}

function createFact(list, dino, human) {
    const factName = randomPickFromArray(list)
    if (typeof factName === "string") {
        return `${factName}: ${dino[factName]}`
    } else {
        return factName(dino, human)
    }
}
// Create Dino Objects
function createDinos(data) {
    const { Dinos } = data;
    return Dinos.map(dino => new Dino(dino))
}

function createImgSrc(name) {
    return `./images/${name.toLowerCase()}.png`
}

// Generate Tiles for each Dino in Array

function createDinoTile(dino, human) {
    const tile = document.createElement("div");
    tile.classList.add("grid-item");

    const speciesTitle = document.createElement("h6");
    const speciesTitleContent = document.createTextNode(dino.species);
    speciesTitle.appendChild(speciesTitleContent)
    tile.appendChild(speciesTitle)

    const speciesImg = document.createElement("img");
    speciesImg.src = createImgSrc(dino.species)
    tile.appendChild(speciesImg)

    const speciesFact = document.createElement("p");
    let factText
    if (dino.species === "Pigeon") {
        factText = "All birds are Dinosaurs."
    } else {
        factText = createFact(factsToChooseFrom, dino, human)
    }
    const speciesFactContent = document.createTextNode(factText);
    speciesFact.appendChild(speciesFactContent)
    tile.appendChild(speciesFact)

    return tile
}

function createHumanTile(human) {
    const tile = document.createElement("div");
    tile.classList.add("grid-item");

    const speciesTitle = document.createElement("h6");
    const speciesTitleContent = document.createTextNode(human.name);
    speciesTitle.appendChild(speciesTitleContent)
    tile.appendChild(speciesTitle)

    const speciesImg = document.createElement("img");
    speciesImg.src = createImgSrc("human")
    tile.appendChild(speciesImg)

    return tile
}


// Add tiles to DOM

// Remove form from screen

function removeForm(params) {
    const form = document.querySelector("#dino-compare");
    form.remove();
}

// On button click, prepare and display infographic

function clickToCompare() {
    const name = document.querySelector("#name").value
    const feet = document.querySelector("#feet").value
    const inches = document.querySelector("#inches").value
    const height = parseInt(feet) * 12 + parseInt(inches)
    const diet = document.querySelector("#diet").value
    const weight = parseInt(document.querySelector("#weight").value)
    const humanInfo = new Human(name, height, weight, diet)
    removeForm()


    fetch("./dino.json").then(res => res.json()).then(data => createDinos(data)).then(dinos => {
        const mainGrid = document.querySelector("#grid");
        for (const [index, value] of dinos.entries()) {
            if (index === 4) {
                mainGrid.appendChild(createHumanTile(humanInfo))
            }
            mainGrid.appendChild(createDinoTile(value, humanInfo))
        }
    })
}