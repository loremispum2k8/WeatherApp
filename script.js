let city = document.querySelector('.city');
let country = document.querySelector('.country')
let centerDegrees = document.querySelector('.centerDegrees');
let description = document.querySelector('.description');
let icon = document.querySelector('.descriptionIcon')
let highDegrees = document.querySelector('.highDegrees');
let lowDegrees = document.querySelector('.lowDegrees');
let feelsDegrees = document.querySelector('.feelsDegrees');
let latitude;
let longitude;
let LOCATION;
let cityInput = document.querySelector('.searchInput');
let searchButton = document.querySelector('.searchButton');
let err400 = document.querySelector('.err400')
let loading = document.querySelector('.loading')
let infoContainer = document.querySelector('.infoContainer')
let loaded = false;

function fillInfo(obj){
    let firstAdress = obj.resolvedAddress.split(',')[0];
    bigLetterAdress = firstAdress.split('')
    bigLetterAdress[0] = bigLetterAdress[0].toUpperCase();
    bigLetterAdress = bigLetterAdress.join('')
    city.textContent = bigLetterAdress
    let widthOfLocations = obj.resolvedAddress.split(',').length
    country.textContent = obj.resolvedAddress.split(',')[widthOfLocations-1]
    centerDegrees.textContent = Math.round(obj.days[0].temp)
    description.textContent = obj.currentConditions.conditions;
    highDegrees.textContent = Math.round(obj.days[0].tempmax)
    lowDegrees.textContent = Math.round(obj.days[0].tempmin)
    feelsDegrees.textContent = Math.round(obj.days[0].feelslike)
}

async function displayWeather(){
    try{
        if(!loaded){
            infoContainer.style.display = 'none'
            loading.style.display = 'flex';
        }
        console.log(2)
        navigator.geolocation.getCurrentPosition((position) => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        })
        let locationInfo = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
        let locationObject = await locationInfo.json();
        let cityInfo = await locationObject.city;
        LOCATION = await cityInfo;

        let result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${LOCATION}?unitGroup=metric&key=5UTEKYU5LEYSSGSM3S9TRA6XB&contentType=json`);
        let object = await result.json();
        console.log(result.status)
        console.log(object)
        fillInfo(object)
        if(err400.style.display === 'flex'){
            infoContainer.style.display = 'flex'
            err400.style.display = 'none';
            loading.style.display = 'none'
        }
        loaded = true;
        if(loaded){
            infoContainer.style.display = 'flex'
            loading.style.display = 'none';
        }
    }catch(error){
        infoContainer.style.display = 'none'
        err400.style.display = 'flex';
        console.log(error)
    }
}
displayWeather();



searchButton.addEventListener('click',()=>{
    LOCATION = cityInput.value;
    cityInput.value = ''
    async function displayWeatherInput(){
        try{
            let result = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${LOCATION}?unitGroup=metric&key=5UTEKYU5LEYSSGSM3S9TRA6XB&contentType=json`);
            let object = await result.json();
            console.log(result.status)
            console.log(object)
            fillInfo(object)
            if(err400.style.display === 'flex'){
                infoContainer.style.display = 'flex'
                err400.style.display = 'none';
                loading.style.display = 'none'
            }
            loaded = true;
            if(loaded){
                infoContainer.style.display = 'flex'
                loading.style.display = 'none';
            }
        }catch(error){
            console.log(error)
            infoContainer.style.display = 'none'
            err400.style.display = 'flex';
        }
    }
    displayWeatherInput();
})