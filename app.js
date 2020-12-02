const http = new EasyHTTP();
const ui = new UI();

const MBapiToken = 'pk.eyJ1IjoicmFrODEwIiwiYSI6ImNraTYzdDdwMDJuMm4zMGtieDlsOHJ5bG0ifQ.51iHjVr-BxZq9FJvGEQyTw';
const OWMapiToken = '25eebf3ad2deabc5a763038ae0406abc';


const dt = document.querySelector('#date');
const temp = document.querySelector('#temp');
const loc = document.querySelector('#location');
const desc = document.querySelector('#description');
const hum = document.querySelector('#humidity');
const dew = document.querySelector('#dew');
const pres = document.querySelector('#pressure');
const wind = document.querySelector('#wind');
const tbody = document.querySelector('tbody');

ui.setDate(dt);

document.querySelector('#input').addEventListener('keyup', function(e) {

    if(e.keyCode === 13) {
      const InputLocation = encodeURIComponent(e.target.value);
      console.log(InputLocation);
      http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${InputLocation}.json?access_token=${MBapiToken}`, function(err, res) {
        if(err) {
          console.log(err);
        }
        else {
          const lat = res.features[0].center[1];
          const long = res.features[0].center[0];
          console.log(res);
          ui.setResult(loc, res.features[0].place_name);
          getWeather(lat, long);
        }
      });
    }
});

function getWeather(lat, long) {
  //let weather = [];

  http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely&appid=${OWMapiToken}`, function(err, res) {
    if(err) {
      console.log(err);
    }
    else {
      ui.setResult(temp, res.current.temp);
      ui.setResult(pres, `${res.current.pressure} Pa`);
      ui.setResult(dew, `${res.current.dew_point} C`);
      ui.setResult(wind, `${res.current.wind_speed} Km/h`);
      ui.setResult(hum, `${res.current.humidity} %`);
      ui.setResult(desc, res.current.weather[0].main);
      const hourly = res.hourly;
      let output = [];
      hourly.forEach(function(hr, i) {
        const tm = moment.unix(hr.dt);
        console.log(i);
        if(moment().isSame(tm, 'day')&&i <= 5)
        output += `
          <tr>
            <td>${tm.format('hh:mm A')}</td>
            <td>${hr.weather[0].main}</td>
            <td>${hr.temp}<sup>o</sup> c</td>
         </tr>
        `
      });

      console.log(output);
      tbody.innerHTML = output;
    }
  });
}

