// require modules
const express = require('express')
const controller = require('../controllers/eventController')

// set up router
const router = express.Router()

// GET /events: send all events
router.get('/', controller.index)

// GET /events/:id: send details about event id
router.get('/:id', controller.show)


// export
module.exports = router
