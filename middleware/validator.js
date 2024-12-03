// require modules
const { body, validationResult } = require('express-validator')

// validate event id
exports.validateId = (req, res, next) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return next()
    } else {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
}

// validate sign up information
exports.validateSignUps = [
    body('firstname', 'First name must be provided').notEmpty().trim().escape(),
    body('lastname', 'Last name must be provided').notEmpty().trim().escape(),
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be between 8 and 64 characters').isLength({ min: 8, max: 64 })
]

// validate login information
exports.validateLogIns = [
    body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
    body('password', 'Password must be between 8 and 64 characters').isLength({ min: 8, max: 64 })
]

// validate event details
exports.validateEvent = [
    body('title', 'Title must be non-empty').notEmpty().trim().escape(),
    body('category', 'category must be a valid option: professional, social').notEmpty().trim().toLowerCase().isIn(['professional', 'social']).escape(),
    body('when', 'Date must be non-empty').notEmpty().trim().isDate().escape(),
    body('start', 'Start time must be non-empty').notEmpty().trim().isTime().escape(),
    body('end', 'End must be non-empty').notEmpty().trim().isTime().custom((value, { req }) => {
        let startTime = new Date(`${req.body.when}T${req.body.start}`)
        let endTime = new Date(`${req.body.when}T${value}`)
        if (endTime >= startTime) {
            return true
        } else {
            throw new Error('End time cannot be before start time')
        }
    }).escape(),
    body('location', 'Location must be non-empty').notEmpty().trim().escape(),
    body('description', 'Description must be non-empty').notEmpty().trim().escape()
]

// validate result returned by validations above
exports.validateResult = (req, res, next) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg)
        })
        return res.redirect('back')
    } else {
        return next()
    }
}
