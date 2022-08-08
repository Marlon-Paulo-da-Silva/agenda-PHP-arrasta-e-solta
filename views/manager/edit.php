<?php include('../../config/config.php') ?>
<?php include(DIRREQ.'lib/html/header.php') ?>
<?php 
  $objEvents = new \Classes\ClassEvents();

  $events = $objEvents->getEventsById($_GET['id']);

  $date = new \DateTime($events['start']);

  
?>

  <a id="delete" href="<?= DIRPAGE.'controllers/ControllerDelete.php?id='.$_GET['id']; ?>"><i class="fas fa-trash"></i></a>

  <form name="formEdit" id="formEdit" method="post" action="<?php echo DIRPAGE.'controllers/ControllerEdit.php'; ?>">
    <input type="hidden" name="id" id="id" value="<?= $_GET['id']; ?>"><br />
    Data: <input type="date" name="date" id="date" value="<?php echo $date->format("Y-m-d"); ?>"><br />
    Hora: <input type="time" name="time" id="time" value="<?php echo $date->format("H:i"); ?>"><br />
    Paciente: <input type="text" name="title" id="title" value="<?= $events['title']; ?>"><br />
    Queixa: <input type="text" name="description" id="description" value="<?= $events['description']; ?>"><br />
   
    <input type="submit" value="Confirmar Consulta">

  </form>
<?php include(DIRREQ.'lib/html/footer.php') ?>