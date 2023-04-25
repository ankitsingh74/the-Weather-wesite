//Get all necessary element from DOM
const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput =document.querySelector(".cloud")
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.getElementById("locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

//default city when page loads
let cityInput = "London";

//Add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener("click", (e) =>{
        // console.log("clicked");
        cityInput = e.target.innerHTML;
        //function that fetches and display all data from the weather API
        fetchWeatherData();
        //fade out the app (simle animation)
        app.getElementsByClassName.opacity = "0";
          
    });
})

//add submit event to the form
form.addEventListener('submit', (e)=>{
    //if the input field(search bar) Empty(throw an error Alert)
    if(search.value.length == 0){
        alert("Please type in city name");
    }else{
        cityInput = search.value;
        fetchWeatherData();

        search.value = "";

        app.style.opacity = "0";
    }
    e.preventDefault();
});

function dayofTheWeek(day, month, year){
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    // return weekday[new Date(`${day}/${month}/${year}`).getDay()];
    return weekday[new Date(day,month,year).getDay()]
}

// console.log(dayofTheWeek(16, 03, 2023));



//  function dayofTheWeek(day, month, year){
//     const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
//     // console.log(weekday[0])

//     return weekday[new Date(`${day}/${month}/${year}`).getDay()];
// };
// console.log("function call    ---------------------",dayofTheWeek())
//function  that fetches and displays the data and add dynamically the city name with template literals

//  const APIkey = "041efc35449d4a8fa0e44002230603" 

  function fetchWeatherData(){
     fetch(`http://api.weatherapi.com/v1/current.json?key=041efc35449d4a8fa0e44002230603&q=${cityInput}`).then(response => response.json())
    .then(data => {
            temp.innerHTML = data.current.temp_c + "&#176;";

        conditionOutput.innerHTML = data.current.condition.text;

        const date = data.location.localtime;
        console.log(data);
        const y = parseInt(date.substr(0,4));
        const m = (+date.substr(5,2));
        const d = parseInt(date.substr(8,2));
        console.log(data.current.temp_c);
    //     console.log(typeof(m));
    //    console.log("y"+y);
    //    console.log("m"+m);
    //    console.log("d"+d);
    //    console.log("d"+date);
        const time = date.substr(11);
        
        dateOutput.innerHTML = `${dayofTheWeek(d,m,y)} ${d}, ${m} ${y}`;
        timeOutput.innerHTML = time; 
        nameOutput.innerHTML = data.location.name;

        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64".length);

        icon.src = "./icons" + iconId;

        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";
        

        let timeOfDay = "day"
        const code = data.current.condition.code;

        if(!data.current.is_day){
            timeOfDay = "night";
        }

        if(code == 1000){
            app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
            btn.style.background = "#e5ba92";
            if(timeOfDay == "night") {
                btn.style.background = "#181e27";
            }
            
        
        }else if(
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1063 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1279 ||
        code == 1282
        )
        {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";
        if(timeOfDay == "night"){
            btn.style.background = "#181e27";
        }
        }else if(
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1183 ||
        code == 1273 ||
        code == 1276 ||
        code == 1246 ||
        code == 1279 ||
        code == 1240 ||
        code == 1282
        )
        {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if(timeOfDay == "night"){
            btn.style.background = "#325c80";
       
        }
        }else{
        app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
        btn.style.background = "#4d72aa";
        if(timeOfDay == "night"){
            btn.style.background = "#1b1b1b";
        }
        }

            app.style.opacity = "1";
        })
    .catch((e) => {
       alert(e)
        app.style.opacity = "1";
    });
    

 }


 fetchWeatherData();

 app.style.opacity = "1"
 