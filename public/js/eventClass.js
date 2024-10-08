// This class is used to create a new event object
class Event {
  constructor(title = null, description = null, date = null, location = null) {
      this.title = title;
      this.description = description;
      this.date = date;
      this.location = location;
  }
}

// This function is used to create a new event object
function createEvent(title, description, date, location, id) {
    return new Event(title, description, date, location, id);
}

// This function is used to change the title of an event object
function changeTitle(event, title) {
    event.title = title;
}

// This function is used to change the description of an event object
function changeDescription(event, description) {
    event.description = description;
}

// This function is used to change the date of an event object
function changeDate(event, date) {
    event.date = date;
}

// This function is used to change the location of an event object
function changeLocation(event, location) {
    event.location = location;
}
