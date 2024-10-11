const { DateTime } = require('luxon')
const { v4: uuidv4 } = require('uuid')

const events = [
  {
    id: '1',
    organizer: 'UNC Charlotte Career Center',
    title: 'Career Fair',
    category: 'professional',
    date: DateTime.fromObject({ year: 2024, month: 9, day: 13, hour: 11, minute: 0 }).toLocaleString(DateTime.DATETIME_MED),
    location: 'Barnhardt Student Activity Center, Salons',
    description: 'Meet employers, learn about companies, build your network!',
    img_src: '/images/Aerial_Clocktower_Atkins.jpg'
  },
  {
    id: '2',
    organizer: 'UNC Charlotte Career Center',
    title: 'Resume Review',
    category: 'professional',
    date: DateTime.fromObject({ year: 2024, month: 9, day: 4, hour: 14, minute: 30 }).toLocaleString(DateTime.DATETIME_MED),
    location: 'Atkins Library Annex',
    description: 'Get your resume reviewed by professionals!',
    img_src: '/images/Aerial_Atkins_Friday.jpg'
  },
  {
    id: '3',
    organizer: 'ColorStack at UNC Charlotte',
    title: 'Game Night',
    category: 'social',
    date: DateTime.fromObject({ year: 2024, month: 9, day: 30, hour: 19, minute: 0 }).toLocaleString(DateTime.DATETIME_MED),
    location: 'Woodward Hall, Room 154',
    description: 'Relax for a night and play some games with fellow ColorStackers!',
    img_src: '/images/Woodward_from_Hauser_Alumni_Pavilion.jpg'
  },
  {
    id: '4',
    organizer: 'ColorStack at UNC Charlotte',
    title: 'Social Meetup',
    category: 'social',
    date: DateTime.fromObject({ year: 2024, month: 9, day: 16, hour: 16, minute: 30 }).toLocaleString(DateTime.DATETIME_MED),
    location: 'Star Quad',
    description: 'Meet other members of ColorStack and socialize!',
    img_src: '/images/Aerial_CHHS_Atkins_Clocktower.jpg'
  },
  {
    id: '5',
    organizer: 'ColorStack at UNC Charlotte',
    title: 'Interests Exploration',
    category: 'social',
    date: DateTime.fromObject({ year: 2024, month: 9, day: 23, hour: 16, minute: 30 }).toLocaleString(DateTime.DATETIME_MED),
    location: 'Woodward Hall, Room 106',
    description: 'Share your interests with your colleagues, learn about theirs. Maybe you\'ll find something new to try out!',
    img_src: '/images/Aerial_Woodward_Campus.jpg'
  },
  {
    id: '6',
    organizer: 'ColorStack at UNC Charlotte',
    title: 'Lunch and Learn',
    category: 'professional',
    date: DateTime.fromObject({ year: 2024, month: 9, day: 25, hour: 13, minute: 0 }).toLocaleString(DateTime.DATETIME_MED),
    location: 'Cone University Center, Lucas Room',
    description: 'Enjoy a free lunch while listening to presentations by fellow students and prospective employers!',
    img_src: '/images/Aerial_Atkins_Clocktower.jpg'
  }
]

exports.find = () => { return events }

exports.findById = (id) => { return events.find(event => event.id == id) }

exports.save = (event) => {
  event.id = uuidv4()
  event.category = event.category.charAt(0).toLowerCase() + event.category.slice(1)
  event.date = DateTime.fromObject({
    year: parseInt(event.when.slice(0, 4)), month: parseInt(event.when.slice(5, 7)), day: parseInt(event.when.slice(8)),
    hour: parseInt(event.start.slice(0, 3)), minute: parseInt(event.start.slice(4))
  }).toLocaleString(DateTime.DATETIME_MED)
  events.push(event)
}

exports.update = (id, newEvent) => {
  let event = events.find(event => event.id == id)
  if (event) {
    event.organizer = newEvent.organizer
    event.title = newEvent.title
    event.category = newEvent.category.charAt(0).toLowerCase() + newEvent.category.slice(1)
    event.date = DateTime.fromObject({
      year: parseInt(newEvent.when.slice(0, 4)), month: parseInt(newEvent.when.slice(5, 7)), day: parseInt(newEvent.when.slice(8)),
      hour: parseInt(newEvent.start.slice(0, 3)), minute: parseInt(newEvent.start.slice(4))
    }).toLocaleString(DateTime.DATETIME_MED)
    event.location = newEvent.location
    event.description = newEvent.description
    event.img_src = newEvent.img_src
    return true
  }
  return false
}

exports.delete = (id) => {
  let index = events.findIndex((event) => { return event.id == id })
  if (index !== -1) {
    events.splice(index, 1)
    return true
  }
  return false
}
