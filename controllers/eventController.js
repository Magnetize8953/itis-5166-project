// require modules
const model = require('../models/event')


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
    req.body.startDateTime = new Date(`${req.body.when}T${req.body.start}`)
    req.body.endDateTime = new Date(`${req.body.when}T${req.body.end}`)
    req.body.image = '/images/' + req.file.filename
    delete req.body.when
    delete req.body.start
    delete req.body.end

    let event = new model(req.body)

    event.save()
        .then((event) => {
            res.redirect('/events')
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400
            }
            next(err)
        })
}

// GET /events/:id: send details about event id
exports.show = (req, res, next) => {
    let id = req.params.id

    // id needs to be a 24-bit hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id')
        err.status = 400
        return next(err)
    }

    model.findById(id)
        .then(event => {
            if (event) {
                res.render('./event/eventDetail', { event })
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

    // id needs to be a 24-bit hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id')
        err.status = 400
        return next(err)
    }

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

    // id needs to be a 24-bit hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id')
        err.status = 400
        return next(err)
    }

    model.findByIdAndUpdate(id, event, { useFindAndModify: false, runValidators: true })
        .then(event => {
            if (event) {
                res.redirect(`/events/${id}`)
            } else {
                let err = new Error(`Cannot find a event with id ${id}`)
                err.status = 404
                next(err)
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                err.status = 400
            }
            next(err)
        })
}

// DELETE /events/:id: delete event id
exports.delete = (req, res, next) => {
    let id = req.params.id

    // id needs to be a 24-bit hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id')
        err.status = 400
        return next(err)
    }

    model.findByIdAndDelete(id, { useFindAndModify: true })
        .then(event => {
            if (event) {
                res.redirect('/events')
            } else {
                let err = new Error(`Cannot find event with id ${id}`)
                err.status = 404
                next(err)
            }
        })
        .catch(err => next(err))
}
