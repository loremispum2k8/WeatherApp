async function getWeather(){
    try{
        //let result = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Ungheni?unitGroup=metric&key=5UTEKYU5LEYSSGSM3S9TRA6XB&contentType=json');
        let object = await result.json();
        console.log(result.status)
        console.log(object)
    }catch(error){
        console.log(error)
    }
}
getWeather();