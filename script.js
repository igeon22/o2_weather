async function searchWeather(name){
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d57d3f5e226742fe95594838241304&q=${name}`,{mode:'cors'});
    try{
        response = await response.json()
        document.querySelector(".results").style.display = "flex"
        document.querySelector(".error").style.display = "none"
        document.querySelector("h1").innerHTML = response.location.name +`, <span>${response.location.country}<span>`
        document.querySelector(".temp").textContent = `${response['current']['temp_c']}°C`
        document.querySelector(".situation").textContent = response.current.condition.text

        document.querySelector(".feels").textContent = `Feels Like : ${response.current["feelslike_c"]}°C`
        document.querySelector(".wind").textContent =`Wind Speed : ${ response.current["wind_kph"]}km/h`
        document.querySelector(".humidity").textContent = `Humidity : ${response.current["humidity"]}%`
        let txt = response.current.condition.icon
        txt = txt.replace("64x64","128x128")
        document.querySelector(".image").src = txt

    }catch(err){
        document.querySelector(".results").style.display = "none"
        document.querySelector(".error").style.display = "block"
        document.querySelector(".error").textContent = `No results for "${name}"`
    }
}




let form = document.querySelector("form");
let field = document.querySelector("#name")
form.addEventListener("submit",(e)=>{
    if(form.checkValidity()){
        e.preventDefault()
        searchWeather(field.value)
    }
})


searchWeather("tokyo")