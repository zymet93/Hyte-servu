DROP DATABASE IF EXISTS healthdiary;
CREATE DATABASE healthdiary;
USE healthdiary;

-- Create a table for users
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) NOT NULL DEFAULT 'regular'
);

-- Create a table for diary entries
CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Inserting multiple user rows at once
INSERT INTO Users (username, password, email, created_at, user_level) VALUES
  ('johndoe', 'temp-pw-1', 'johndoe@example.com', '2024-01-01 10:00:00', 'regular'),
  ('janedoe', 'temp-pw-2', 'janedoe@example.com', '2024-01-02 10:00:00', 'admin'),
  ('mike_smith', 'temp-pw-3', 'mike@example.com', '2024-01-03 11:00:00', 'moderator');


-- Inserting multiple diary entries
INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
  (1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great day, felt energetic', '2024-01-10 20:00:00'),
  (1, '2024-01-11', 'Tired', 70.2, 6, 'Long day at work, need rest', '2024-01-11 20:00:00'),
  (2, '2024-01-10', 'Stressed', 65.0, 7, 'Busy day, a bit stressed out', '2024-01-10 21:00:00');

-- Create a table for daily activities
CREATE TABLE DailyActivities (
    activity_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_date DATE NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    duration_minutes INT,
    calories_burned DECIMAL(7,2),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create a table for meals
CREATE TABLE Meals (
    meal_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    meal_date DATE NOT NULL,
    meal_type VARCHAR(50) NOT NULL,
    description TEXT,
    calories_consumed DECIMAL(7,2),
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert multiple records of mock data into the DailyActivities table
INSERT INTO DailyActivities (user_id, activity_date, activity_type, duration_minutes, calories_burned, notes) VALUES
  (1, '2024-01-10', 'Running', 30, 300, 'Ran in the park'),
  (1, '2024-01-11', 'Gym', 60, 500, 'Weight lifting and cardio'),
  (2, '2024-01-10', 'Yoga', 45, 200, 'Relaxing session');

-- Insert multiple records of mock data into the Meals table
INSERT INTO Meals (user_id, meal_date, meal_type, description, calories_consumed, notes) VALUES
  (1, '2024-01-10', 'Breakfast', 'Oatmeal with fruits', 300, 'Healthy start to the day'),
  (1, '2024-01-11', 'Lunch', 'Grilled chicken salad', 500, 'Balanced meal'),
  (2, '2024-01-10', 'Dinner', 'Vegetarian stir-fry', 400, 'No meat today');

-- use cases
--Scenario: Find activities that burned more than 400 calories.
SELECT * FROM DailyActivities
WHERE calories_burned > 400;

--- meal consumed by user
SELECT meal_type, COUNT(*) AS count_meals, SUM(calories_consumed) AS total_calories
FROM Meals
WHERE user_id = 1
GROUP BY meal_type;
