const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./auth/passport');
const hbs = require('hbs');
const fileUpload=require('express-fileupload')
const ifNotLoggedIn = require('./middlewares/checkedLoggedIn');
const isLoggedIn = require('./middlewares/isLoggedIn');

app.use(flash());
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config()
hbs.registerPartials(__dirname + '/views/partials');

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))

app.use(passport.initialize());
app.use(passport.session());




app.get('/', (req, res, next) => {
    if (req.user) return res.redirect('/dashboard');
    return res.redirect('/clientlogin');
})


app.use('/signup', ifNotLoggedIn, require('./routes/signup'));
app.use('/clientlogin',require('./routes/clientlogin'))
app.use('/login', ifNotLoggedIn, require('./routes/clientlogin'));
app.use('/dashboard',require('./routes/dashboard'))

app.use('/admin', isLoggedIn, require('./routes/admin'));
app.use('/shop', isLoggedIn, require('./routes/shop'));
app.use('/contractor',require('./routes/contractor'))

app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    })
