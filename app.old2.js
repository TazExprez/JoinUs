const express = require('express');
const app = express();

// Only one response will run because a client request can only hit one route.  A request can only be made to "/", "/joke", or some other route.

app.get("/", (req, res) => {
    res.send("You've Reached The Home Page!");
});

app.get("/joke", (req, res) => {
    const joke = "What do you call a dog that does magic tricks?  A labracadabrador."
    // console.log("REQUESTED THE JOKE ROUTE!")
    // If we forget to send something back to the client, the client's browser will keep on waiting to get something back from the server and eventually timeout with an error.  The server will still receive the request, but it will not send something back, unless we tell it to, with something like the res.send() method.
    res.send(joke);
});

app.get("/random_num", (req, res) => {
    const num = Math.floor((Math.random() * 10) + 1);
    // We had to send 7 as "7" just to be safe.  I tried sending the number 7 and received an error.
    // res.send("7");
    res.send("Your lucky number is " + num);
});

app.listen(8080, () => {
    console.log("Server running on 8080!");
});