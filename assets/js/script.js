const citySearchInput = document.querySelector("#inputSearch");
const citySearchBtn = document.querySelector("#search");
let citySearch = '';

const apiKey = "11b8a1814454ad6bc0b2f293df9f1ff0";

//When 'Search' button is clicked
//1. the default behaviour of button is prevented
//2. the value is trimmed of any white space and saved to variable 'city'
//3. the value is logged to console
//4. the input is removed from the input box
//5. the function 'getCityCoordinates' is called

citySearchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    citySearch = citySearchInput.value.trim();
    console.log(citySearch);
    citySearchInput.value = "";
    getCityCoordinates();
  });
  
  function getCityCoordinates() {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&APPID=${apiKey}`;
  
    fetch(apiURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          getCityForecast(data.coord.lat, data.coord.lon);
        });
      } else {
        alert("Error: " + response.statusText);
        //To do: Make this meaningful
      }
    });
  }
  
  function getCityForecast(lat, lon) {
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  
    fetch(apiURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          let forecast = [data.list];
          displayCurrentWeather(data.list[0], data.city.name);
        });
      }
    });
  }

  function displayCurrentWeather(current, cityName) {
    const iconURL = `http://openweathermap.org/img/wn/${current.weather[0].icon}.png`;
    const dateToday = dayjs.unix(current.dt).format("DD/MM/YY");
    const weatherIcon = document.getElementById("current-icon");
    const tempToday = current.main.temp;
    const windToday = current.wind.speed;
    const humidityToday = current.main.humidity;
  
    // clear current weather icon
    weatherIcon.textContent = "";
  
    // create img element
    const imgEl = document.createElement("img");
  
    //set image source to iconURL
    imgEl.setAttribute("src", iconURL);
  
    // add this icon to html element 'weatherIcon'
    weatherIcon.appendChild(imgEl);
  
    document.getElementById("current").textContent =
      cityName + " (" + dateToday + ") ";
    document.getElementById("tempToday").textContent = tempToday + "°F";
    document.getElementById("windToday").textContent = windToday + "MPH";
    document.getElementById("humidityToday").textContent = humidityToday + "%";
  }
  