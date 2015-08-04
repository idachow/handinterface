


// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '568834711136-k5krj3frsomrm84npb7ng0me1o7b3hto.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar"];


/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES,
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadCalendarApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', listCurrentClient);
  gapi.client.load('calendar', 'v3', listAgenda);
}


function isSameDay(gcalYear, gcalMonth, gcalDay) {
  jsYear = moment().format('YYYY');
  jsMonth = moment().format('MM');
  jsDay = moment().format('DD');
  if (jsYear == gcalYear && jsMonth == gcalMonth && jsDay == gcalDay) {
    return true;
  } else {
    return false;
  }
}

function parseWhen(when){
  var itemWhen = when;
  var itemWhenArray = itemWhen.split("-");
  var itemY = itemWhenArray[0];
  var itemM = itemWhenArray[1];
  var midSplit = itemWhenArray[2].split("T");
  var itemD = midSplit[0];
  var itemT0 = midSplit[1];
  var itemT1 = itemWhenArray[3];
  var itemFinalArray = [itemY, itemM, itemD, itemT0, itemT1];
  return itemFinalArray;
}

function makeTwelveHr(time){
  var tSplit = time.split(":");
  var twelve = parseInt(tSplit[0]);
  if (twelve <= 12) {
    mTime = " am";
  } else {
    mTime = " pm";
  };
  if (twelve % 12 == 0){
    twelve = (12).toString();
  } else {
    twelve = (twelve % 12).toString();
  }
  var answer = [twelve, ":", tSplit[1], mTime].join("")
  return answer;
}
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listCurrentClient() {
  var request = gapi.client.calendar.events.list({
    'calendarId': '8mtpsbhbhp4p5j34v9kcl94lrs@group.calendar.google.com',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 1,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    var events = resp.items;
    // appendPre('Client:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        var itemDate = parseWhen(when);
        if (isSameDay(itemDate[0], itemDate[1], itemDate[2]) == true) {
          pullName(event.summary);
        } else {
          pullName('');
        }
      }
    }
  });
  setTimeout(function () { listCurrentClient(); }, 5000);
}

function listAgenda() {
  var request = gapi.client.calendar.events.list({
    'calendarId': 'gil06taepm0grc18268o870tj8@group.calendar.google.com',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    // 'maxResults': 10,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    var events = resp.items;
    // appendPre('Client:');

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }
        var itemDate = parseWhen(when);
        if (isSameDay(itemDate[0], itemDate[1], itemDate[2]) == true) {
          pullAgenda(event.summary,when);
        } else {
          pullAgenda('');
        }
      }
    } 
  });
  setTimeout(function () { listCurrentClient(); }, 5000);
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function pullAgenda(message,when) {
  // var agendaname = document.getElementById('output_agendaName');
  // var textContent = document.createTextNode(message);
  // agendaname.appendChild(textContent);
  // var br = document.createElement("br");
  // agendaname.appendChild(br);
  document.getElementById('output_agendaName').innerHTML = message;
  var agendaWhen = parseWhen(when);
  document.getElementById('output_agendaDetails').innerHTML = makeTwelveHr(agendaWhen[3]);
}


function pullName(message) {
  document.getElementById('output_name').innerHTML = message;
}




//NOT USING THIS vv
// function pullDetails(message) {
//   var clientdetails = document.getElementById('output_details');
//   var textContent = document.createTextNode(message);
//   clientdetails.appendChild(textContent);
//   var br = document.createElement("br");
//   clientdetails.appendChild(br);
// }


// function date_time() {
//   today = moment().format('dddd, MMMM Do');
//   document.getElementById('date').innerHTML = today;
//   time = moment().format('h:mm a');
//   document.getElementById('time').innerHTML = time;
//   setTimeout(function () { date_time(); }, 1000);
// }


// $(document).ready(function() {  
//   getWeather(); //Get the initial weather.
//   date_time();
// });
