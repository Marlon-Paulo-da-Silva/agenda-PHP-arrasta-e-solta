(function(win, doc){
  'use strict';

  let calendarEl = doc.querySelector('.calendar');

  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar:{
      start: 'title', 
      center: '',
      end: 'today prev,next'
    },
    locale: 'pt-br'
  });

  calendar.render();

  console.log('Calendar render');

})(window, document);