(function(win, doc){
  'use strict';

  let calendarEl = doc.querySelector('.calendar');

  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar:{
      start: 'prev,next,today', 
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    locale: 'pt-br',
    // events: [
    //     { // this object will be "parsed" into an Event Object
    //       title: 'The Title', // a property!
    //       start: '2022-08-04', // a property!
    //       end: '2022-08-06' // a property! ** see important note below about 'end' **
    //     }
    // ]
    events: 'controllers/ControllerEvents.php'
  });

  calendar.render();

  console.log('Calendar render');

})(window, document);