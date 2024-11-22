// require models
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

// set up user schema
const userSchema = new Schema({
  firstname: { type: String, required: [true, 'first name is required'] },
  lastname: { type: String, required: [true, 'last name is required'] },
  email: { type: String, required: [true, 'email address is required'], unique: [true, 'this email address has been used'] },
  password: { type: String, required: [true, 'password is required'] },
})

// hash password upon save
userSchema.pre('save', function(next) {
  let user = this
  if (!user.isModified('password'))
    return next()
  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash
      next()
    })
    .catch(err => next(err))
})

// compare password hashes
userSchema.methods.comparePassword = function(inputPassword) {
  return bcrypt.compare(inputPassword, this.password)
}

// export schema
module.exports = mongoose.model('User', userSchema)
