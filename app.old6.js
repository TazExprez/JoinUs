const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// We had to install body-parser.  What happens is that Express is a lightweight framework that doesn't come with everything that you could possibly want preinstalled, so we have to go and select certain things. body-parser parses the body of a client request.  When a client request is sent, it is just a giant block of text, and somewhere in there, will be something like email is equal to whatever we typed in the form.  This is going to be in a giant block of text, that is not JS or anything.  body-parser will intercept that and turn it into JS that we can then use and manipulate.

app.set("view engine", "ejs");
// Here we are telling our app to use bodyParser.  We put it here so that we have our configuration lines together.  We have to tell the app, which is coming from Express, that we are using bodyParser.  This will allow us to extract information that is coming from POST requests.
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
    // console.log("POST REQUEST SENT TO /REGISTER");
    // The req.body.email is what will give us the email from the body of the client request.  This comes from bodyParser.
    // console.log("POST REQUEST SENT TO /REGISTER email is " + req.body.email);
    // This will show us what our request body looks like.  In this case it's {email: 'h@gmail.com'}.  If we stop using bodyParser, there is no req.body and the result of this will be undefined.
    // Just the single line where we say to use bodyParser is what allows us to access req.body.  If we don't use it, the information is still being sent to Express, but Express is just not doing anything with it.  req.body, along with the line to use bodyParser, are all we need in order to use bodyParser.
    // This is kind of confusing, but that is the whole ethos of Express, that you add the tools you use as you need them.  So rather than giving you everything at once, and you might only use one of 20 things, it just gives you one or two things and then you go and grab the other things that you need.  If you need a req.body to be filled with data, then you need bodyParser.
    // console.log(req.body);
    
});

app.listen(8080, () => {
    console.log("Server running on 8080!");
});