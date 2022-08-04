<?php

namespace Models;

abstract class ModelConnect
{
  protected function connectDB(){
    try{
      $con = new \PDO("mysql:host=".DB_SERVER.";dbname=".DB_NAME."",DB_USERNAME,DB_PASSWORD);
      return $con;
    } catch (\PDOException $e){
      return $e->getMessage();
    }
  }
}