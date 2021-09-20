const express = require('express');
const mysql = require('mysql2');
var inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Inquirer
  inquirer
  .prompt({
    name: 'request',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
       'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
              ]
              }).then((function (answer) {
                  switch (answer.request) 
                  {
                     case 'View All Departments':
                           viewDepartments();
                           break;
                     case 'View All Roles':
                           viewRoles();
                           break;
                     case 'View All Employees':
                           viewEmployees();
                           break;
                     case 'Add a Department':
                           addDepartment();
                           break;
                     case 'Add a Role':
                           addRole();
                           break;
                     case 'Add an Employee':
                           addEmployee();
                           break;
                      default:
                          break;
                  }
}))


function viewDepartments() {
  db.query(
    'SELECT * FROM department', function(err, results) {
      console.table(results);
    }
  );
};

function viewRoles() {
  db.query(
    'SELECT roles.id,  roles.title AS Title, roles.salary AS Salary, department.name AS Department FROM roles JOIN department ON roles.department= department.id', function(err, results) {
      console.table(results); 
    }
  );
};

function viewEmployees() {
    db.query(
      'SELECT employee.firstName AS firstName, employee.lastName AS lastName, roles.title AS Title, roles.salary AS Salary,employee.managerID as managerID, roles.department AS department FROM employee JOIN roles ON employee.roles= roles.id ', function(err, results) {
        console.table(results); 
      }
    );
};

function addDepartment() {
  inquirer
  .prompt([
      {
          name: 'newDepartment', 
          type: 'input', 
          message: 'What department will you add?'
      }
      ]).then(function (answer) {
          db.query(
              'INSERT INTO department SET ?',
              {
                  name: answer.newDepartment
              });
          console.log('Your department has been added!');
          db.query(
            'SELECT * FROM department', function(err, results) {
              console.table(results);
          })
      })
};

function addRole() {
  inquirer
  .prompt([
      {
          name: 'newtitle', 
          type: 'input', 
          message: 'What title will be added?'
      },
      {
        name: 'newSalary', 
        type: 'input', 
        message: 'What is the salary?'
    },
    {
      name: 'Department', 
      type: 'input', 
      message: 'What department number does it belong to?',
      
  }
      ]).then(function (answer) {
          db.query(
              'INSERT INTO roles SET ?',
              {
                  title: answer.newtitle,
                  salary: answer.newSalary,
                  department: answer.Department
              });
          console.log('Your role has been added!');
          db.query(
            'SELECT roles.id,  roles.title AS Title, roles.salary AS Salary, department.name AS Department FROM roles JOIN department ON roles.department= department.id', function(err, results) {
              console.table(results);
          })
      })
};
  
function addEmployee() {
  inquirer
  .prompt([
      {
          name: 'fName', 
          type: 'input', 
          message: 'What is the first name?'
      },
      {
        name: 'lName', 
        type: 'input', 
        message: 'What is the last name?'
    },
    {
      name: 'roleID', 
      type: 'input', 
      message: 'What the role ID?',  
  },
    {
      name: 'managerID', 
      type: 'input', 
      message: 'What the managerID?',
      
  }
      ]).then(function (answer) {
          db.query(
              'INSERT INTO employee SET ?',
              {
                  firstName: answer.fName,
                  lastName: answer.lName,
                  roles:answer.roleID,
                  managerID: answer.managerID
              });
          console.log('Your role has been added!');
          db.query(
            'SELECT employee.id, employee.firstName AS firstName, employee.lastName AS lastName, roles.title AS Title, roles.salary AS Salary,employee.managerID as managerID, roles.department AS department FROM employee JOIN roles ON employee.roles= roles.id ', function(err, results) {
              console.table(results);
          })
      })
};


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Cucei1989!',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);