// require modules
const model = require('../models/event')
const User = require('../models/user')
const RSVP = require('../models/rsvp')


// GET /events: send all events
exports.index = (req, res, next) => {
    model.find()
        .then(events => {
            let categories = [...new Set(events.map(event => event.category))]
            res.render('./event/index', { events, categories });
        })
        .catch(err => { next(err) })
}

// GET /events/create: send html form for creating new event
exports.new = (req, res) => {
    res.render('./event/newEvent')
}

// POST /events: create new event
exports.create = (req, res, next) => {

    // fix up req.body
    req.body.category = req.body.category.charAt(0).toLowerCase() + req.body.category.slice(1)
    req.body.host = req.session.user
    req.body.startDateTime = new Date(`${req.body.when}T${req.body.start}`)
    req.body.endDateTime = new Date(`${req.body.when}T${req.body.end}`)
    req.body.image = '/images/' + req.file.filename
    delete req.body.when
    delete req.body.start
    delete req.body.end

    let event = new model(req.body)

    event.save()
        .then((event) => {
            req.flash('success', 'Event successfully created')
            res.redirect('/events')
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', 'Error in validating data')
                err.status = 400
            }
            res.redirect('back')
        })
}

// GET /events/:id: send details about event id
exports.show = (req, res, next) => {
    let id = req.params.id

    model.findById(id)
        .then(event => {
            if (event) {
                User.findById(event.host)
                    .then(user => {
                        if (user) {
                            res.render('./event/eventDetail', { event, user })
                        } else {
                            let err = new Error(`Cannot find host of event with id ${id}`)
                            err.status = 404
                            next(err)
                        }
                    })
                    .catch(err => next(err))
            } else {
                let err = new Error(`Cannot find a event with id ${id}`)
                err.status = 404
                next(err)
            }
        })
        .catch(err => next(err))
}

// GET /events/:id/edit: send html form for editing existing event
exports.edit = (req, res, next) => {
    let id = req.params.id

    model.findById(id)
        .then(event => {
            if (event) {
                res.render('./event/editEvent', { event })
            } else {
                let err = new Error(`Cannot find a event with id ${id}`)
                err.status = 404
                next(err)
            }
        })
        .catch(err => next(err))
}

// PUT /events/:id: update event id
exports.update = (req, res, next) => {
    let event = req.body
    let id = req.params.id
    let img
    // check that a new image was uploaded
    if (req.file) {
        img = req.file.filename
    }

    // fix up event
    event.category = event.category.charAt(0).toLowerCase() + event.category.slice(1)
    event.startDateTime = new Date(`${event.when}T${event.start}`)
    event.endDateTime = new Date(`${event.when}T${event.end}`)
    if (img) {
        event.image = '/images/' + img
    } else {
        // if no image was uploaded, delete the image field
        delete event.image
    }
    delete event.when
    delete event.start
    delete event.end

    model.findByIdAndUpdate(id, event, { useFindAndModify: false, runValidators: true })
        .then(event => {
            if (event) {
                req.flash('success', 'Event successfully edited')
                res.redirect(`/events/${id}`)
            } else {
                let err = new Error(`Cannot find a event with id ${id}`)
                err.status = 404
                next(err)
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                req.flash('error', 'Error in validating data')
                err.status = 400
            }
            res.redirect('back')
        })
}

// DELETE /events/:id: delete event id
exports.delete = (req, res, next) => {
    let id = req.params.id

    model.findByIdAndDelete(id, { useFindAndModify: true })
        .then(event => {
            if (event) {
                req.flash('success', 'Event successfully deleted')
                res.redirect('/events')
            } else {
                let err = new Error(`Cannot find event with id ${id}`)
                err.status = 404
                next(err)
            }
        })
        .catch(err => next(err))
}

// POST /events/:id/rsvp: add rsvp information
exports.rsvp = (req, res, next) => {
    let id = req.params.id
    let userId = req.session.user
    let response = req.body.choice

    RSVP.find({ user: userId, event: id })
        .then(r => {
            if (r.length > 0) {
                RSVP.updateOne({ user: userId, event: id }, { status: response })
                    .then(rs => {
                        if (rs) {
                            req.flash('success', 'Succesfully updated RSVP\'d')
                            res.redirect('back')
                        } else {
                            let err = new Error('Failed to update RSVP')
                            err.status = 400
                            next(err)
                        }
                    })
                    .catch(err => next(err))
            } else {
                let newRSVP = new RSVP({
                    user: userId,
                    event: id,
                    status: response
                })

                newRSVP.save()
                    .then(r => {
                        if (r) {
                            req.flash('success', 'Succesfully RSVP\'d')
                            res.redirect('back')
                        } else {
                            let err = new Error('Failed to create RSVP')
                            err.status = 400
                            next(err)
                        }
                    })
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
}
