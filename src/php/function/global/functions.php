<?php

function echof($value):void {
    echo '<pre>';
    print_r($value);
    echo '</pre>';
}

function is_json($value):bool {
    json_decode($value);
    return (json_last_error() === JSON_ERROR_NONE);
}
