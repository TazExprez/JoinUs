const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
// This will connect files in the public folder to our Node.js app.  This tells Express to take whatever is inside of the public directory and serve these files so that they are accessible by the files in our views folder.  This will make app.css available to our home.ejs file.
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'join_us'
});

app.get("/", (req, res) => {
    let q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, (err, results) => {
        if(err) throw err;
        let count = results[0].count;
        res.render("home", {count: count, favorite_color: 'purple'});
    });
});

app.get("/joke", (req, res) => {
    const joke = "<strong>What do you call a dog that does magic tricks?</strong>  <em>A labracadabrador</em>."
    res.send(joke);
});

app.get("/random_num", (req, res) => {
    const num = Math.floor((Math.random() * 10) + 1);
    res.send("Your lucky number is " + num);
});

app.post("/register", (req, res) => {
    const person = {
        email: req.body.email
    };
    // We could have used this query, instead of the one used in the connection.query() method below.  The one in the connection.query() method that we ended up using is the more standard way of doing it with the mysql package.
    // const q = "INSERT INTO users (email) VALUES (" + req.body.email + ")";
    // "INSERT INTO users (email) VALUES ('dave@dave.com')";
    // connection.query(q, person, (err, result) => {
    connection.query('INSERT INTO users SET ?', person, (err, result) => {
        if(err) throw err;
        res.redirect("/");
    });
});

app.listen(8080, () => {
    console.log("Server running on 8080!");
});

// You can add the following to this project:
// 1. Redirect to a page that says "Thank You" or "Congratulations"
// 2. Restyle the landing page
// 3. Collect more information, instead of just an email, like a name, a birthday, or a phone number