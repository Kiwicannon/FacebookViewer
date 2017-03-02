const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    passportFacebook = require('passport-facebook');

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

