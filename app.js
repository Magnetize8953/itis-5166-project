// require models
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const eventRoutes = require('./routes/eventRoutes')


// create app
const app = express()


// configure app
let port = 3000
let host = 'localhost'
app.set('view engine', 'ejs')


// mount middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'))
app.use(methodOverride('_method'))


// set up routes
// home page
app.get('/', (req, res) => {
    res.render('index')
})

// about page
app.get('/about', (req, res) => {
    res.render('about')
})

// contact page
app.get('/contact', (req, res) => {
    res.render('contact')
})

// login page
app.get('/login', (req, res) => {
    res.render('login')
})

// signup page
app.get('/register', (req, res) => {
    res.render('signup')
})

// middleware for events pages
app.use('/events', eventRoutes)


// start server
app.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`)
})

