

-- =========================
-- USERS
-- =========================

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- PROJECTS
-- =========================

CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_projects_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =========================
-- TASKS
-- =========================

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('À faire', 'En cours', 'Terminé')
        DEFAULT 'À faire',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_tasks_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);