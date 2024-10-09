const { DateTime } = require('luxon');
const { v4: uuidv4} = require('uuid');

const events = [
  {
    id: '1',
    organizer: 'UNC Charlotte',
    title: 'Career Fair',
    date: DateTime.fromObject({year: 2024, month: 9, day: 13}),
    location: 'Barnhardt Student Activity Center, Salons',
    description: 'Meet employers, learn about companies, build your network!',
    img_src: '../../images/Aerial_Clocktower_Atkins.jpg'
  },
  {
    id: '2',
    organizer: 'Atkins Library',
    title: 'Resume Review',
    date: DateTime.fromObject({year: 2024, month: 9, day: 4}),
    location: 'Atkins Library Annex',
    description: 'Get your resume reviewed by professionals!',
    img_src: '../../images/Aerial_Atkins_Friday.jpg'
  },
  {
    id: '3',
    organizer: 'ColorStack at UNC Charlotte',
    title: 'Game Night',
    date: DateTime.fromObject({year: 2024, month: 9, day: 30}),
    location: 'Woodward Hall, Room 154',
    description: 'Relax for a night and play some games with fellow ColorStackers!',
    img_src: '../../images/Woodward_from_Hauser_Alumni_Pavilion.jpg'
  },
  {
    id: '4',
    organizer: 'ColorStack at UNC Charlotte',
    title: 'Social Meetup',
    date: DateTime.fromObject({year: 2024, month: 9, day: 16}),
    location: 'Star Quad',
    description: 'Meet other members of ColorStack and socialize!',
    img_src: '../../images/Aerial_CHHS_Atkins_Clocktower.jpg'
  },
  {
    id: '5',
    organizer: 'ColorStack at UNC Charlotte',
    title: 'Interests Exploration',
    date: DateTime.fromObject({year: 2024, month: 9, day: 23}),
    location: 'Woodward Hall, Room 106',
    description: 'Share your interests with your colleagues, learn about theirs. Maybe you\'ll find something new to try out!',
    img_src: '../../images/Aerial_Woodward_Campus.jpg'
  },
  {
    id: '6',
    organizer: 'ColorStack at UNC Charlotte',
    title: 'Lunch and Learn',
    date: DateTime.fromObject({year: 2024, month: 9, day: 25}),
    location: 'Cone University Center, Lucas Room',
    description: 'Enjoy a free lunch while listening to presentations by fellow students and prospective employers!',
    img_src: '../../images/Aerial_Atkins_Clocktower.jpg'
  } 
];

exports.find = () => events;

exports.findById = (id) => events.find(event => event.id === id);

exports.save = function(event){
  event.id = uuidv4();
  event.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
  events.push(event);
};

exports.update = function(id, newEvent){
  let event = events.find(event => event.id === id);
  if(event){
    event.title = newEvent.title;
    event.content = newEvent.content;
    return true;
  }
  return false;
};  

exports.delete = function(id){
  let event = events.find(event => event.id === id);
  if(event){
    events.splice(events.indexOf(event), 1);
    return true;
  }
  return false;
};
