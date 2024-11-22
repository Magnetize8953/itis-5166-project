const model = require('../models/user')
const Event = require('../models/event')


// GET /users/signup: send html form for creating a new user account
exports.new = (req, res) => {
    res.render('./user/signup')
}

// POST /user: create a new user account
exports.create = (req, res, next) => {
    let user = new model(req.body)
    user.save()
        .then(user => res.redirect('/users/login'))
        .catch(err => {
            if (err.name === 'ValidationError') {
                return res.redirect('/users/new')
            }

            if (err.code === 11000) {
                return res.redirect('/users/new')
            }

            next(err)
        })
}

// GET /users/login: send html for logging in
exports.getUserLogin = (req, res, next) => {
    res.render('./user/login')
}

// POST /users/login: authenticate user's login
exports.login = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    model.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log('wrong email address')
                res.redirect('/users/login')
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            res.redirect('/users/profile')
                        } else {
                            console.log('wrong password')
                            res.redirect('/users/login')
                        }
                    })
            }
        })
        .catch(err => next(err))
}

// TODO: GET /users/profile: send user's profile page
exports.profile = (req, res, next) => { }


// TODO: POST /users/logout: logout a user
exports.logout = (req, res, next) => { }
