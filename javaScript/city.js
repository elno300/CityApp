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
            document.getElementById('search').innerHTML = citiesToDropDown;

            console.log(citiesToDropDown);
        });
};

// Här anropas metoden/funktionen ovan
// Fyller på drop-down menyn med städer en gång
populateDropDownMenu();

// btn-klick metod med eventlistener
document.getElementById('btn_searchCities').addEventListener('click', searchCities);

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
            for (let i = 0; i < result.length; i++) {
                citiesToList += `
                    <div class="citieList" id="citieList${i}">
                        <h2>${result[i].name}</h2>
                        <p>Population: ${result[i].population}</p>
                    </div>`;
            }
        } else {
            citiesToList = `
                <div class="citieList">
                    <h2>${result.name}</h2>
                    <p>Population: ${result.population}</p>
                </div>`;
        }
        // Skriv ut städer eller stad
        listOfSelected.innerHTML = citiesToList;
        
    } catch (error) {
        console.error('Error getting city data', error);
        alert('Försök igen');
    }
}
