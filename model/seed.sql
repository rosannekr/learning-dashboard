INSERT INTO categories (name) VALUES ("Computer Science");
INSERT INTO categories (name) VALUES ("Data Analytics");
INSERT INTO categories (name) VALUES ("React");

INSERT INTO courses (title, url, platform, category_id, status) VALUES ("CS50 Introduction to Computer Science", "https://www.edx.org/course/cs50s-introduction-to-computer-science", "edx", 1, "completed");
INSERT INTO courses (title, url, platform, category_id, status) VALUES ("CS50 Understanding Technology", "https://www.edx.org/course/cs50s-understanding-technology", "edx", 1, "completed");
INSERT INTO courses (title, url, platform, category_id, status) VALUES ("Algorithms Part 1", "https://www.coursera.org/learn/algorithms-part1", "edx", 1, "active");

INSERT INTO courses (title, url, platform, category_id, status) VALUES ("Learn SQL Basics Data Science", "https://www.coursera.org/specializations/learn-sql-basics-data-science", "coursera", 2, "active");

INSERT INTO courses (title, url, platform, category_id, status) VALUES ("Complete Intro to React", "https://frontendmasters.com/courses/complete-react-v5/", "frontend masters", 3, "active");
INSERT INTO courses (title, url, platform, category_id) VALUES ("React The Complete Guide incl Redux", "https://www.udemy.com/course/react-the-complete-guide-incl-redux/", "udemy", 3);
