const express = require('express');
const app = express();

// This will just print out the "SOMEONE REQUESTED US!" in our terminal window every time somebody goes to the site, or refreshes the browser, but the client will still not get anything sent to him or her.
// This code will not get executed when we are requesting the "/logout" route.  This code only responds to the "/" route, the home route basically.
// In this course we will be working with the GET and POST HTTP requests.
// A GET request is basically asking to see information and you are not sending any data with it.  When we are asking for our homepage of join_us, we are asking to see information, it's a GET request.
// When we are trying to join, we are sending an email and that is going to be a POST request.
// app.get("/", (req, res) => {
//     console.log("SOMEONE REQUESTED US!");
// });

// Besides the console.log() method, we can also put the res.send() method in here and put any "" inside of it.  Now when a user goes to the "/" route, the user will be greeted by the message inside of the res.send() method.  Now we finally have our most basic web app!  There can only be one res.send() method inside of a route.  Every route can only respond with one thing.  The real response is that you will normally not be using the res.send() method to respond and will normally be responding with files.  You will normally have a file of HTML to respond with a nice formatted page with style, fonts, and colors.  For now, this is a very basic web app.
// This is the root route, the home route, the empty route.  You can even get here by just typing the address without a "/".
app.get("/", (req, res) => {
    // This console.log() method will contain all of the information about the incoming client request.  All of this is put together by Express, it's handled for us.  You usually only get one or two things that you care about in these client requests.  This is all behind the scenes stuff.
    // When we make our request, sending our email, when we type it into a form and hit submit, that email will be contained in a client request, somewhere.  We will need to pull this email out, which we will get to at some point.
    console.log(req);
    res.send("You've Reached The Home Page!");
});

// app.listen(8080);

// Here we included a callback f() so that we could see a message in the console telling us that the server is running.  If we don't do this, we will just see a cursor in the console.
// With this we have our server running and we can reach it, but we won't get a response until we set up at least one route.  We will set up at least one route above.
// This starts up our server.
app.listen(8080, () => {
    console.log("Server running on 8080!");
});