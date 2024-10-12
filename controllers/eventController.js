// require modules
const { DateTime } = require('luxon')
const model = require('../models/event')


// GET /events: send all events
exports.index = ('/events', (req, res) => {
    let events = model.find();
    let categories = model.getDistinctCategories();
    res.render('./event/index', { events, categories });
})

// GET /events/create: send html form for creating new event
exports.new = ('/events/new', (req, res) => {
    res.render('./event/newEvent')
})

// POST /events: create new event
exports.create = ('/', (req, res, next) => {
    let event = req.body
    event.image = '/images/' + req.file.filename
    model.save(event)
    res.redirect('/events')
})

// GET /events/:id: send details about event id
exports.show = ('/:id', (req, res, next) => {
    let id = req.params.id
    let event = model.findById(id)
    if (event) {
        res.render('./event/eventDetail', { event })
    } else {
        let err = new Error(`Cannot find event with id ${id}`)
        err.status = 404
        next(err)
    }
})

// GET /events/:id/edit: send html form for editing existing event
exports.edit = ('/:id/edit', (req, res, next) => {
    let id = req.params.id
    let event = model.findById(id)
    if (event) {
        res.render('./event/editEvent', { event })
    } else {
        let err = new Error(`Cannot find event with id ${id}`)
        err.status = 404
        next(err)
    }
})

// PUT /events/:id: update event id
exports.update = ('/:id', (req, res, next) => {
    let event = req.body
    let id = req.params.id
    let img = req.file.filename

    if (model.update(id, event, img)) {
        res.redirect(`/events/${id}`)
    } else {
        let err = new Error(`Cannot find event with id ${id}`)
        err.status = 404
        next(err)
    }
})

// DELETE /events/:id: delete event id
exports.delete = ('/:id', (req, res, next) => {
    let id = req.params.id

    if (model.delete(id)) {
        res.redirect('/events')
    } else {
        let err = new Error(`Cannot find event with id ${id}`)
        err.status = 404
        next(err)
    }
})
