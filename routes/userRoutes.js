// require modules
const express = require('express')
const controller = require('../controllers/userController')
const { isGuest, isLoggedIn } = require('../middleware/auth')

// set up router
const router = express.Router()

// GET /users/signup: send html form for creating a new user account
router.get('/signup', isGuest, controller.new)

// POST /user: create a new user account
router.post('/', isGuest, controller.create)

// GET /users/login: send html for logging in
router.get('/login', isGuest, controller.getUserLogin)

// POST /users/login: authenticate user's login
router.post('/login', isGuest, controller.login)

// GET /users/profile: send user's profile page
router.get('/profile', isLoggedIn, controller.profile)

// POST /users/logout: logout a user
router.get('/logout', isLoggedIn, controller.logout)


// export
module.exports = router
