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
      droppable: true,
      editable: true,
      eventDrop: function(info){
        resizeAndDrop(info);
      },
      eventResize: function(info){
        resizeAndDrop(info);
      },
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


  // arrasta e redimensiona os eventos
  async function resizeAndDrop(info){

    let newDate = new Date(info.event.start);
    let month = ((newDate.getMonth()+1)<9)?"0"+(newDate.getMonth()+1):(newDate.getMonth());
    let day = ((newDate.getDate()+1)<9)?"0"+newDate.getDate():newDate.getDate();
    let minutes = ((newDate.getMinutes()+1)<9)?"0"+newDate.getMinutes():newDate.getMinutes();
    newDate = `${newDate.getFullYear()}-${month}-${day} ${newDate.getHours()}:${minutes}:00`;
    
    let newDateEnd = new Date(info.event.end);
    let monthEnd = ((newDateEnd.getMonth()+1)<9)?"0"+(newDateEnd.getMonth()+1):(newDateEnd.getMonth());
    let dayEnd = ((newDateEnd.getDate()+1)<9)?"0"+newDateEnd.getDate():newDateEnd.getDate();
    let minutesEnd = ((newDateEnd.getMinutes()+1)<9)?"0"+newDateEnd.getMinutes():newDateEnd.getMinutes();
    newDateEnd = `${newDateEnd.getFullYear()}-${monthEnd}-${dayEnd} ${newDateEnd.getHours()}:${minutesEnd}:00`;

    let reqs = await fetch('http://localhost/agenda-PHP-arrasta-e-solta/controllers/ControllerDrop.php',{
      method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded'
      },
      body: `id=${info.event.id}&start=${newDate}&end=${newDateEnd}`
    });

    // let ress = await reqs.json();

    // console.log('id: ',info.event.id,' start: ', newDate,' end: ',newDateEnd);
    
    // if(response.status == 200){
    //   win.location.href = "http://localhost/agenda-PHP-arrasta-e-solta/views/manager/";
    // }
  }
  

})(window, document);