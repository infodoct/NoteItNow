To install your note-taking web application on a WAMP server, follow these steps:

Install WAMP Server:
        Download the latest version of WAMP server from the official website (https://www.wampserver.com/en/) according to your system's architecture (32-bit or 64-bit).
        Run the installation file and follow the on-screen instructions. Choose a suitable installation directory (e.g., C:\wamp64). During the installation, you may be prompted to choose a default web browser and text editor. Select your preferred options.
        Launch WAMP server after installation. You should see a green "W" icon in your system tray, indicating that WAMP is running.

To create the MySQL database and tables using phpMyAdmin, please follow these steps:

1. Open phpMyAdmin:
   - you can access phpMyAdmin by opening your web browser and navigating to http://localhost/phpmyadmin.

2. Log in to phpMyAdmin:
   - Use your MySQL root credentials to log in.

3. Create the note_app database and tables:
   - Once you are logged in to phpMyAdmin, you should see the phpMyAdmin interface.
   - Clik on the "Import" tab in the navigation menu at the top of the page.
   - On the "Import" page, click the "Choose File" button and locate the SQL file (create.sql in the sql subdirectory of the project) on your local machine.
   - Double-check the code to ensure it is correctly copied and that there are no syntax errors.
   - After pasting the code, click the "Go" button to execute the SQL statements.
   - This will create the note_app database and the required tables in the database.

To populate the test data using the SQL file, follow these steps:

1. Locate the SQL file:
   - Make sure you have the SQL file that contains the test data "populate.sql" in the sql subdirectory of the project.

2. Import the SQL file:
   - In phpMyAdmin, select the note_app database from the left-hand sidebar.
   - With the note_app database selected, click on the "Import" tab in the navigation menu at the top of the page.
   - On the "Import" page, click the "Choose File" button and locate the SQL file on your local machine.
   - Once you have selected the file, click the "Go" button to import the SQL file.
   - phpMyAdmin will execute the SQL statements in the file and populate the tables with the test data.

After completing these steps, you should have the note_app database with the required tables created, and the test data populated in the tables.

    Prepare the Application Files:
        Organize your application files into a folder structure, ensuring you have the following files:
            HTML files (login.html, register.html, dashboard.html)
            CSS file (style.css)
            JavaScript file (script.js)
            PHP files (login.php, register.php, notes.php, fetch_notes.php)
        Update the PHP files with the correct database connection information (hostname, username, password, and database name).

    Deploy the Application on WAMP Server:
        Copy your application folder (e.g., note_app) to the WAMP server's www directory (e.g., C:\wamp64\www).
        Ensure WAMP server is running (green "W" icon in the system tray).
        Open your web browser and navigate to http://localhost/note_app/login.html (replace note_app with your application folder name if different).

    Test the Application:
        Test the functionality of your application, including user registration, login, note creation, updating, and deletion. Verify that the application works correctly and troubleshoot any issues that arise.

By following these steps, your note-taking web application should be installed and running on a WAMP server.
