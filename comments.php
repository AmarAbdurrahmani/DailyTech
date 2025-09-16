<?php
// Path to the comments file
$commentsFile = 'comments.txt';

// Handle new comment POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $comment = trim($_POST['comment'] ?? '');

    if ($comment !== '') {
        // Escape special HTML characters to avoid XSS
        $safeComment = htmlspecialchars($comment, ENT_QUOTES, 'UTF-8');

        // Append comment to the file with a newline
        file_put_contents($commentsFile, $safeComment . "\n", FILE_APPEND | LOCK_EX);
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Empty comment']);
    }
    exit;
}

// Handle GET request: return all comments as JSON array
if (file_exists($commentsFile)) {
    $comments = file($commentsFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
} else {
    $comments = [];
}

header('Content-Type: application/json');
echo json_encode($comments);
