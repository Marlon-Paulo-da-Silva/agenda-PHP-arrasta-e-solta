<?php

$dirInt = "agenda-PHP-arrasta-e-solta/";
define('DIRPAGE', "http://{$_SERVER['HTTP_HOST']}/{$dirInt}");
// define('DIRPAGE', "https://{$_SERVER['HTTP_HOST']}/{$dirInt}");

$bar = (substr($_SERVER['DOCUMENT_ROOT'], -1) == '/') ? "" : "/";

define('DIRREQ', "{$_SERVER['DOCUMENT_ROOT']}{$bar}{$dirInt}");

echo DIRPAGE . '<br />' . DIRREQ;