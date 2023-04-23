<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "note_app";

// Create a new connection to the MySQL database using the mysqli extension
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
