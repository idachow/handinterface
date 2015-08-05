function date_time() {
  today = moment().format('dddd, MMMM Do');
  document.getElementById('date').innerHTML = today;
  time = moment().format('h:mm a');
  document.getElementById('time').innerHTML = time;
  setTimeout(function () { date_time(); }, 5000);
}


$(document).ready(function() {  
  getWeather(); //Get the initial weather.
  date_time();
  setTimeout(function () { getWeather(); }, 5000);
});

function getWeather() {

  $.simpleWeather({
    location: '97209',
    unit: 'f',
    success: function(weather) {
      var timestamp = moment(weather.updated);

      html = '<h1><b>'+weather.temp+'</b>&deg;'+weather.units.temp+'</h1>';
      html += '<h2> Currently <b>'+weather.currently+'</b> in ' +weather.city+', '+weather.region+'</h2><P></P>';
      html += '<h2> High: <b>'+weather.high+ '</b> | Low: <b>'+weather.low+'</b></h2>';
      html += '<p>Weather updated at '+moment(timestamp).format('h:mm a')+'</p>';
  
      $("#weather").html(html);

    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}
