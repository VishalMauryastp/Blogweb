<?php
// Load configuration files
require_once('../config/config.php');
require_once('../config/database.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $requestUri = $_SERVER['REQUEST_URI'];
    $parts = explode('/', $requestUri);
    $id = end($parts);

    $query = "SELECT bp.*, 
                     (SELECT COUNT(*) FROM post_votes WHERE post_id = bp.id AND vote_type = 'like') AS numLikes,
                     (SELECT COUNT(*) FROM post_votes WHERE post_id = bp.id AND vote_type = 'dislike') AS numDislikes
              FROM blog_posts AS bp WHERE bp.id = ?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $post = $result->fetch_assoc();

        $response = [
            'status' => 'success',
            'data' => [
                'id' => $post['id'],
                'title' => $post['title'],
                'content' => $post['content'],
                'author' => $post['author'],
                'date' => date("l jS \of F Y", strtotime($post['publish_date'])),
                // 'likes' => $post['numLikes'],
                // 'dislikes' => $post['numDislikes']
            ]
        ];

        header('Content-Type: application/json');
        echo json_encode($response);
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Post not found'
        ];

        header('Content-Type: application/json');
        echo json_encode($response);
    }

    $stmt->close();
    $conn->close();
}

// function checkVote($conn, $postId, $ipAddress, $voteType) {
//     $query = "SELECT * FROM post_votes WHERE post_id=? AND user_ip=? AND vote_type=?";
//     $stmt = mysqli_prepare($conn, $query);
//     mysqli_stmt_bind_param($stmt, "iss", $postId, $ipAddress, $voteType);
//     mysqli_stmt_execute($stmt);
//     $result = mysqli_stmt_get_result($stmt);
//     return mysqli_num_rows($result) > 0;
// }

// function insertVote($conn, $postId, $ipAddress, $voteType) {
//     if (!checkVote($conn, $postId, $ipAddress, $voteType)) {
//         $query = "INSERT INTO post_votes (post_id, user_ip, vote_type) VALUES (?, ?, ?)";
//         $stmt = mysqli_prepare($conn, $query);
//         mysqli_stmt_bind_param($stmt, "iss", $postId, $ipAddress, $voteType);
//         mysqli_stmt_execute($stmt);
//         return mysqli_stmt_affected_rows($stmt) > 0;
//     }
//     return false;
// }

// function removeVote($conn, $postId, $ipAddress, $voteType) {
//     if (checkVote($conn, $postId, $ipAddress, $voteType)) {
//         $query = "DELETE FROM post_votes WHERE post_id=? AND user_ip=? AND vote_type=?";
//         $stmt = mysqli_prepare($conn, $query);
//         mysqli_stmt_bind_param($stmt, "iss", $postId, $ipAddress, $voteType);
//         mysqli_stmt_execute($stmt);
//         return mysqli_stmt_affected_rows($stmt) > 0;
//     }
//     return false;
// }

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $segments = explode('/', $_SERVER['REQUEST_URI']);
//     $postId = $segments[6];
//     $action = $segments[7];
//     $ipAddress = $segments[8];
//     $voteType = $action === 'like' ? 'like' : 'dislike';

//     if (checkVote($conn, $postId, $ipAddress, $voteType)) {
//         if (removeVote($conn, $postId, $ipAddress, $voteType)) {
//             http_response_code(200);
//             echo json_encode(['message' => ucfirst($voteType) . ' removed successfully.']);
//         } else {
//             http_response_code(500);
//             echo json_encode(['message' => 'Failed to remove ' . $voteType . '.']);
//         }
//     } else {
//         if (insertVote($conn, $postId, $ipAddress, $voteType)) {
//             http_response_code(201);
//             echo json_encode(['message' => ucfirst($voteType) . ' added successfully.']);
//         } else {
//             http_response_code(500);
//             echo json_encode(['message' => 'Failed to add ' . $voteType . '.']);
//         }
//     }
// }