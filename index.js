const inquirer = require("inquirer")
const mysql = require("mysql2")
require("dotenv").config()

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
  },
  console.log(`Connected to the employeetracker database.`)
)

  db.connect((error) => {
     if (error) throw error;
    console.log('Connected to the human_resources_db database.');
    menu();
  });

// create body of table
const config = {
  border: {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,

    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight: `┘`,

    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,

    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`
  }
};

async function showTable(data) {
  let tableData = [];
  tableData = [
    Object.keys(data[0]),
    ...data.map(val => Object.values(val))];
  console.log(tableData);
  const answers = await inquirer.prompt([
    {
      message: "\n" + table(tableData, config),
      type: 'input',
      name: 'name'
    }
  ]);
}

//   Function that takes in data and turns it into an array of objects
const menu = async function () {
  const choices = await inquirer.prompt([
    {
      message: "What do you want to do?",
      type: "list",
      name: "options",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Update employee managers",
        "Delete departments, roles, and employees",
        "View the total utilized budget of a department",
      ]

    }
  ])
  if (choices.options === "View all departments") {
    viewDepartments();
  
  } else if (choices.options === "View all roles") {
  
  }

}
function viewDepartments (){
  db.query("select * from department",(error,data)=>{
    if (error) throw error
    console.table(data)
    menu()
  })
}