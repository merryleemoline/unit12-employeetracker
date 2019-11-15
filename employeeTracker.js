// connect to the mysql server and sql database
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employeeTracker_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
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
            // based on their answer, either call the bid or the ADD functions
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

// function to handle ADDing new items up for employee
function addEmployee() {
    // prompt for info about the item being put up for employee
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
            // when finished prompting, insert a new item into the db with that info
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
                    // re-prompt the user for if they want to bid or ADD
                    start();
                }
            );
        });
}
function addRole() {
    // prompt for info about the item being put up for employee
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
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your role was created successfully!");
                    // re-prompt the user for if they want to bid or ADD
                    start();
                }
            );
        });
}
function addDepartment() {
    // prompt for info about the item being put up for employee
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Enter the name of the department you would like to add."
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    name: answer.name,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created successfully!");
                    // re-prompt the user for if they want to bid or ADD
                    start();
                }
            );
        });
}


function viewEmployees() {
    // query the database for all items being employeeed
    connection.query("SELECT * FROM employees", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}
function viewRoles() {
    // query the database for all items being employeeed
    connection.query("SELECT * FROM roles", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}
function viewDepartments() {
    // query the database for all items being employeeed
    connection.query("SELECT * FROM departments", function (err, results) {
        if (err) throw err;
        console.table(results);
        start();
    })
}
// -------------------------------------------------

// -------------------------------------------------
function updateEmployeeRole() {
    // prompt for info about the item being put up for employee
    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "Enter the name of the employee you would like to update."
            }
        ])
        .then(function (answer) {
            // get the information of the chosen item
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].item_name === answer.choice) {
                    chosenItem = results[i];
                }



            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    name: answer.name,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created successfully!");
                    // re-prompt the user for if they want to bid or ADD
                    start();
                }
            );
        });
}















// once you have the items, prompt the user for which they'd like to bid on
inquirer
    .prompt([
        {
            name: "bid",
            type: "input",
            message: "How much would you like to bid?"
        }
    ])
    .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
                chosenItem = results[i];
            }
        }

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
                "UPDATE employees SET ? WHERE ?",
                [
                    {
                        role_id: answer.bid
                    },
                    {
                        id: chosenItem.id
                    }
                ],
                function (error) {
                    if (error) throw err;
                    console.log("Bid placed successfully!");
                    start();
                }
            );
        }
        else {
            // bid wasn't high enough, so apologize and start over
            console.log("Your bid was too low. Try again...");
            start();
        }
    });


