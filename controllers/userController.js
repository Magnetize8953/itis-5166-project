// require modules
const model = require('../models/user')
const Event = require('../models/event')
const RSVP = require('../models/rsvp')


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
                req.flash('error', err.message)
                return res.redirect('/users/signup')
            }

            if (err.code === 11000) {
                req.flash('error', 'Email address has already been used')
                return res.redirect('/users/signup')
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
                req.flash('error', 'Invalid email address')
                res.redirect('/users/login')
            } else {
                user.comparePassword(password)
                    .then(result => {
                        if (result) {
                            req.flash('success', 'Successfully logged in')
                            req.session.user = user
                            res.redirect('/users/profile')
                        } else {
                            req.flash('error', 'Incorrect password')
                            res.redirect('/users/login')
                        }
                    })
            }
        })
        .catch(err => next(err))
}

// GET /users/profile: send user's profile page
exports.profile = (req, res, next) => {
    let id = req.session.user
    Promise.all([model.findById(id), Event.find({ host: id }), RSVP.find({ user: id })])
        .then(result => {
            const [user, events, rsvps] = result
            const categories = [...new Set(events.map(event => event.category))]
            Event.find({ _id: { $in: rsvps.map(rsvp => rsvp.event) } })
                .then(rsvpEvents => {
                    if (rsvpEvents) {
                        res.render('./user/profile', { user, events, categories, rsvps, rsvpEvents })
                    } else {
                        let err = new Error('Unable to get RSVP revents')
                        err.status = 400
                        next(err)
                    }
                })
                .catch(err => next(err))
        })
        .catch(err => next(err))
}

// POST /users/logout: logout a user
exports.logout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err)
        } else {
            res.redirect('/')
        }
    })
}
