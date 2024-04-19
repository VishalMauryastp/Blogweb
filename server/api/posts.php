<?php
// Load configuration files
require_once('../config/config.php');
require_once('../config/database.php');

header('Content-Type: application/json');

// Define configuration options
$allowedMethods = ['GET'];
$maxPostsPerPage = 10;

// Implement basic pagination
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$offset = ($page - 1) * $maxPostsPerPage;

// Query to count total posts
$countQuery = "SELECT COUNT(*) AS totalPosts FROM blog_posts";
$countResult = mysqli_query($conn, $countQuery);
$countRow = mysqli_fetch_assoc($countResult);
$totalPosts = $countRow['totalPosts'];

// Check if total posts query is successful
if (!$countResult) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['message' => 'Error querying database for total posts count: ' . mysqli_error($conn)]);
    mysqli_close($conn);
    exit();
}

// Query to get all blog posts with pagination and ordering
$query = "SELECT * FROM blog_posts ORDER BY publish_date DESC LIMIT $offset, $maxPostsPerPage";
$result = mysqli_query($conn, $query);

// Check if paginated posts query is successful
if (!$result) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['message' => 'Error querying database for paginated posts: ' . mysqli_error($conn)]);
    mysqli_close($conn);
    exit();
}

// Convert query result into an associative array
$posts = mysqli_fetch_all($result, MYSQLI_ASSOC);

// Check if there are posts
if (empty($posts)) {
    // No posts found, you might want to handle this case differently
    http_response_code(404); // Not Found
    echo json_encode(['message' => 'No posts found', 'totalPosts' => $totalPosts]);
} else {
    // Return JSON response including totalPosts
    echo json_encode(['posts' => $posts, 'totalPosts' => $totalPosts]);
}

// Close database connection
mysqli_close($conn);
