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
  event.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
  events.push(event)
}

exports.update = (id, newEvent) => {
  let event = events.find(event => event.id === id)
  if (event) {
    event.title = newEvent.title
    event.content = newEvent.content
    return true
  }
  return false
}

exports.delete = (id) => {
  let event = events.find(event => event.id === id)
  if (event) {
    events.splice(events.indexOf(event), 1)
    return true
  }
  return false
}
