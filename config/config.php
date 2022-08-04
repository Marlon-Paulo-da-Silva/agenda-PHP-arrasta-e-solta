<?php

# Caminhos absolutos
$dirInt = "agenda-PHP-arrasta-e-solta/";
define('DIRPAGE', "http://{$_SERVER['HTTP_HOST']}/{$dirInt}");
// define('DIRPAGE', "https://{$_SERVER['HTTP_HOST']}/{$dirInt}");

$bar = (substr($_SERVER['DOCUMENT_ROOT'], -1) == '/') ? "" : "/";

define('DIRREQ', "{$_SERVER['DOCUMENT_ROOT']}{$bar}{$dirInt}");

// echo DIRPAGE . '<br />' . DIRREQ;

# Banco de dados

define('DB_SERVER', 'localhost');
define('DB_NAME', 'sistemadeeventos');
define('DB_CHARSET', 'utf8');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');

# Incluir arquivos

include(DIRREQ . 'lib/composer/vendor/autoload.php');