// require modules
const { DateTime } = require('luxon')
const model = require('../models/event')


// GET /events: send all events
exports.index = (req, res) => {
    let events = model.find();
    let categories = model.getDistinctCategories();
    res.render('./event/index', { events, categories });
}

// GET /event/:id: send details about event id
exports.show = ('/events/:id', (req, res) => {
    let id = req.params.id
    let event = model.findById(id)
    if (event) {
        res.render('./event/eventDetail', { event })
    } else {
        res.status(404).send(`${id} not found`)
    }
})

// GET /events/create: send html form for creating new event
exports.new = ('/events/new', (req, res) => {
    res.render('./event/newEvent')
})

// POST /events: create new event
exports.create = ('/', (req, res) => {
    let event = req.body
    model.save(event)
    res.redirect('/events')
})

// GET /events/:id: send details about event id
exports.show = ('/:id', (req, res) => {
    let id = req.params.id
    let event = model.findById(id)
    if (event) {
        res.render('./event/eventDetail', { event })
    } else {
        res.status(404).send(`${id} not found`)
    }
})

// GET /events/:id/edit: send html form for editing existing event
exports.edit = ('/:id/edit', (req, res) => {
    let id = req.params.id
    let event = model.findById(id)
    if (event) {
        res.render('./event/editEvent', { event })
    } else {
        res.status(404).send(`${id} not found`)
    }
})

// PUT /events/:id: update event id
exports.update = ('/:id', (req, res) => {
    let event = req.body
    let id = req.params.id

    if (model.update(id, event)) {
        res.redirect(`/events/${id}`)
    } else {
        res.status(404).send(`${id} not found`)
    }
})

// DELETE /events/:id: delete event id
exports.delete = ('/:id', (req, res) => {
    let id = req.params.id

    if (model.delete(id)) {
        res.redirect('/events')
    } else {
        res.status(404).send(`${id} not found`)
    }
})