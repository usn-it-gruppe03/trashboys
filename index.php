<?php

// Start session.
session_start();

// Import preliminary resources:
require_once 'src/php/class/KeyMaster.php';
require_once 'src/php/class/DatabaseObject.php';
require_once 'src/php/class/User.php';

// Require site router.
require_once 'src/php/router/router.php';