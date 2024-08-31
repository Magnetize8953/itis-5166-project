include("eventClass.js");
include("eventHashmap.js");

// Sort the events in the hashmap by date
// Imput must be two events
function sort(event1, event2) {
  // Check if the input is an event
  if (event1 instanceof Event && event2 instanceof Event) {
    return event1.date - event2.date;
  } else {
    console.log("Error: Input must be two events");
  }
  // Sort the all events in the hashmap by date
  for (let i = 0; i < Hashmap.length; i++) {
    Hashmap.sort((a, b) => a.date - b.date);
  }
  display(Hashmap);
}

// Sort the events in the hashmap every time the page is loaded
window.onload = function() {
  // Check if the hashmap is empty or has only one event
  if (Hashmap.length == 0 || Hashmap.length == 1) {
    console.log("No events to sort");
  } else {
    // Sort the all events in the hashmap
    sort(Hashmap[0], Hashmap[1]);
}

// Display the elements in the hashmap to the html page
function display(Hashmap) {
  for (let i = 0; i < Hashmap.length; i++) {
    // Get the event from the hashmap
    let event = Hashmap[i];
    // Display the event to the html page
    document.getElementById("events").innerHTML += "<p>" + event.title + "</p>";
  }
}
