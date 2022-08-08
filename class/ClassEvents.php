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

    # Trazer os dados de eventos do banco
    public function createEvent($id = 0, $title, $description, $color = 'blue', $start, $end){
      $b = $this->connectDB()->prepare("INSERT INTO events values (?,?,?,?,?,?)");
      $b->bindParam(1, $id, \PDO::PARAM_INT);
      $b->bindParam(2, $title, \PDO::PARAM_STR);
      $b->bindParam(3, $description, \PDO::PARAM_STR);
      $b->bindParam(4, $color, \PDO::PARAM_STR);
      $b->bindParam(5, $start, \PDO::PARAM_STR);
      $b->bindParam(6, $end, \PDO::PARAM_STR);
      $b->execute();

    }

    # Buscar eventos pelo id
    public function getEventsById($id){
      $b = $this->connectDB()->prepare("SELECT * FROM events WHERE id = ?");
      $b->bindParam(1, $id, \PDO::PARAM_INT);
      $b->execute();

      return $f = $b->fetch(\PDO::FETCH_ASSOC);
    }

  }