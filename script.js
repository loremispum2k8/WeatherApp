let city = document.querySelector(".city");
let country = document.querySelector(".country");
let centerDegrees = document.querySelector(".centerDegrees");
let description = document.querySelector(".description");
let icon = document.querySelector(".descriptionIcon");
let highDegrees = document.querySelector(".highDegrees");
let lowDegrees = document.querySelector(".lowDegrees");
let feelsDegrees = document.querySelector(".feelsDegrees");
let latitude;
let longitude;
let LOCATION;
let cityInput = document.querySelector(".searchInput");
let searchButton = document.querySelector(".searchButton");
let err400 = document.querySelector(".err400");
let loading = document.querySelector(".loading");
let infoContainer = document.querySelector(".infoContainer");
let loaded = false;
let bgImage = document.querySelector(".bgImage");

function fillInfo(obj) {
  let firstAdress = obj.resolvedAddress.split(",")[0];
  bigLetterAdress = firstAdress.split("");
  bigLetterAdress[0] = bigLetterAdress[0].toUpperCase();
  bigLetterAdress = bigLetterAdress.join("");
  city.textContent = bigLetterAdress;
  let widthOfLocations = obj.resolvedAddress.split(",").length;
  country.textContent = obj.resolvedAddress.split(",")[widthOfLocations - 1];
  centerDegrees.textContent = Math.round(obj.days[0].temp);
  description.textContent = obj.currentConditions.conditions;
  highDegrees.textContent = Math.round(obj.days[0].tempmax);
  lowDegrees.textContent = Math.round(obj.days[0].tempmin);
  feelsDegrees.textContent = Math.round(obj.days[0].feelslike);
}

function chooseIconAndImage(obj) {
  switch (obj.currentConditions.icon) {
    case "snow":
      icon.src = "snow.png";
      bgImage.src = "snowIMG.jpg";
      break;
    case "rain":
      icon.src = "rain.png";
      bgImage.src = "rainIMG.jpg";
      break;
    case "fog":
      icon.src = "fog.png";
      bgImage.src = "fogIMG.jpg";
      break;
    case "wind":
      icon.src = "wind.png";
      bgImage.src = "windIMG.jpg";
      break;
    case "cloudy":
      icon.src = "cloudy.png";
      bgImage.src = "cloudyIMG.webp";
      break;
    case "partly-cloudy-day":
      icon.src = "cloudyDay.png";
      bgImage.src = "cloudyDayIMG.jpg";
      break;
    case "partly-cloudy-night":
      icon.src = "cloudyNight.png";
      bgImage.src = "cloudyNightIMG.jpg";
      break;
    case "clear-day":
      icon.src = "clearDay.png";
      bgImage.src = "clearDayIMG.jpg";
      break;
    case "clear-night":
      icon.src = "clearNight.png";
      bgImage.src = "clearNightIMG.webp";
      break;
  }
}

async function displayWeather() {
  try {
    if (!loaded) {
      infoContainer.style.display = "none";
      loading.style.display = "flex";
    }
    console.log(2);
    navigator.geolocation.getCurrentPosition((position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
    let locationInfo = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
    );
    let locationObject = await locationInfo.json();
    let cityInfo = await locationObject.city;
    LOCATION = await cityInfo;

    let result = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${LOCATION}?unitGroup=metric&key=5UTEKYU5LEYSSGSM3S9TRA6XB&contentType=json`,
    );
    let object = await result.json();
    console.log(result.status);
    console.log(object);
    fillInfo(object);
    chooseIconAndImage(object);
    if (err400.style.display === "flex") {
      infoContainer.style.display = "flex";
      err400.style.display = "none";
      loading.style.display = "none";
    }
    loaded = true;
    if (loaded) {
      infoContainer.style.display = "flex";
      loading.style.display = "none";
    }
  } catch (error) {
    infoContainer.style.display = "none";
    err400.style.display = "flex";
    console.log(error);
  }
}
displayWeather();

searchButton.addEventListener("click", () => {
  if (cityInput.value !== "") {
    if (!loaded) {
      infoContainer.style.display = "none";
      loading.style.display = "flex";
    }
    LOCATION = cityInput.value;
    cityInput.value = "";
    async function displayWeatherInput() {
      try {
        let result = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${LOCATION}?unitGroup=metric&key=5UTEKYU5LEYSSGSM3S9TRA6XB&contentType=json`,
        );
        let object = await result.json();
        console.log(result.status);
        console.log(object);
        fillInfo(object);
        chooseIconAndImage(object);
        if (err400.style.display === "flex") {
          infoContainer.style.display = "flex";
          err400.style.display = "none";
          loading.style.display = "none";
        }
        loaded = true;
        if (loaded) {
          infoContainer.style.display = "flex";
          loading.style.display = "none";
        }
      } catch (error) {
        console.log(error);
        infoContainer.style.display = "none";
        err400.style.display = "flex";
      }
    }
    displayWeatherInput();
  }
});
