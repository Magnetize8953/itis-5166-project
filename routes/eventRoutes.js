// require modules
const express = require('express')
const controller = require('../controllers/eventController')

// set up router
const router = express.Router()

// GET /events: send all events
router.get('/', controller.index)

// GET /events/new: send html form for creating new event
router.get('/new', controller.new)

// POST /events: create a new event
router.post('/', controller.create)

// GET /events/:id: send details about event id
router.get('/:id', controller.show)

// GET /events/:id/edit: send html form for editing existing event
router.get('/:id/edit', controller.edit)

// PUT /events/:id: update event id
router.put('/:id', controller.update)

// DELETE /events/:id: delete event id
router.delete('/:id', controller.delete)


// export
module.exports = router
