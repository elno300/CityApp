const dropDown = document.getElementById('search')
// Här hämtas elementet där all information om städerna ska skrivas ut till
const listOfSelected = document.getElementById('cities-list');

let selectedCityId;
let citiesToDropDown;




// Här fylls dropdown menyn på med namn på städer hämtade från cities-apiet hämtat med fetch. Den exekveras när den kallas.
// Arrow-function som körs när den anropas
let populateDropDownMenu = () => {
    fetch('https://avancera.app/cities/')
        .then((response) => response.json())
        .then((result) => {

            // Här läggs ett första väl in där man väljer alla städer.
            citiesToDropDown = `<option value="">Select all</option>`;

            for (i = 0; i < result.length; i++) {

                citiesToDropDown += `<option value="${result[i].id}">${result[i].name}</option>`;

            }

            // Ett select-element, search fylls på med alla städers namn.
            dropDown.innerHTML = citiesToDropDown;

            console.log(citiesToDropDown);

        });
};

// Här anropas metoden/funktionen ovan
// Fyller på drop-down menyn med städer en gång
populateDropDownMenu();

// btn-klick metod med eventlistener
document.getElementById('city-search-button').addEventListener('click', searchCities);

async function searchCities() {
    // document.getElementById('cities-list').style.display = "inline";
    // Visar elementet som ska fyllas på med städer
    listOfSelected.style.display = 'inline';

    // Fyller på/uppdaterar drop-down menyn med städer en gång
    populateDropDownMenu();

    selectedCityId = document.getElementById('search').value;

    try {
        const response = await fetch('https://avancera.app/cities/' + selectedCityId);
        const result = await response.json();

        console.log(selectedCityId);

        // Tömmer diven som listar all info om städerna
        let citiesToList = '';

        if (!selectedCityId) {
            //For-loopen itererar igenom alla object i resultatet
            for (let i = 0; i < result.length; i++) {

                //Förevarje objekt sparas en div med namn och population
                citiesToList += `
                    <div class="citieList" id="citieList${i}">
                        <div id="name-population-wrapper${i}">
                        <h2>${result[i].name}</h2>
                        <p>Population: ${result[i].population}</p>
                        </div>
                        <div id="city-list-btn-wrapper">
                        <div id="slide-down-on-arrow-down${i}" class="slide-down-on-arrow-down">
                        <button data-city-id=${result[i].id} id="edit-selected-city" onclick="editCity(this)">Edit</button>
                        <button data-city-id=${result[i].id} id="remove-selected-city" onclick="removeCity(this)">Remove</button>
                        </div>

                        <svg data-city-index="${i}" data-city-id=${result[i].id} data-apa="hej" class="arrow-down" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" onclick="handleArrowDownClick(this)">
                        <path d="M6 9l6 6 6-6"/>
                        </svg>
                        </div>
                    </div>`;
            }

        } else {

            citiesToList = `
                <div class="citieList">
                    <h2>${result.name}</h2>
                    <p>Population: ${result.population}</p>
                </div>
                <div id="city-list-btn-wrapper">
                <div id="slide-down-on-arrow-down" class="slide-down-on-arrow-down">
                <button id="edit-selected-city">Edit</button>
                <button data-city-id=${result.id} id="remove-selected-city">Remove</button>
                </div>

                <svg data-city-index="0" data-city-id=${result.id} class="arrow-down" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" onclick="handleArrowDownClick(this)">
                <path d="M6 9l6 6 6-6"/>
                </svg>
                </div>`;
        }
        // Skriv ut städer eller stad
        listOfSelected.innerHTML = citiesToList;

    } catch (error) {
        console.error('Error getting city data', error);
        alert('Försök igen');
    }
}

let inputNewCityName;
let inputNewPopulation;
const errorMessageP = document.getElementById('error-message-population');
const cityInput = document.getElementById('input-new-city-name');
const populationInput = document.getElementById('input-new-population');

document.getElementById('add-new-city-button').addEventListener('click', addNewCity);

function addNewCity() {
    inputNewCityName = cityInput.value;
    inputNewPopulation = populationInput.value;

    if (inputNewCityName !== "" && inputNewPopulation !== "" && !isNaN(inputNewPopulation) && isNaN(inputNewCityName) ) {

        populationInput.style.border = '1px solid white';
        cityInput.style.border = '1px solid white';

        errorMessageP.innerHTML =""
        cityInput.value =""
        populationInput.value=""

        errorMessageP.innerHTML = `<p id="added-city-fade">${inputNewCityName} city has been added to the list</p>`
        addCityToCities(inputNewCityName,inputNewPopulation)


    } else if (!inputNewPopulation && inputNewCityName !== "") {

        populationInput.style.border = '1px solid red';
        alert('Population field is empty');
        errorMessageP.innerHTML = `<p>Please, fill in population for the city</p>`;

    } else if (!inputNewCityName && inputNewPopulation !== "") {

        cityInput.style.border = '1px solid red';

    } else {

        populationInput.style.border = '1px solid red';
        cityInput.style.border = '1px solid red';
        errorMessageP.innerHTML = `<p>Please, type in city name and population correctly</p>`;

    }
}

// Fonction for adding city
function addCityToCities(name, population){

   fetch('https://avancera.app/cities/',{

    body: '{"name":"' + name + '",      "population": ' + population + '}',
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST'

})

    populateDropDownMenu()
    searchCities()

}

// Function som får edit och remove knapparna att slida fram
function handleArrowDownClick(e){

    const cityIndex = e.dataset.cityIndex;
    const cityId = e.dataset.cityId;
    console.log(typeof e)
    console.log(e, 'Detta är e')


    // Hämta det aktuella cityInfoDiv-elementet baserat på cityIndex
    let whichCityInfoDiv = document.getElementById('citieList' + cityIndex);

    // Hämta det specifika slide-down-elementet för det aktuella cityInfoDiv-elementet
    let slideDownElement = whichCityInfoDiv.querySelector('#slide-down-on-arrow-down' + cityIndex);

    // Uppdatera klassen för att visa slide-down-elementet
    slideDownElement.classList.toggle("slidein");

    // Använd cityId för att utföra åtgärder för den specifika staden
    console.log(`Arrow down clicked for city ${cityId}`);


}

// Button-click
function removeCity(e) {

    const removeCityId = e.dataset.cityId;

    let promise = fetch('https://avancera.app/cities/' + removeCityId,{

    body: JSON.stringify({  id: removeCityId, }),
    headers: {
        'Content-Type': 'application/json'
    },
        method: 'DELETE'

    })

    promise
    .then(response => {
    console.log(response)
    populateDropDownMenu();
    searchCities();

    })
}

function editCity(e){

    const editCityId = e.dataset.cityId;
    

}
