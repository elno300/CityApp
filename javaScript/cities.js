// Section där alla städer skrivs in i när man valt en eller flera städer
let listOfSelected = document.getElementById('cities-list')
// Id för det som valts i drop-down menyn
let selectedCityId;
// Alla städers namn sparas här tillsammans med html,
//Det skapas option taggar med stadens id som value och stadens namn som test/sträng.
let citiesToDropDown;

//Här fylls dropdown menyn på med namn på städer hämtade från cities-apiet hämtat med fetch. Den exekveras när den kallas.
// Arrow-function
let populateDropDownMenu = () =>{

    fetch('https://avancera.app/cities/')
    .then((response)=> response.json())
    .then((result) => {

        //Här läggs ett första väl in där man väljer alla städer.
        citiesToDropDown =
        `<option value="">Select all</option>`

        for(i = 0; i < result.length; i++){

          citiesToDropDown+=
          `<option value="${result[i].id}">${result[i].name}</option>`

        }

        document.getElementById('search').innerHTML = citiesToDropDown;

          console.log(citiesToDropDown)
      })

}

// Fyller på drop-down menyn med städer en gång
populateDropDownMenu()


// Api för att hämta longitud och latitud
// https://apidocs.geoapify.com/playground/geocoding/


function findGeoLocation(cityName){

     return fetch(`https://api.geoapify.com/v1/geocode/search?city=${cityName}&state=${cityName}&country=Sweden&lang=en&limit=1&type=city&format=json&apiKey=58e3667c44f64bc2adfd18a7d67ba5f1`)

        .then(response => response.json())
        .then(result =>{

            const latitude = result.results[0].lat;
            const longitude = result.results[0].lon;
            return { latitude, longitude };
        }
    )

    .catch(error => console.log('error', error));

}
  //============================================//
  //============================================//
  //============================================//


document.getElementById('btn_searchCities').addEventListener("click", searchCities)

// Funktion för att hantera stadsökning
// async function searchCities() {

//     document.getElementById('cities-list').style.display = "inline";
//     populateDropDownMenu();
//     selectedCityId = document.getElementById('search').value;

//     try {
//         const response = await fetch('https://avancera.app/cities/' + selectedCityId);
//         const result = await response.json();
//         console.log(selectedCityId);

//         let citiesToList = "";

//         if (!selectedCityId) {

//             //För varje stad (result) skickas ett anrop till geo funktionen som i sin tur returnerar ett promise. Det skapas en array av varje returvärde som hamnar i geoLocations.
//             const geoLocations = await Promise.all(result.map(cityItem => findGeoLocation(cityItem.name)));

//             // För varje objekt som är sparat i geoLocation
//             for (let i = 0; i < geoLocations.length; i++) {
//                 const { latitude, longitude } = geoLocations[i];

//                 citiesToList += `
//                     <div class="citieList" id="citieList${i}">
//                     <h2>${result[i].name}</h2>
//                     <p>Population: ${result[i].population}</p>
//                     <p>Latitude: ${latitude}</p>
//                     <p>Longitude: ${longitude}</p>
//                     </div>
//                    `;
//             }


//         } else {

//             const { latitude, longitude } = await findGeoLocation(result.name);
//             citiesToList = `
//                 <div class="citieList">
//                 <h2>${result.name}</h2>
//                 <p>Population: ${result.population}</p>
//                 <p>Latitude: ${latitude}</p>
//                 <p>Longitude: ${longitude}</p>
//                 </div> <svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
//                 viewBox="0 0 330 330" xml:space="preserve">
//                 <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
//                 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
//                 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
//                 C255,161.018,253.42,157.202,250.606,154.389z"/>
//                 </svg>`;
//         }

//         listOfSelected.innerHTML = citiesToList;

//     } catch (error) {
//         console.error('Error getting city data', error);
//     }
// }


// // Funktion för att hitta den geografiska platsen för en stad
// async function findGeoLocation(cityName) {
//     try {
//         const response = await fetch(`https://api.geoapify.com/v1/geocode/search?city=${cityName}&state=${cityName}&country=Sweden&lang=en&limit=1&type=city&format=json&apiKey=58e3667c44f64bc2adfd18a7d67ba5f1`);
//         const result = await response.json();

//         const { lat: latitude, lon: longitude } = result.results[0];
//         return { latitude, longitude };

//     } catch (error) {
//         console.error('Error getting geo-location', error);
//         // throw error; // Kasta felet vidare för att hantera det senare
//     }
// }





///0==========

async function searchCities() {
    document.getElementById('cities-list').style.display = "inline";

    populateDropDownMenu();

    selectedCityId = document.getElementById('search').value;

    try {
        const response = await fetch('https://avancera.app/cities/' + selectedCityId);
        const result = await response.json();
        console.log(selectedCityId);

        let citiesToList = "";

        if (!selectedCityId) {
            const geoLocations = await Promise.all(result.map(cityItem => findGeoLocation(cityItem.name)));

            for (let i = 0; i < geoLocations.length; i++) {
                try {
                    const { latitude, longitude } = geoLocations[i];

                    // Check if coordinates are available
                    const latitudeStr = latitude !== undefined ? latitude : "unknown";
                    const longitudeStr = longitude !== undefined ? longitude : "unknown";

                    citiesToList += `
                        <div class="citieList" id="citieList${i}">
                        <h2>${result[i].name}</h2>
                        <p>Population: ${result[i].population}</p>
                        <p>Latitude: ${latitudeStr}</p>
                        <p>Longitude: ${longitudeStr}</p>
                        </div>
                    `;
                } catch (error) {
                    console.error('Error getting geo-location', error);
                    // If coordinates are not found, still add city information with unknown coordinates
                    citiesToList += `
                        <div class="citieList" id="citieList${i}">
                        <h2>${result[i].name}</h2>
                        <p>Population: ${result[i].population}</p>
                        <p>Latitude: unknown</p>
                        <p>Longitude: unknown</p>
                        </div>
                    `;
                }
            }
        } else {
            try {
                const { latitude, longitude } = await findGeoLocation(result.name);

                // Check if coordinates are available
                const latitudeStr = latitude !== undefined ? latitude : "unknown";
                const longitudeStr = longitude !== undefined ? longitude : "unknown";

                citiesToList = `
                    <div class="citieList">
                    <h2>${result.name}</h2>
                    <p>Population: ${result.population}</p>
                    <p>Latitude: ${latitudeStr}</p>
                    <p>Longitude: ${longitudeStr}</p>
                    </div> <svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 330 330" xml:space="preserve">
                    <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                    c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
                    C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
                    C255,161.018,253.42,157.202,250.606,154.389z"/>
                    </svg>`;
            } catch (error) {
                console.error('Error getting geo-location', error);
                // If coordinates are not found, still add city information with unknown coordinates
                citiesToList = `
                    <div class="citieList">
                    <h2>${result.name}</h2>
                    <p>Population: ${result.population}</p>
                    <p>Latitude: unknown</p>
                    <p>Longitude: unknown</p>
                    </div>`;
            }
        }

        listOfSelected.innerHTML = citiesToList;

    } catch (error) {
        console.error('Error getting city data', error);
    }
}
