// require modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// set up events schema
const eventSchema = new Schema({
  title: { type: String, required: [true, 'title is required'] },
  category: { type: String, required: [true, 'category is required'] },
  organizer: { type: String, required: [true, 'organizer is required'] },
  startDateTime: { type: String, required: [true, 'startDateTime is required'] },
  endDateTime: { type: String, required: [true, 'endDateTime is required'] },
  location: { type: String, required: [true, 'location is required'] },
  description: { type: String, required: [true, 'description is required'] },
  image: { type: String, required: [true, 'image is required'] },
})

// export schema
module.exports = mongoose.model('events', eventSchema)
