<?php
require_once "config.php";

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if the action is for registration or login
    if ($action === 'register') {
        // Hash the password using the password_hash() function
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare a SQL statement to insert a new user into the database
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $password);

        // Execute the SQL statement
        if ($stmt->execute()) {
            // Send a JSON response with a success message
            echo json_encode(["success" => true, "message" => "User registered successfully."]);
        } else {
            // Send a JSON response with an error message
            echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
        }

        // Close the SQL statement
        $stmt->close();
    } elseif ($action === 'login') {
        // Hash the password using the password_hash() function
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare a SQL statement to find the user in the database
        $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);

        // Execute the SQL statement
        $stmt->execute();

        // Bind the result variables and fetch the data
        $stmt->bind_result($user_id, $password);
        $stmt->fetch();

        // Verify the provided password with the stored hash using password_verify()
        if (password_verify($password, $hashed_password)) {
            // Send a JSON response with a success message
            session_start();
            $_SESSION['user_id'] = $user_id;
            echo json_encode(["success" => true, "message" => "User logged in successfully."]);
        } else {
            // Send a JSON response with an error message
            echo json_encode(["success" => false, "message" => "Invalid username or password."]);
        }

        // Close the SQL statement
        $stmt->close();
    }
}

// Close the database connection
$conn->close();
?>
