// require modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// set up rsvp schema
const eventSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: [true, 'user is required'] },
  event: { type: Schema.Types.ObjectId, required: [true, 'event is required'] },
  status: { type: String, required: [true, 'rsvp status is required'], enum: ['YES', 'NO', 'MAYBE'] },
})

// export schema
module.exports = mongoose.model('rsvps', eventSchema)
