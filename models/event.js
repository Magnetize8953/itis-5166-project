const { DateTime } = require('luxon')
const { v4: uuidv4 } = require('uuid')

const events = [
  {
    id: '1',
    category: 'professional',
    title: 'Career Fair',
    organizer: 'UNC Charlotte Career Center',
    startDateTime: '2024-09-13T11:00',
    endDateTime: '2024-09-13T15:00',
    location: 'Barnhardt Student Activity Center, Salons',
    description: 'Meet employers, learn about companies, build your network!',
    image: '/images/Aerial_Clocktower_Atkins.jpg'
  },
  {
    id: '2',
    category: 'professional',
    title: 'Resume Review',
    organizer: 'UNC Charlotte Career Center',
    startDateTime: '2024-09-04T14:30',
    endDateTime: '2024-09-04T16:30',
    location: 'Atkins Library Annex',
    description: 'Get your resume reviewed by professionals!',
    image: '/images/Aerial_Atkins_Friday.jpg'
  },
  {
    id: '3',
    category: 'social',
    title: 'Game Night',
    organizer: 'ColorStack at UNC Charlotte',
    startDateTime: '2024-09-30T19:00',
    endDateTime: '2024-09-30T22:00',
    location: 'Woodward Hall, Room 154',
    description: 'Relax for a night and play some games with fellow ColorStackers!',
    image: '/images/Woodward_from_Hauser_Alumni_Pavilion.jpg'
  },
  {
    id: '4',
    category: 'social',
    title: 'Social Meetup',
    organizer: 'ColorStack at UNC Charlotte',
    startDateTime: '2024-09-16T16:30',
    endDateTime: '2024-09-16T18:30',
    location: 'Star Quad',
    description: 'Meet other members of ColorStack and socialize!',
    image: '/images/Aerial_CHHS_Atkins_Clocktower.jpg'
  },
  {
    id: '5',
    category: 'social',
    title: 'Interests Exploration',
    organizer: 'ColorStack at UNC Charlotte',
    startDateTime: '2024-09-23T16:30',
    endDateTime: '2024-09-23T18:30',
    location: 'Woodward Hall, Room 106',
    description: 'Share your interests with your colleagues, learn about theirs. Maybe you\'ll find something new to try out!',
    image: '/images/Aerial_Woodward_Campus.jpg'
  },
  {
    id: '6',
    category: 'professional',
    title: 'Lunch and Learn',
    organizer: 'ColorStack at UNC Charlotte',
    startDateTime: '2024-09-25T13:00',
    endDateTime: '2024-09-25T14:30',
    location: 'Cone University Center, Lucas Room',
    description: 'Enjoy a free lunch while listening to presentations by fellow students and prospective employers!',
    image: '/images/Aerial_Atkins_Clocktower.jpg'
  }
]

exports.find = () => { return events }

exports.findById = (id) => { return events.find(event => event.id == id) }

exports.save = (event) => {
  event.id = uuidv4()
  event.category = event.category.charAt(0).toLowerCase() + event.category.slice(1)
  event.startDateTime = `${event.when}T${event.start}`
  event.endDateTime = `${event.when}T${event.end}`
  delete event.when
  delete event.start
  delete event.end
  events.push(event)
}

exports.update = (id, newEvent, img) => {
  let event = events.find(event => event.id == id)
  if (event) {
    event.organizer = newEvent.organizer
    event.title = newEvent.title
    event.category = newEvent.category.charAt(0).toLowerCase() + newEvent.category.slice(1)
    event.startDateTime = `${newEvent.when}T${newEvent.start}`
    event.endDateTime = `${newEvent.when}T${newEvent.end}`
    event.location = newEvent.location
    event.description = newEvent.description
    event.image = '/images/' + img
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

exports.getDistinctCategories = () => {
  return [...new Set(events.map(event => event.category))];
};
