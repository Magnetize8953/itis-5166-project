// require modules
const rateLimit = require('express-rate-limit')

// rate limit for log ins
exports.logInLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5,
    // message: 'Too many login requests. Please try again later'
    handler: (req, res, next) => {
        let err = new Error('Too many login requests. Please try again later')
        err.status = 429
        return next(err)
    }
})
