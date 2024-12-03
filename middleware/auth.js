const model = require('../models/event')

// check if the user is a guest, i.e. not logged in
exports.isGuest = (req, res, next) => {
    if (!req.session.user) {
        return next()
    } else {
        req.flash('error', 'You are already logged in')
        return res.redirect('/users/profile')
    }
}

// check if the user is auth
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return next()
    } else {
        req.flash('error', 'Please log in')
        return res.redirect('/users/login')
    }
}

// check if user is author
exports.isAuthor = (req, res, next) => {
    let id = req.params.id

    model.findById(id)
        .then(event => {
            if (event) {
                if (event.host == req.session.user._id) {
                    return next()
                } else {
                    let err = new Error('Unauthorized to access resource')
                    err.status = 401
                    return next(err)
                }
            } else {
                let err = new Error('Cannot find a event with id ' + id)
                err.status = 404
                next(err)
            }
        })
        .catch(err => next(err))
}

// check if the user is not author
exports.isNotAuthor = (req, res, next) => {
    let id = req.params.id

    model.findById(id)
        .then(event => {
            if (event) {
                if (event.host == req.session.user._id) {
                    let err = new Error('Unauthorized to access resource')
                    err.status = 401
                    return next(err)
                } else {
                    next()
                }
            } else {
                let err = new Error('Cannot find a event with id ' + id)
                err.status = 404
                next(err)
            }
        })
        .catch(err => next(err))
}
