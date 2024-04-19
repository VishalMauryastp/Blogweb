<?php
// Define configuration options
$allowedOrigins = ['http://localhost:5173'];
$allowedHeaders = ['Content-Type'];
//$allowedMethods = ['GET', 'POST', 'OPTIONS']; // Add this line

// Set headers for CORS
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
    header('Access-Control-Allow-Methods: ' . implode(', ', $allowedMethods));
}

if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
    $requestHeaders = explode(',', $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']);
    $requestHeaders = array_map('trim', $requestHeaders); // Trim whitespace from headers
    if (count(array_intersect($requestHeaders, $allowedHeaders)) == count($requestHeaders)) {
        header('Access-Control-Allow-Headers: ' . implode(', ', $allowedHeaders));
    }
}
