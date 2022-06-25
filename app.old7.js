const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

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
    // Here we are isolating req.body.email, which is the email that is being sent and we are saving it to a variable.
    // const email = req.body.email;
    // This is preparing the data to be inserted into our database.
    const person = {
        email: req.body.email
    };
    // Here we are going to insert this email into our database to make a new user.
    connection.query('INSERT INTO users SET ?', person, (err, result) => {
        if(err) throw err;
        // console.log(result);
        // Right now, when a client submits an email, they are greeted with this message in a register page.  The page will be generated and show this message.  Colt will change this to redirect the client to the home page and show them the updated email count.
        // res.send("Thanks for joining our wait list!");
        // Colt said you would use a res.render() method and not a res.send() method for a thank you page.  This res.render() method will not work because we did not create the page for it in the views folder.
        // res.render("Thanks for joining our wait list!");
        // This is going to take us back to the home page.
        res.redirect("/");
    });
});

app.listen(8080, () => {
    console.log("Server running on 8080!");
});