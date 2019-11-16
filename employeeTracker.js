var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employeeTracker_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});
function start() {
    inquirer
        .prompt({
            name: "userIntention",
            type: "list",
            message: "Which of the following would you like to do?",
            choices: [
                "View Employees",
                "View Roles",
                "View Departments",
                "Add Employee",
                "Add Roles",
                "Add Departments",
                "Update Employee Role",
                "Exit"
            ]
        })
        .then(function (answer) {
            if (answer.userIntention === "View Employees") {
                viewEmployees();
            }
            else if (answer.userIntention === "View Roles") {
                viewRoles();
            }
            else if (answer.userIntention === "View Departments") {
                viewDepartments();
            }
            else if (answer.userIntention === "Add Employee") {
                addEmployee();
            }
            else if (answer.userIntention === "Add Roles") {
                addRole();
            }
            else if (answer.userIntention === "Add Departments") {
                addDepartment();
            }
            else if (answer.userIntention === "Update Employee Role") {
                updateEmployeeRole();
            }
            else {
                connection.end();
            }
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "Enter the first name of the employee you would like to add."
            },
            {
                name: "last_name",
                type: "input",
                message: "Last name: "
            },
            {
                name: "role_id",
                type: "input",
                message: "Role ID: ",
            },
            {
                name: "manager_id",
                type: "input",
                message: "Manager ID: ",
            }

        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your employee was created successfully!");
                    start();
                }
            );
        });
}
function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Enter the title of the role you would like to add."
            },
            {
                name: "salary",
                type: "input",
                message: "Role's salary: "
            },
            {
                name: "department_id",
                type: "input",
                message: "Department ID: ",
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your role was created successfully!")
                    start();
                }
            );
        });
}
function addDepartment() {
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Enter the name of the department you would like to add."
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    name: answer.name,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created successfully!");
                    start();
                }
            );
        });
}


function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}
function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}
function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}
// -------------------------------------------------//
//--------------UPDATE EMPLOYEE ROLE----------------//
// -------------------------------------------------//
function updateEmployeeRole() {
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].last_name + ", " + results[i].first_name);
                        }
                        return choiceArray;
                    },
                    message: "Which employee would you like to update?"
                },
                {
                    name: "role_id",
                    type: "input",
                    message: "To what Role ID would you like to change this employee?"
                }
            ])
            .then(function (answer) {
                var chosenEmployee;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].last_name + ", " + results[i].first_name === answer.choice) {
                        chosenEmployee = results[i];
                    }
                }
                connection.query("UPDATE employees SET ? WHERE ?",
                    [
                        {
                            role_id: answer.role_id
                        },
                        {
                            id: chosenEmployee.id
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log(chosenEmployee.first_name + " " + chosenEmployee.last_name + " --> Role ID: " + answer.role_id)
                        console.log("Employee role changed successfully!");
                        start();
                    });
            });
    })
}