-- TO PREPOPULATE DATABASE
-- You might also want to include a `seeds.sql` file to 
-- pre-populate your database, making the development of individual features much easier.
INSERT INTO department (department_name) VALUES
("White"),
("Green"),
("Black"),
("Blue");
("Red");

-- Roles Table
INSERT INTO role (title, salary, department_id) VALUES
("Creature", 50000, 1),
("Instant", 60000, 2),
("Enchantment", 70000, 3),
("Artifact", 80000, 4);
("Sorcery", 90000, 5);

-- Employees Table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Thrun", "Breaker of Silence", 1, NULL), 
("Rhyss", "The Redeemed", 2, 1), 
("Sheoldred", "The Apocalypse", 3, NULL), 
("Daxos", "Blessed by the Sun", 4, 1); 
