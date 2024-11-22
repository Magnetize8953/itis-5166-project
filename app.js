// require models
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const eventRoutes = require('./routes/eventRoutes')
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose')
require('dotenv').config()


// create app
const app = express()


// configure app
let port = 3000
let host = 'localhost'
let url = process.env.H_MONGODB_URL
app.set('view engine', 'ejs')

// connect to mongo
mongoose.connect(url)
    .then(() => {
        // start server
        app.listen(port, host, () => {
            console.log(`Server is running at ${host}:${port}`)
        })
    })
    .catch(err => console.log(err.message))

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

// middleware for events pages
app.use('/events', eventRoutes)

// middleware for user pages
app.use('/users', userRoutes)

// error handling
app.use((req, res, next) => {
    let err = new Error(`The server cannot locate ${req.url}`)
    err.status = 404

    next(err)
})

app.use((err, req, res, next) => {
    console.log(err.stack)

    if (!err.status) {
        err.status = 500
        err.message = 'Internal server error'
    }

    res.status(err.status)
    res.render('error', { error: err })
})

