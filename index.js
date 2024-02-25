const express = require('express');
const session = require('express-session');
const path = require('path')

const app = express()
const credentials = {
    email: 'jithin@gmail.com',
    password: 'qwe@123'
}
const data = require('./data.js')

app.use(express.static(path.join(__dirname, "public")));


app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

app.set('view engine', 'ejs')



app.get('/', (req, res) => {

    if (req.session.log) {
        res.render('home', { data })
    } else {
        res.render('login', { invalid: req.session.invalid })
        req.session.invalid = false
        req.session.save()
    }
})

app.post('/login', (req, res) => {
    if (req.body.email == credentials.email && req.body.password == credentials.password) {
        req.session.log = true
        res.redirect('/')
    } else {
        req.session.invalid = true
        res.redirect('/')

    }
})

app.post('/logout', (req, res) => {
    req.session.log = false
    res.redirect('/')

})
app.listen(3000)