const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    passportFacebook = require('passport-facebook');
var config = require('./config')
const app = express();

app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done){
    return done(null, profile)
}))

app.get('/auth/facebook',passport.authenticate('auth0'))

app.get('/auth/facebook/callback',
 passport.authenticate('auth0',{successRedirect: '/'}), function(req, res) {
    res.status(200).send(req.user);
})

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res) {
  if (!req.user) return res.sendStatus(404);
  res.status(200).send(req.user);
})

