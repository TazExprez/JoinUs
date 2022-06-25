const express = require('express');
const mysql = require('mysql2');
const app = express();

app.set("view engine", "ejs");

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

// We have to set up a POST route to handle an HTTP POST request.  We will use it to get input from the user.  An HTTP POST request allows the user to send data with the request.  The form will automatically take the data that the user enters and send it to the destination that we tell it to send it to.
// This is how our form data make it to our server.
// The route on this app.post() method needs to match the action on the form.  In our case, this will be app.post("/register") because our form uses action="/register".  This will only be triggered when a POST request is sent to the /register route.
// When you submit the form, without having created a register page, the POST request will still be made, but you will never reach the register page and the browser will remain on the form's page, while trying to load the register page.
// When you enter a URL manually, or click on a link, you are doing a GET request.  When you try to go directly to the register page, without it having been created, you will get the error "Cannot GET /register".
// The only way we're going to be able to trigger this route is through the form.
// We currently don't have a way to see the data that is being sent by the form, but it is being sent.  We will work on a way to extract this data next.
app.post("/register", (req, res) => {
    console.log("POST REQUEST SENT TO /REGISTER");
});

app.listen(8080, () => {
    console.log("Server running on 8080!");
});