<?php
header('Access-Control-Allow-Headers: Content-Type'); // Allow Content-Type header

require_once('../config/config.php');
require_once('../config/database.php');

// Retrieve the request body as a string
$request_body = file_get_contents('php://input');

// Decode the JSON data into a PHP array
$data = json_decode($request_body, true);

// Validate input fields with basic validation
if (empty($data['title']) || empty($data['content']) || empty($data['author']) || empty($data['category'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Error: Missing or empty required parameter']);
    exit();
}

// Validate input fields
if (!isset($data['title']) || !isset($data['content']) || !isset($data['author'])) {
    http_response_code(400);
    die(json_encode(['message' => 'Error: Missing required parameter']));
}

// Sanitize input
$title = filter_var($data['title'], FILTER_SANITIZE_STRING);
$author = filter_var($data['author'], FILTER_SANITIZE_STRING);
$content = filter_var($data['content'], FILTER_SANITIZE_STRING);
$category = filter_var($data['category'], FILTER_SANITIZE_STRING);

// Prepare statement
$stmt = $conn->prepare('INSERT INTO blog_posts (title, content, author, category) VALUES (?, ?, ?, ?)');
$stmt->bind_param('ssss', $title, $content, $author, $category);

// Execute statement
if ($stmt->execute()) {
    // Get the ID of the newly created post
    $id = $stmt->insert_id;

    // Return success response
    http_response_code(201);
    echo json_encode(['message' => 'Post created successfully', 'id' => $id]);
} else {
    // Return error response with more detail if possible
    http_response_code(500);
    echo json_encode(['message' => 'Error creating post: ' . $stmt->error]);
}

// Close statement and connection
$stmt->close();
$conn->close();
