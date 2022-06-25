const express = require('express');
const mysql = require('mysql2');
const app = express();

// This is going to connect our Node.js app to our MySQL database.  We will connect every time we want to query the database to enter, change, or look at any information.
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'join_us'
});

app.get("/", (req, res) => {
    // Find count of users in the DB
    let q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, (err, results) => {
        // If there is an error, it is better to redirect the user, instead of throwing an error.
        if(err) throw err;
        // console.log(results[0].count);
        let count = results[0].count;
        res.send("We have " + count + " users in our db");
    });
    // Then respond with that count
    // res.send("We have " + count + " users in our db");
});

app.get("/joke", (req, res) => {
    const joke = "What do you call a dog that does magic tricks?  A labracadabrador."
    res.send(joke);
});

app.get("/random_num", (req, res) => {
    const num = Math.floor((Math.random() * 10) + 1);
    res.send("Your lucky number is " + num);
});

app.listen(8080, () => {
    console.log("Server running on 8080!");
});