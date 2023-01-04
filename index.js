const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
let currentWeatherItemsEl = document.getElementById('arrange');
// const timezone = document.getElementById('time-zone');
// const countryEl = document.getElementById('country');
// const weatherForecastEl = document.getElementById('weather-forecast');
// const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
const API_ID = '49cc8c821cd2aff9af04c9f98c36eb74';
let units = 'metric';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);

let searchMethod;
function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

// getWeatherData()
function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/forecast?${searchMethod}=${searchTerm}&appid=${API_ID}&units=${units}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
    })

}

// var d = new Date();
// // var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

// //Function to get the correct integer for the index of the days array
// function CheckDay(day){
//     if(day + d.getDay() > 6){
//         return day + d.getDay() - 7;
//     }
//     else{
//         return day + d.getDay();
//     }
// }

//     for(i = 0; i<5; i++){
//         document.getElementById("day" + (i+1)).innerHTML = days[CheckDay(i)];
//     }

function showWeatherData (data){
    // let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    let humidityEl = document.getElementById("humidity");
    let pressureEl = document.getElementById("pressure");
    let cityHeader=document.getElementById("head");
    let windSpeedEl = document.getElementById("wind_speed");
    // let minTempEl = document.getElementById("")

    windSpeedEl.innerHTML = 'Wind Speed: ' + Math.floor(data.list[0].wind.speed) + ' m/s';
    cityHeader.innerHTML = data.city.name;
    humidityEl.innerHTML = 'Humidity: ' + data.list[0].main.humidity + '%';
    pressureEl.innerHTML = 'Pressure: ' + data.list[0].main.pressure;


    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + data.list[i].main.temp_min + "°"+"C";
        //Number(1.3450001).toFixed(2); // 1.35
    }

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + data.list[i].main.temp_max + "°"+"C";
    }

    var d = new Date();
// var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = days[CheckDay(i)];
    }

    for(i = 0; i<5; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon +".png";
    }


//     var d = new Date();
// // var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

// //Function to get the correct integer for the index of the days array
// function CheckDay(day){
//     if(day + d.getDay() > 6){
//         return day + d.getDay() - 7;
//     }
//     else{
//         return day + d.getDay();
//     }
// }

//     for(i = 0; i<5; i++){
//         document.getElementById("day" + (i+1)).innerHTML = days[CheckDay(i)];
//     }
    
    
    // `;

    // let otherDayForcast = ''
    // data.daily.forEach((day, idx) => {
    //     if(idx == 0){
    //         currentTempEl.innerHTML = `
    //         <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
    //         <div class="other">
    //             <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
    //             <div class="temp">Night - ${day.temp.night}&#176;C</div>
    //             <div class="temp">Day - ${day.temp.day}&#176;C</div>
    //         </div>
            
    //         `
    //     }else{
    //         otherDayForcast += `
    //         <div class="weather-forecast-item">
    //             <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
    //             <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
    //             <div class="temp">Night - ${day.temp.night}&#176;C</div>
    //             <div class="temp">Day - ${day.temp.day}&#176;C</div>
    //         </div>
            
    //         `
    //     }
    // })


    // weatherForecastEl.innerHTML = otherDayForcast;
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
});