// A callback function is a function in programming that is passed as an argument to another function.

// It is typically used to specify what should happen when a certain task or event is completed.

// Callback functions are often employed in asynchronous operations, allowing the program to continue executing tasks while waiting for a particular operation to finish, such as fetching data from a remote server or handling user input.


// If - statement to check if
// Check if geolocation is supported by the browser
// if ("geolocation" in navigator) {
    // Prompt user for permission to access their location
    // navigator.geolocation.getCurrentPosition(
      // Success callback function
      // (p) => {
        // Get the user's latitude and longitude coordinates
        // const lat = p.coords.latitude;
        // const lng = p.coords.longitude;
        // const alt = p.coords.altitude;

        // Do something with the location data, e.g. display on a map
      //   console.log(`Latitude: ${lat}, longitude: ${lng}` );
      //   console.log(alt)
      // },
      // Error callback function
      // (error) => {
        // Handle errors, e.g. user denied location sharing permissions
    //     console.error("Error getting user location:", error);
    //   }
    // );
  // } else {
    // Geolocation is not supported by the browser
    // console.error("Geolocation is not supported by this browser.");

    // Add Gothneburg as default
    // ALSO if pressing the location icon a funstion for geolocation starts again.
  // }


  // fetch('https://avancera.app/cities/')
  // .then((response) => response.json())
  // .then((result) => {
  //   console.log(result)
  // })

// Alla städers namn sparas här tillsammans med html,
//Det skapas option taggar med stadens id som value och stadens namn som test/sträng.

let weatherCitiesToDropDown = ""
//Här fylls dropdown menyn på med namn på städer hämtade från cities-apiet hämtat med fetch
let populateWeatherDropDownMenu = () =>{

  fetch('https://avancera.app/cities/')
  .then((response)=> response.json())
  .then((result) => {

      for(i = 0; i < result.length; i++){

        weatherCitiesToDropDown+=
        `<option value="${result[i].id}">${result[i].name}</option>`

      }

      document.getElementById('search').innerHTML = weatherCitiesToDropDown;

        console.log(weatherCitiesToDropDown)
    })

}

// Fyller på drop-down menyn med städer en gång
populateWeatherDropDownMenu()



// const searchWeather_btn = document.getElementById('weather-search-btn')
// searchWeather_btn.addEventListener("click", )
