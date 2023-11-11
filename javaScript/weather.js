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


document.getElementById('weather-search-btn').addEventListener("click", getWeather)


async function getWeather(){
  let cityInput = document.getElementById('searchWeather').value

  if(!cityInput){


  }
  // let location= searchGeoLocation(cityInput)

    let geoResult = (await axios.get(`https://api.geoapify.com/v1/geocode/search?city=${cityInput}&state=${cityInput}&country=Sweden&lang=en&limit=1&type=city&format=json&apiKey=58e3667c44f64bc2adfd18a7d67ba5f1`)).data;

    const latitude = geoResult.results[0].lat
    const longitud = geoResult.results[0].lon
    console.log(latitude, longitud)

    let weatherReport = (await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitud}&current=temperature_2m,precipitation,weather_code,wind_speed_10m&timezone=Europe%2FLondon`))

    const report = weatherReport.data.current.temperature_2m

    const weatherCode = weatherReport.data.current.weather_code
    const precipitation = weatherReport.data.current.precipitation
    const windSpeed = weatherReport.data.current.wind_speed_10m
    console.log(report, '°C')
    console.log(weatherCode, 'väderkod')
    console.log(weatherReport)
    console.log(precipitation)
    console.log(windSpeed, 'm/s')

    // console.log(weatherReport)

    // `<div>Precipitation forecast</div>

    // `
}

// console.log(location)

// console.log(weatherReport)
//======================================
// async function searchGeoLocation(cityInputP) {

//   console.log(cityInputP)

// fetch(`https://api.geoapify.com/v1/geocode/search?city=${cityInputP}&state=${cityInputP}&country=Sweden&lang=en&limit=1&type=city&format=json&apiKey=58e3667c44f64bc2adfd18a7d67ba5f1`)

//   .then(response => response.json())
//   .then(result =>{

//       const latitude = result.results[0].lat;
//       const longitude = result.results[0].lon;
//       // return { latitude, longitude };

//       console.log(latitude, longitude )
//       return ({latitude, longitude})
//       test(latitude)
//   }
// )

// .catch(error => console.log('error', error));

// }

// test(latitude){

//   console.log(latitude)
// }
// function findGeoLocation(cityName){

//================================================

//      return fetch(`https://api.geoapify.com/v1/geocode/search?city=${cityName}&state=${cityName}&country=Sweden&lang=en&limit=1&type=city&format=json&apiKey=58e3667c44f64bc2adfd18a7d67ba5f1`)

//         .then(response => response.json())
//         .then(result =>{

//             const latitude = result.results[0].lat;
//             const longitude = result.results[0].lon;
//             return { latitude, longitude };
//         }
//     )

//     .catch(error => console.log('error', error));

// }


// https://api.open-meteo.com/v1/forecast?latitude=57.7021&longitude=11.9537&current=temperature_2m,precipitation,weather_code,wind_speed_10m&timezone=Europe%2FLondon
