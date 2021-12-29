const express = require('express')
const app = express()
const cors = require('cors')
const cookieSession = require('cookie-session')
const dotenv = require("dotenv");
const bodyParser = require('body-parser')
dotenv.config({ path: "./config/config.env" });
const passport = require('passport');
const path = require("path");
require('../Facebook Auth/passport-setup')
const connectDB = require('./config/db')
const { User } = require('./Models/User')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(cookieSession({
    name: 'facebook-auth-session',
    keys: ['key1', 'key2']
}))

app.use(cors())
app.use(passport.initialize());
app.use(passport.session());

connectDB();

const isLoggedIn = async (req, res, next) => {
    const user = await User.findOne({
        name: req.user.displayName,
        id: req.user.id
    });
    if (user) return res.status(400).send("User Already Registered!!Please Login ")
    else (req.user)
    console.log(req.user);
    const Signup = new User({
        name: req.user.displayName,
        id: req.user.id
    })
    Signup.save()
    next();
}

app.get('/signup', (req, res) => res.sendFile(path.join(__dirname+'/home.html')))

app.get('/', isLoggedIn, (req, res) => {
    res.send(`Hello world ${req.user.displayName}`)
})
app.get('/auth/error', (req, res) => res.send('Unknown Error'))

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/error' }),
    function (req, res) {
        //     const user=await User.findOne({
        //       name:req.user.displayName,
        //       id:req.user.id
        //   });
        //   if(user)return res.status(400).send("User Already Registered!!Please Login ")

        //       else
        res.redirect('/');
    }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})
app.listen(8000, () => {
    console.log('Serve is up and running at the port 8000')
})