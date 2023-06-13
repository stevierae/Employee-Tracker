const inquirer=require("inquirer")
const mysql=require("mysql2")
require ("dotenv").config()

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
  );