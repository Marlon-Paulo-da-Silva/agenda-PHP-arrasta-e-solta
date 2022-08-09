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
      selectable: true,
      select: async (arg) => {
        let title = prompt('Nome do evento: ');
        if(title){
          let response = await fetch('http://localhost/agenda-PHP-arrasta-e-solta/controllers/ControllerSelectable.php',{
            method: 'post',
            headers: {
              'Content-Type':'application/json',
              'Accept':'application/json',
            },
            body: JSON.stringify({
              title: title,
              start: arg.start,
              end: arg.end
            })
          });
          console.log(response);
          if(response.status == 200){
            win.location.href = "http://localhost/agenda-PHP-arrasta-e-solta/views/manager/";
          }
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