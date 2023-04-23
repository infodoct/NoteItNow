// Add event listeners once the DOM has loaded
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    // Add event listeners for the login and register forms, if they exist on the current page
    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }

    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }
});

// Function to log in the user
async function loginUser(event) {
    event.preventDefault();

    // Get the input values from the login form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    // Create an object containing the form data
    const formData = new FormData();
    formData.append("action", "login");
    formData.append("username", username);
    formData.append("password", password);

    try {
        // Make a Fetch request to the auth.php script, sending the form data
        const response = await fetch("php/auth.php", {
            method: "POST",
            body: formData,
        });

        // Parse the JSON response
        const data = await response.json();

        if (data.success) {
            // Redirect to the dashboard.html if the login is successful
            window.location.href = "dashboard.html";
        } else {
            // Display an error message if the login failed
            errorMsg.textContent = data.message;
        }
    } catch (error) {
        errorMsg.textContent = "An error occurred. Please try again. (loginUser)";
    }
}

// Function to register a new user
async function registerUser(event) {
    event.preventDefault();

    // Get the input values from the registration form
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorMsg = document.getElementById("error-msg");

    // Validate the input (e.g., check if the passwords match)
    if (password !== confirmPassword) {
        errorMsg.textContent = "Passwords do not match.";
        return;
    }

    // Create an object containing the form data
    const formData = new FormData();
    formData.append("action", "register");
    formData.append("username", username);
    formData.append("password", password);

    try {
        // Make a Fetch request to the auth.php script, sending the form data
        const response = await fetch("php/auth.php", {
            method: "POST",
            body: formData,
        });

        // Parse the JSON response
        const data = await response.json();

        if (data.success) {
            // Redirect to the login.html if the registration is successful
            window.location.href = "login.html";
        } else {
            // Display an error message if the registration failed
            errorMsg.textContent = data.message;
        }
    } catch (error) {
        errorMsg.textContent = "An error occurred. Please try again. (registerUser)";
    }
}

// Functions for notes CRUD operations (create, read, update, delete)
// Use Fetch API requests to interact with the notes.php script
// Add these functions at the end of the script.js file

// Function to fetch and display the list of notes
async function fetchNotes() {
    const notesList = document.getElementById("notes-list");
    const errorMsg = document.getElementById("error-msg");

    try {
        const response = await fetch("php/fetch_notes.php", {
            method: "GET",
        });

        const notes = await response.json();

        if (notes.success) {
            // Clear the notes list
            notesList.innerHTML = "";

            // Iterate through the notes and create the DOM elements
            notes.data.forEach(note => {
                const noteDiv = document.createElement("div");
                noteDiv.className = "note";
                noteDiv.id = `note-${note.id}`;

                const titleInput = document.createElement("input");
                titleInput.type = "text";
                titleInput.id = `title-${note.id}`;
                titleInput.name = "title";
                titleInput.value = note.title;

                const contentTextarea = document.createElement("textarea");
                contentTextarea.id = `content-${note.id}`;
                contentTextarea.name = "content";
                contentTextarea.rows = "4";
                contentTextarea.textContent = note.content;

                const updateButton = document.createElement("button");
                updateButton.textContent = "Update Note";
                updateButton.onclick = () => updateNote(note.id);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete Note";
                deleteButton.onclick = () => deleteNote(note.id);

                noteDiv.appendChild(titleInput);
                noteDiv.appendChild(contentTextarea);
                noteDiv.appendChild(updateButton);
                noteDiv.appendChild(deleteButton);

                notesList.appendChild(noteDiv);
            });
        } else {
            errorMsg.textContent = notes.message;
        }
    } catch (error) {
        errorMsg.textContent = "An error occurred while fetching notes. Please try again.";
    }
}

// Function to create a new note
async function createNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const errorMsg = document.getElementById("error-msg");

    const formData = new FormData();
    formData.append("action", "create");
    formData.append("title", title);
    formData.append("content", content);

    try {
        const response = await fetch("php/notes.php", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            // Clear the input fields and display a success message
            document.getElementById("title").value = "";
            document.getElementById("content").value = "";
            errorMsg.textContent = "Note created successfully.";

            // Fetch and display the updated list of notes
            fetchNotes();
        } else {
            errorMsg.textContent = data.message;
        }
    } catch (error) {
        errorMsg.textContent = "An error occurred. Please try again. (createNote)";
    }
}

// Function to update an existing note
async function updateNote(note_id) {
    const title = document.getElementById("title-" + note_id).value;
    const content = document.getElementById("content-" + note_id).value;
    const errorMsg = document.getElementById("error-msg");

    const formData = new FormData();
    formData.append("action", "update");
    formData.append("note_id", note_id);
    formData.append("title", title);
    formData.append("content", content);

    try {
        const response = await fetch("php/notes.php", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            errorMsg.textContent = "Note updated successfully.";

            // Fetch and display the updated list of notes
            await fetchNotes();
        } else {
            errorMsg.textContent = data.message;
        }
    } catch (error) {
        errorMsg.textContent = "An error occurred. Please try again. (updateNote)";
    }
}

// Function to delete a note
async function deleteNote(note_id) {
    const errorMsg = document.getElementById("error-msg");

    const formData = new FormData();
    formData.append("action", "delete");
    formData.append("note_id", note_id);

    try {
        const response = await fetch("php/notes.php", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            errorMsg.textContent = "Note deleted successfully.";

            // Fetch and display the updated list of notes
            await fetchNotes();
        } else {
            errorMsg.textContent = data.message;
        }
    } catch (error) {
        errorMsg.textContent = "An error occurred. Please try again. (deleteNote)";
    }
}

// Initialize the notes list
//fetchNotes();

           
