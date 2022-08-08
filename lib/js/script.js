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
          calendar.changeView('timeGrid', info.dateStr);
        } else if (perfil == 'user'){
          if(info.view.type == 'dayGridMonth'){
            calendar.changeView('timeGrid', info.dateStr);
          } 
        }
      },

      events: 'http://localhost/agenda-PHP-arrasta-e-solta/controllers/ControllerEvents.php',
     
      eventClick: function(info){
        if(perfil == 'manager'){
          win.location.href = `/agenda-PHP-arrasta-e-solta/views/manager/edit.php?id=${info.event.id}`;
        } else if (perfil == 'user'){
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

  if(doc.querySelector('#delete')){
    let btn = doc.querySelector('#delete');
    btn.addEventListener('click', (event)=>{
      event.preventDefault();
      if(confirm("Deseja mesmo apagar este dado?")){
        win.location.href = event.target.parentNode.href;
      }

    }, false);
  }


})(window, document);