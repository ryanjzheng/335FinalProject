const express = require("express");
const session = require('express-session')
const passport = require("passport");
const PORT = process.argv[2] || 3000;
require('dotenv').config();
require("./auth")


function isLoggedIn(req, res, next){
  req.user ? next() : res.sendStatus(401)
}

const app = express()
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res)=>{
  res.send('<a href="/auth/google">Authenticate With Google</a>')
})


app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}))

app.get('/google/callback', passport.authenticate('google', {
  successRedirect: "/protected",
  failureRedirect: '/auth/faulure'
}))


app.get('/protected',isLoggedIn, (req, res)=>{
  res.send(`Hello ${req.user.displayName}`)
})

app.get('/auth/failure', (req, res)=>{
  res.send('failed')
})

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

app.listen(PORT, () => {
  console.log(`Web server started and running at http://localhost:${PORT}`)
  });
