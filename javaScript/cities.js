// Id för det som valts i drop-down menyn
let selectedCityId = ""

// Section där alla städer skrivs in i när man valt en eller flera städer
let listOfSelected = document.getElementById('cities-list')

// Alla städers namn sparas här tillsammans med html,
//Det skapas option taggar med stadens id som value och stadens namn som test/sträng.
let citiesToDropDown = ""

let geoLocationPromise;

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


// Städer
let citiesToList = ""

// Button click funktion söker efter information för den staden eller de valda städerna(select all).
// function searchCities(){
//     populateDropDownMenu() // Uppdaterar drop-down menyn


//     selectedCityId = document.getElementById('search').value

//     fetch('https://avancera.app/cities/'+ selectedCityId)
//     .then((response)=> response.json())
//     .then((result) => {

//         console.log(selectedCityId)

//         if(!selectedCityId){

//             for(i=0; i<result.length; i++){

//                 citiesToList+=
//                 `<div class="citieList" id="citieList${[i]}" >
//                 <h2>${result[i].name}<h2>
//                 <p>Population: ${result[i].population}<p>
//                 </div>`

//                 geoLocationPromise = findGeoLocation(result[i].name)
//                 .then((lonLatResult) => {

//                     console.log(lonLatResult + "hhär är resultatet")
//                 })
//             }}

//         else{

//             citiesToList =
//             `<div class="citieList" >
//             <h2>${result.name}<h2>
//             <p>Population: ${result.population}<p>
//             </div>`

//             geoLocationPromise = findGeoLocation(result.name)

//         }

//         listOfSelected.innerHTML = citiesToList

// })}

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



// ...

function searchCities() {
    populateDropDownMenu();

    selectedCityId = document.getElementById('search').value;

    fetch('https://avancera.app/cities/' + selectedCityId)
        .then(response => response.json())
        .then(result => {
            console.log(selectedCityId);

            if (!selectedCityId) {
                Promise.all(result.map(city => findGeoLocation(city.name)))
                    .then(geoLocations => {
                        for (let i = 0; i < result.length; i++) {
                            const { latitude, longitude } = geoLocations[i];
                            citiesToList +=
                                `<div class="citieList" id="citieList${[i]}" >
                                <h2>${result[i].name}<h2>
                                <p>Population: ${result[i].population}<p>
                                <p>Latitude: ${latitude}, Longitude: ${longitude}</p>
                                </div>`;
                        }
                        listOfSelected.innerHTML = citiesToList;
                    });


            } else {
                findGeoLocation(result.name)
                    .then(({ latitude, longitude }) => {
                        citiesToList =
                            `<div class="citieList" >
                            <h2>${result.name}<h2>
                            <p>Population: ${result.population}<p>
                            <p>Latitude: ${latitude}, Longitude: ${longitude}</p>
                            </div>`;
                        listOfSelected.innerHTML = citiesToList;
                    });
            }
        });
}
