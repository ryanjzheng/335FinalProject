const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const readline = require('readline');
const session = require('express-session')
const passport = require("passport");

require("./auth")
require('dotenv').config();

const app = express();

//important for setting the user session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize())
  app.use(passport.session())

  const PORT = process.env.PORT || 3000;

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.yntp638.mongodb.net/?retryWrites=true&w=majority`,
    { 
        dbName: `${process.env.MONGO_DB_NAME}`
     }
  );

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if there's an error
});



function isLoggedIn(req, res, next){
    req.user ? next() : res.redirect('/auth/google')
}



app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('api'));




app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}))

app.get('/google/callback', passport.authenticate('google', {
  successRedirect: "/home",
  failureRedirect: '/auth/google'
}))


app.get('/auth/failure', (req, res)=>{
  res.send('failed')
})

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); 
  });
});




//Routes
app.use('/', require('./routes/login'));

//this makes it so user is required to login with google to proceed
app.use(isLoggedIn)

// Route to fetch nearby gyms based on the user's city
app.use('/findGyms',  require('./routes/findGyms'));

app.use('/home', require('./routes/home'));
app.use('/apply', require('./routes/apply'));
app.use('/processApplication', require('./routes/processApplication'));
app.use('/reviewApplication', require('./routes/reviewApplication'));

app.listen(PORT, () => {
console.log(`Web server started and running at http://localhost:${PORT}`);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // rl.setPrompt('Stop to shutdown the server: ');

    // rl.prompt();

    // rl.on('line', (line) => {
    // if (line.trim() === 'stop') {
    //     console.log('Shutting down the server');
    //     process.exit(0);
    // } else {
    //     console.log('Invalid command: ' + line.trim());
    // }

    // rl.prompt();
    // }).on('close', () => {
    //     console.log('Server has been stopped.');
    //     process.exit(0);
    // });
});