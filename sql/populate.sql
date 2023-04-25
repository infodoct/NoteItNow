-- Insert test data into the users table
INSERT INTO users (username, email, password)
VALUES
('user1', 'password1'),
('user2', 'password2'),
('user3', 'password3');

-- Insert test data into the notes table
INSERT INTO notes (user_id, title, content)
VALUES
(1, 'Grocery List', 'Milk, eggs, bread, spinach, apples'),
(1, 'Meeting Agenda', '1. Project updates\n2. Budget review\n3. Task assignments\n4. Q&A session'),
(2, 'Books to Read', '1. The Catcher in the Rye\n2. To Kill a Mockingbird\n3. 1984\n4. Brave New World'),
(3, 'Travel Plans', '1. Book flight tickets\n2. Reserve hotel\n3. Plan daily itinerary\n4. Pack luggage'),
(3, 'Workout Routine', '1. Warm-up (10 min)\n2. Cardio (30 min)\n3. Strength training (20 min)\n4. Cool down (10 min)');
