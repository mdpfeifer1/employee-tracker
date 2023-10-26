const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password-1",
    database: "employee_db"
  },)



function userPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update An Employee Role",
        ],
      },
    ])
    .then((answers) => {
      const { choices } = answers;
      if (choices === "View All Departments") {
        viewAllDepartments();
      }
      if (choices === "View All Roles") {
        viewAllRoles();
      }
      if (choices === "View All Employees") {
        viewAllEmployees();
      }
      if (choices === "Add A Department") {
        addADepartment();
      }
      if (choices === "Add A Role") {
        addARole();
      }
      if (choices === "Add An Employee") {
        addAnEmployee();
      }
      if (choices === "Update An Employee Role") {
        updateAnEmployeeRole();
      }
    });
}

function viewAllDepartments() {
  const query = "SELECT * FROM department";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    userPrompt();
  });
}

function viewAllRoles() {
  const query = "SELECT * FROM role";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.table(results);
    // Call the userPrompt function again to show the menu after displaying results.
    userPrompt();
  });
}

function viewAllEmployees() {
    const query = 'SELECT * FROM employee';
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        // Call the userPrompt function again to show the menu after displaying results.
        userPrompt();
    });
}

function addADepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "Enter the name of the new department:"
        }
    ]).then((answers) => {
        const { departmentName } = answers;
        const query = 'INSERT INTO department (department_name) VALUES (?)';
        db.query(query, [departmentName], (err, results) => {
            if (err) {
                console.error('Error adding department: ' + err.message);
            } else {
                console.log('Department added successfully!');
            }
            // Call the userPrompt function again to show the menu after adding the department.
            userPrompt();
        });
    });
}

function addARole() {
    // First, prompt the user for role details, such as title, salary, and department ID.
    inquirer.prompt([
        {
            type: "input",
            name: "roleTitle",
            message: "Enter the title of the new role:"
        },
        {
            type: "input",
            name: "roleSalary",
            message: "Enter the salary for the new role:"
        },
        {
            type: "input",
            name: "departmentId",
            message: "Enter the department ID for the new role:"
        }
    ]).then((answers) => {
        const { roleTitle, roleSalary, departmentId } = answers;
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(query, [roleTitle, roleSalary, departmentId], (err, results) => {
            if (err) {
                console.error('Error adding role: ' + err.message);
            } else {
                console.log('Role added successfully!');
            }
            // Call the userPrompt function again to show the menu after adding the role.
            userPrompt();
        });
    });
}

function addAnEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter the first name of the new employee:"
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter the last name of the new employee:"
        },
        {
            type: "input",
            name: "roleId",
            message: "Enter the role ID for the new employee:"
        },
        {
            type: "input",
            name: "managerId",
            message: "Enter the manager ID for the new employee (if applicable, otherwise leave it blank):"
        }
    ]).then((answers) => {
        const { first_name, last_name, role_id, manager_id } = answers;
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(query, [first_name, last_name, role_id, manager_id], (err, results) => {
            if (err) {
                console.error('Error adding employee: ' + err.message);
            } else {
                console.log('Employee added successfully!');
            }
            // Call the userPrompt function again to show the menu after adding the employee.
            userPrompt();
        });
    });
}

function updateAnEmployeeRole() {
    // First, prompt the user for employee ID and new role ID.
    inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "Enter the ID of the employee you want to update:"
        },
        {
            type: "input",
            name: "newRoleId",
            message: "Enter the new role ID for the employee:"
        }
    ]).then((answers) => {
        const { employeeId, newRoleId } = answers;
        const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
        db.query(query, [newRoleId, employeeId], (err, results) => {
            if (err) {
                console.error('Error updating employee role: ' + err.message);
            } else if (results.affectedRows === 0) {
                console.log('Employee not found with the provided ID.');
            } else {
                console.log('Employee role updated successfully!');
            }
            // Call the userPrompt function again to show the menu after updating the employee role.
            userPrompt();
        });
    });
}


userPrompt();

