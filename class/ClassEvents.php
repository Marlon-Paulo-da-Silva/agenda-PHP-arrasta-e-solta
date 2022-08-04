<?php

  namespace Classes;

  use Models\ModelConnect;

  class ClassEvents extends ModelConnect
  {
    # Trazer os dados de eventos do banco
    public function getEvents()
    {
      $b = $this->connectDB()->prepare("SELECT * FROM events");
      $b->execute();
      $fetch = $b->fetchAll(\PDO::FETCH_ASSOC);

      return json_encode($fetch);
    }

  }