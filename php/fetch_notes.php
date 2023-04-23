<?php
session_start();
require_once "config.php";

header("Content-Type: application/json");

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["success" => false, "message" => "User not authenticated."]);
    exit;
}

// Get the user_id from the session
$user_id = $_SESSION['user_id'];

// Prepare a SQL statement to fetch the notes for the current user
$stmt = $conn->prepare("SELECT id, title, content FROM notes WHERE user_id = ?");
$stmt->bind_param("i", $user_id);

// Execute the SQL statement
$stmt->execute();

// Bind the result variables and fetch the data
$stmt->bind_result($note_id, $title, $content);

$notes = [];

// Loop through the result set and store the notes in an array
while ($stmt->fetch()) {
    $notes[] = [
        "id" => $note_id,
        "title" => $title,
        "content" => $content,
    ];
}

// Close the SQL statement
$stmt->close();

// Close the database connection
$conn->close();

// Send a JSON response with the notes data
echo json_encode(["success" => true, "data" => $notes]);
?>
