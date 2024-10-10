// require modules
const model = require('../models/event')


// GET /events: send all events
exports.index = ('/events', (req, res) => {
    let events = model.find()
    res.render('./event/index', { events })
})

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

// POST /events: create new event
exports.create = ('/events/new', (req, res) => {
    res.render('')
})
