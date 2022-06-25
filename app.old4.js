const express = require('express');
const mysql = require('mysql2');
const app = express();

// It is common to put our app settings and database connections up here.

// This is configuring our Express application.  The app.set() method allows us to set certain settings in our app.  The "view engine" setting is the most common one to change.  There are other templating engines out there like Jade and HAML, and they are similar to EJS.
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
        // res.send("We have " + count + " users in our db");
        // Instead of working with res.send(), we are now working with res.render() in order to render a page from an EJS file.  Here Express is looking for home.ejs and it's looking inside of the views folder by default.  Rather than writing our code in a single line, like with the res.send() method above, we can now write it inside of a separate file.
        // res.render("home");
        // Here we are passing in a JS {} in order to send the count const variable to the home.ejs template.  We would typically pass in something like {count: count}, but Colt passed in {data: count} in order to show us that these are distinct.  He will change it later on.
        // Here we are taking count, whatever value it is, and sending it over to the home.ejs file and giving it the name of data.  We are putting count inside of an {} under the key of data.
        // res.render("home", {data: count});
        // Our home.ejs file will have access to whatever we pass in the JS {}.
        // res.render("home", {data: count, favorite_color: 'purple'});
        // We changed the name of data to count because everything is data, so data is a bad variable name.  Colt originally named it data because something like {count: count} can be confusing at first.  The key is the label for the value that we are passing, and the value is the value that we are passing.
        res.render("home", {count: count, favorite_color: 'purple'});
    });
});

app.get("/joke", (req, res) => {
    // We are adding HTML tags to our joke const variable.  The <strong> tag, the strong tag, makes text bold.  The <em> tag, the emphasis tag, makes text italicized.
    const joke = "<strong>What do you call a dog that does magic tricks?</strong>  <em>A labracadabrador</em>."
    res.send(joke);
    // You can reuse files in different routes.  The name of the file doesn't have to have something to do with the route, although it should if you are following best practices.
    // res.render("home");
});

app.get("/random_num", (req, res) => {
    const num = Math.floor((Math.random() * 10) + 1);
    res.send("Your lucky number is " + num);
});

app.listen(8080, () => {
    console.log("Server running on 8080!");
});

// The line that we will be running in our route to actually render a file will be res.render("some string");.  In our case, this will be res.render('home');.  The process that will happen behind the scenes, that Express doesn't really show you, is that it will automatically look for a directory called views, which is a standardized name.  You can change the name of the views directory if you wanted to, but we are not going to.  Inside that directory, Express is going to look for a file called home.ejs, in our case.  If the view engine was set to something else, it would look for a file with a corresponding file extension.

// Whenever we change the app.js file, we will need to restart the Node.js server.  When we change the EJS file, we don't need to do this, we just need to refresh the page.