// require modules
const express = require('express')
const controller = require('../controllers/eventController')
const { fileUpload } = require('../middleware/fileUpload')
const { isLoggedIn, isAuthor } = require('../middleware/auth')

// set up router
const router = express.Router()

// GET /events: send all events
router.get('/', controller.index)

// GET /events/new: send html form for creating new event
router.get('/new', isLoggedIn, controller.new)

// POST /events: create a new event
router.post('/', isLoggedIn, fileUpload, controller.create)

// GET /events/:id: send details about event id
router.get('/:id', controller.show)

// GET /events/:id/edit: send html form for editing existing event
router.get('/:id/edit', isLoggedIn, isAuthor, controller.edit)

// PUT /events/:id: update event id
router.put('/:id', isLoggedIn, isAuthor, fileUpload, controller.update)

// DELETE /events/:id: delete event id
router.delete('/:id', isLoggedIn, isAuthor, controller.delete)


// export
module.exports = router
