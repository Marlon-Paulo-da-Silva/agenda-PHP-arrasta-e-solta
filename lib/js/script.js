(function(win, doc){
  'use strict';

  // exibir o calendário
  function getCalendar(perfil, div)
  {
    let calendarEl = doc.querySelector(div);
  
    let calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar:{
        start: 'prev,next,today', 
        center: 'title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      buttonText:{
        today: 'hoje',
        month: 'mês',
        week: 'semana',
        day: 'dia'
      },
      locale: 'pt-br',
      
      dateClick: function(info){
        if(perfil == 'manager'){
          // console.log('controllers/ControllerEvents.php');
          // alert('vai para a página manager');
          win.location.href = `/views/manager/edit?id=${info.event.id}`;
        } else if (perfil == 'user'){
          if(info.view.type == 'dayGridMonth'){
            calendar.changeView('timeGrid', info.dateStr);
          } else {
            // win.location.href = 'agenda-PHP-arrasta-e-solta/views/user/add.php?date=' + info.dateStr;
            win.location.href = `/agenda-PHP-arrasta-e-solta/views/user/add.php?date=${info.dateStr}`;
          }
          // alert('vai para a página user');
          // win.location.href = `/views/user/edit?id=${info.event.id}`;
        }
      },
      events: 'http://localhost/agenda-PHP-arrasta-e-solta/controllers/ControllerEvents.php',
      eventClick: function(info){
        if(perfil == 'manager'){
          // console.log('controllers/ControllerEvents.php');
          // alert('vai para a página manager');
          // win.location.href = `/views/manager/edit?id=${info.event.id}`;
        } else if (perfil == 'user'){
          if(info.view.type == 'dayGridMonth'){
            // calendar.changeView('timeGrid', info.dateStr);
          } else {
            // win.location.href = '/views/user/add.php?date=' + info.dateStr;
          }
          // alert('vai para a página user');
          // win.location.href = `/views/user/edit?id=${info.event.id}`;
        }
      }
      
      
    });
  
    calendar.render();
  
    console.log('Calendar render');

  }

  if(doc.querySelector('.calendarUser')){
    getCalendar('user','.calendarUser');
  } else if(doc.querySelector('.calendarManager')){
    getCalendar('manager','.calendarManager');
  }


})(window, document);