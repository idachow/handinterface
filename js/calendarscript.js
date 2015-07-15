var time = new Date().getTime();
     $(document.body).bind("mousemove keypress", function(e) {
         time = new Date().getTime();
     });

     function refresh() {
         if(new Date().getTime() - time >= 60000) 
             window.location.reload(true);
         else 
             setTimeout(refresh, 10000);
     }

     setTimeout(refresh, 10000);

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
              pullName(event.summary);
              pullDetails(when);
            }
          } else {
            pullName('');
          }

        });
      }

      function listAgenda() {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'gil06taepm0grc18268o870tj8@group.calendar.google.com',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
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
              pullAgenda(event.summary);
              pullAgendaDet(when);
            }
          } else {
            pullAgenda('Nothing today');
          }

        });
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function pullAgenda(message) {
        var agendaname = document.getElementById('output_agendaName');
        var textContent = document.createTextNode(message);
        agendaname.appendChild(textContent);
        var br = document.createElement("br");
        agendaname.appendChild(br);
      }
      function pullAgendaDet(message) {
        var agendadetails = document.getElementById('output_agendaDetails');
        var textContent = document.createTextNode(message);
        agendadetails.appendChild(textContent);
        var br = document.createElement("br");
        agendadetails.appendChild(br);
      }

      function pullName(message) {
        var clientname = document.getElementById('output_name');
        var textContent = document.createTextNode(message);
        clientname.appendChild(textContent);
        var br = document.createElement("br");
        clientname.appendChild(br);
      }

      function pullDetails(message) {
        var clientdetails = document.getElementById('output_details');
        var textContent = document.createTextNode(message);
        clientdetails.appendChild(textContent);
        var br = document.createElement("br");
        clientdetails.appendChild(br);
      }