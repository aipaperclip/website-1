<?php

// define short code for DIRECTORY_SEPARATOR
define('DS', DIRECTORY_SEPARATOR);
// define base directory for project
define('ROOT', realpath(dirname(__FILE__)) . DS);
// define uploads directory
define('UPLOADS', ROOT . 'public' . DS . 'assets' . DS . 'uploads' . DS);
define('UPLOADS_FRONT_END', DS . 'assets' . DS . 'uploads' . DS);
define('EMAIL_RECEIVER', 'absoabso@abv.bg');
define('MAX_UPL_SIZE', 2097152);