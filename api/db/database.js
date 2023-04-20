require('dotenv').config();
const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

con.connect(error => {
    if(error){
        console.log("Not Connected");
    }
    else{
        console.log("Connected!!");
    }
});

module.exports = con;