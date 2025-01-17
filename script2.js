const apiKey = 'e3107b434ebb49a7b3bf1f2e63a46ef0';
const url = `https://newsapi.org/v2/top-headlines?language=en`;

const newsContainer = document.getElementById('news-container');

function fetchAllNews() {
    fetch(`${url}&apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.articles && data.articles.length > 0) {
                displayMixedNews(data.articles);
            } else {
                console.error('No Articles Found');
                newsContainer.innerHTML = '<p>No news articles found.</p>';
            }
        })
         .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
        });
    }

function displayMixedNews(newsItems) {
    newsContainer.innerHTML = '';

    newsItems.sort(() => Math.random() - 0.5);

    newsItems.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        newsItem.innerHTML = `
                <h2 class="news-title"><a href="${item.url}" target="_blank">${item.headline || item.title}</a></h2>
                <p class="news-description">${item.description || 'For More Details Read The Original Article'}</p>
                <p class="date">${item.publishedAt || ''}</p>
                <img src="${item.urlToImage}" alt="${item.headline || item.title}" class="news-image">
        `;

        newsContainer.appendChild(newsItem);
    });
}

fetchAllNews();


//weather script \/\/

const cityInput = document.getElementById('city_input'),
searchBtn = document.getElementById('searchBtn'),
locationBtn = document.getElementById('locationBtn'),
wApiKey = 'f97613f310a2263fef8bb19069bc6208',
currentWeatherCard = document.querySelectorAll('.left .card')[0],
fiveDaysForecastCard = document.querySelector('.day-forecast'),
aqiCard = document.querySelectorAll('.highlights .card')[0],
sunCard = document.querySelectorAll('.highlights .card')[1],
humidityVal = document.getElementById('humidityVal'),
pressureVal = document.getElementById('pressureVal'),
visibilityVal = document.getElementById('visibilityVal'),
feelsVal = document.getElementById('feelsVal'),
hourlyForecastCard = document.querySelector('.hourly-forecast'),
aqiList = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

function getWeatherDetails(name, lat, lon, country, state) {
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${wApiKey}`,
    WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${wApiKey}`,
    AIR_POLLUTION_API_URL = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${wApiKey}`,
    days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ],
    months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    fetch(AIR_POLLUTION_API_URL).then(res => res.json()).then(data => {
      let {co, no, no2, o3, so2, pm2_5, pm10, nh3} = data.list[0].components;
      aqiCard.innerHTML = `
        <div class="card-head">
            <p>Air Quality Index</p>
            <p class="air-index aqi-${data.list[0].main.aqi}">${aqiList[data.list[0].main.aqi - 1]}</p>
        </div>
        <div class="air-indices">
            <div>
                <svg width="85px" height="85px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H10C11.6569 8 13 6.65685 13 5C13 3.34315 11.6569 2 10 2C8.34315 2 7 3.34315 7 5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 16H15C16.6569 16 18 17.3431 18 19C18 20.6569 16.6569 22 15 22C13.3431 22 12 20.6569 12 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12H19C20.6569 12 22 10.6569 22 9C22 7.34315 20.6569 6 19 6C17.3431 6 16 7.34315 16 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="item">
                <p>PM2.5</p>
                <h2>${pm2_5}</h2>
            </div>
            <div class="item">
                <p>PM10</p>
                <h2>${pm10}</h2>
            </div>
            <div class="item">
                <p>SO2</p>
                <h2>${so2}</h2>
            </div>
            <div class="item">
                <p>CO</p>
                <h2>${co}</h2>
            </div>
            <div class="item">
                <p>NO</p>
                <h2>${no}</h2>
            </div>
            <div class="item">
                <p>NO2</p>
                <h2>${no2}</h2>
            </div>
            <div class="item">
                <p>NH3</p>
                <h2>${nh3}</h2>
            </div>
            <div class="item">
                <p>O3</p>
                <h2>${o3}</h2>
            </div>
        </div>
      `;  
    }).catch(() => {
        alert('Failed to fetch Air Quality Index');
    });

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
            <div class="current-weather">
                <div class="details">
                     <p>Now</p>
                     <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                     <p>${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                </div>
            </div>
            <hr>
            <div class="card-footer">
                <p><img src="Icons/calendar-day.png"> ${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
                <p><img src="Icons/marker.png"> ${name}, ${country}</p>
            </div>
        `;
        let {sunrise, sunset} = data.sys,
        {timezone, visibility} = data,
        {humidity, pressure, feels_like} = data.main,
        //in the following we convert the times from UNIX format into utc
        sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A'),
        sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
        sunCard.innerHTML = `
            <div class="card-head">
                <p>Sunrise & Sunset</p>
            </div>
            <div class="sunrise-sunset">
                <div class="item">
                    <div class="icon">
                        <img src="Icons/sunrise-alt.png" alt="">
                    </div>
                    <div>
                        <p>Sunrise</p>
                        <h2>${sRiseTime}</h2>
                    </div>
                </div>
                <div class="item">
                    <div class="icon">
                        <img src="Icons/sunset.png" alt="">
                    </div>
                    <div>
                        <p>Sunset</p>
                        <h2>${sSetTime}</h2>
                    </div>
                </div>
            </div>
        `;
        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure}hPa`;
        visibilityVal.innerHTML = `${visibility/1000}km`;
        feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;

    }).catch(() => {
        alert('Failed to fetch current weather');
    });

    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let hourlyForecast = data.list;
        hourlyForecastCard.innerHTML = ``;
        for(i = 0; i <= 7; i++){
            let hrForecastDate = new Date(hourlyForecast[i].dt_txt);
            let hr = hrForecastDate.getHours();
            let a = 'PM';
            if(hr < 12) a = 'AM';
            if(hr == 0) hr = 12;
            if(hr > 12) hr = hr - 12;
            hourlyForecastCard.innerHTML += `
                <div class="card">
                    <p>${hr} ${a}</p>
                    <img src="https://openweathermap.org/img/wn/${hourlyForecast[i].weather[0].icon}.png">
                    <p>${(hourlyForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</p>
                </div>
            `;
        }
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        });
        fiveDaysForecastCard.innerHTML = '';
        for(i = 1; i < fiveDaysForecast.length; i++) {
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
                <div class="forecast-item">
                    <div class="icon-wrapper">
                        <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt="">
                        <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                    </div>
                    <p>${date.getDate()} ${months[date.getMonth()]}</p>
                    <p>${days[date.getDay()]}</p>
                </div>
            `;
        }
    }).catch(() => {
        alert('Failed to fetch weather forecast');
    });
}

function getCityCoordinates(){
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if(!cityName) return;
    let GEOCODING_API_URL_ = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${wApiKey}`;
    fetch(GEOCODING_API_URL_).then(res => res.json()).then(data => {
        let {name, lat, lon, country, state} = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

function getUserCoordinates() {
    navigator.geolocation.getCurrentPosition(position => {
        let {latitude, longitude} = position.coords;
        let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${wApiKey}`;
        fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
            let {name, country, state} = data[0];
            getWeatherDetails(name, latitude, longitude, country, state);
        }).catch(() => {
            alert('Failed to fetch user coordinates.');
        });
    }, error => {
            if(error.code === error.PERMISSION_DENIED){
                alert('Geolocation permession denied.');
            }
    });
}
searchBtn.addEventListener('click', getCityCoordinates);
locationBtn.addEventListener('click', getUserCoordinates);
cityInput.addEventListener('keyup', e => e.key === 'Enter' && getCityCoordinates());
