const express =  require('express');
const { con } = require('./db/database.js');
require('dotenv').config();

const app = express();
PORT = process.env.PORT || 5000

app.get("/", (req, res) => {    
    const q = 'SELECT * FROM patient';
    con.query(q, (err, results) => {
        if(error)
        {
            return res.json(err)
        }
        else
        {
            return res.json(results);
        }
    });
})

app.listen(PORT, (
    console.log(`App listening on port ${process.env.PORT}`)
));
