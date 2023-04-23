<?php
// Load configuration file
require_once('config.php');

session_start();
$user_id = $_SESSION['user_id'];

// Get the HTTP method used in the request
$method = $_SERVER['REQUEST_METHOD'];

// If this is a POST request
if ($method === 'POST') {

    // Get the desired action from the form data
    $action = $_POST['action'];

    // Check if the action is valid
    if ($action === 'create') {

        // Get the note data from the form data
        $title = $_POST['title'];
        $content = $_POST['content'];

        // Insert the new note into the database
        $stmt = $conn->prepare("INSERT INTO notes (user_id,title, content) VALUES (?,?, ?)");
        $stmt->bind_param("sss",$user_id,$title,$content);

        // Get the ID of the newly inserted note
        $id = mysqli_insert_id($conn);

        // Execute the SQL statement
        if ($stmt->execute()) {
            // Send a JSON response with a success message
            echo json_encode(["success" => true, "message" => "Note created successfully (".$id.")."]);
        } else {
            // Send a JSON response with an error message
            echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
        }

        // Close the SQL statement
        $stmt->close();

    } elseif ($action === 'update') {

        // Get the note data from the form data
        $id = $_POST['note_id'];
        $title = $_POST['title'];
        $content = $_POST['content'];

        // Update the note in the database
        $stmt = $conn->prepare("UPDATE notes SET title = ?, content = ? WHERE id = ?");
        $stmt->bind_param("sss",$title,$content,$id);

        // Execute the SQL statement
        if ($stmt->execute()) {
            // Send a JSON response with a success message
            echo json_encode(["success" => true, "message" => "Note updated successfully (".$id.")."]);
        } else {
            // Send a JSON response with an error message
            echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
        }

        // Close the SQL statement
        $stmt->close();



    } elseif ($action === 'delete') {

        // Get the ID of the note to delete from the form data
        $id = $_POST['note_id'];

        // Delete the note from the database
        $stmt = $conn->prepare("DELETE FROM notes WHERE id = ?");
        $stmt->bind_param("s",$id);


        // Execute the SQL statement
        if ($stmt->execute()) {
            // Send a JSON response with a success message
            echo json_encode(["success" => true, "message" => "Note deleted successfully (".$id.")."]);
        } else {
            // Send a JSON response with an error message
            echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
        }

        // Close the SQL statement
        $stmt->close();

    } else {

        // If the action is not valid, return an error response
        echo json_encode([
            'success' => false,
            'message' => 'Invalid action'
        ]);

    }

} else {

    // If this is not a POST request, return an error response
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);

}

?>
