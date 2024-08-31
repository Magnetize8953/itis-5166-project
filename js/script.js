// Make header the same on all pages
header = document.createElement("header");
header.innerHTML = "<h1>Header</h1>";
// Make the navigation bar the same on all pages
navigation = document.createElement("nav");
navigation.innerHTML = "<a href='index.html'>Home</a> <a href='events.html'>Events</a> <a href='about.html'>About</a>";
// Make the content area the same on all pages
content = document.createElement("div");
content.innerHTML = "<h1>Content</h1>";
// Make the footer the same on all pages
footer = document.createElement("footer");
footer.innerHTML = "<p>Footer</p>";

// Append the header, navigation, content, and footer to the body
document.body.appendChild(header);
document.body.appendChild(navigation);
document.body.appendChild(content);
document.body.appendChild(footer);


