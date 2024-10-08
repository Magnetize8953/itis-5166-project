// require models
const express = require('express')
const morgan = require('morgan')


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


// set up routes



// start server
app.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`)
})

