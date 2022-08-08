<?php

  include ("../config/config.php");

  $objEvents = new \Classes\ClassEvents();

  $json = json_decode(file_get_contents('php://input'));

  var_dump($json);   
