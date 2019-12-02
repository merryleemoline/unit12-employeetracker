DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE database employeeTracker_DB;

USE employeeTracker_DB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL(12,2) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Foby", "Tenderson", 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("James", "Madison", 7, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Chisma", "Budt", 6, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("basket weaver", 55000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("smith", 80000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("influencer", 15, 2);

INSERT INTO departments (name)
VALUES ("narcotics");
INSERT INTO departments (name)
VALUES ("preserves");
INSERT INTO departments (name)
VALUES ("gardening")

