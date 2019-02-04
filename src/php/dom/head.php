<!DOCTYPE html>
<html>
<head>

    <!-- Security: -->
    <?php

        // HTTP Strict Transport Security (HSTS).
        header("Strict-Transport-Security: max-age=31536000 ; includeSubDomains");

        // X-Frame-Options.
        header("X-Frame-Options: allow-from: https://google.com");

        // X-XSS-Protection.
        header("X-XSS-Protection: 1; mode=block");

        // X-Content-Type-Options.
        header("X-Content-Type-Options: nosniff");

        // Content-Security-Policy.
        $csp_default = "default-src 'self';";
        $csp_script = "script-src 'self' https://fonts.googleapis.com;";
        $csp_style = "style-src 'self' https://fonts.googleapis.com;";
        $csp_font = "font-src 'self' https://fonts.googleapis.com;";
        header("Content-Security-Policy: ".$csp_default.$csp_script.$csp_style.$csp_font);

        // Feature-Policy.
        $fp_accelerometer = "'self';";
        $fp_ambient_light_sensor = "'none';";
        $fp_autoplay = "'none';";
        $fp_camera = "'none';";
        $fp_encrypted_media = "'none';";
        $fp_fullscreen = "'none';";
        $fp_geolocation = "'self';";
        $fp_gyroscope = "'self';";
        $fp_magnetometer = "'self';";
        $fp_microphone = "'none';";
        $fp_midi = "'none';";
        $fp_payment = "'none';";
        $fp_picture_in_picture = "'none';";
        $fp_speaker = "'none';";
        $fp_usb = "'none';";
        $fp_vibrate = "'self';";
        $fp_vr = "'none';";
        header("Feature-Policy: " .$fp_accelerometer.$fp_ambient_light_sensor.$fp_autoplay.$fp_camera.$fp_encrypted_media.$fp_fullscreen.$fp_geolocation.$fp_gyroscope.$fp_magnetometer.$fp_microphone.$fp_midi.$fp_payment.$fp_picture_in_picture.$fp_speaker.$fp_usb.$fp_vibrate.$fp_vr);

    ?>


    <!-- Favicon: -->
    <link rel="icon" href="#">


    <!-- Settings: -->
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">


    <!-- Application settings: -->
    <meta name="application-name" content="ByBest">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">


    <!-- Application theme color: -->
    <meta name="theme-color" content="#4285f4"><!-- TODO: Change color. -->


    <!-- Description: -->
    <meta name="description" content="Boskartoteket for Bø Kommune">


    <!-- Crawling and indexing: -->
    <meta name="robots" content="index,follow"><!-- All Search Engines -->
    <meta name="googlebot" content="index,follow"><!-- Google Specific -->


    <!-- Disable Google Translate: -->
    <meta name="google" content="notranslate">


    <!-- Google Fonts: -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand:300,400,500,700">


    <!-- Google Material Icons: -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">


    <!-- CSS: -->
    <link rel="stylesheet" href="src/style/css/style.css">


    <!-- Application title: -->
    <title>Boskartoteket</title>


</head>
<body>