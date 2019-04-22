<?php

// Start session.
session_start();

// Import preliminary resources:
include 'src/php/class/KeyMaster.php';
include 'src/php/class/DatabaseObject.php';
include 'src/php/class/User.php';

// Require site router.
require_once 'src/php/router/router.php';