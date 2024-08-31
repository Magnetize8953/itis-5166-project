// Make the header the same on all pages
header = document.createElement("header");
header.innerHTML = `
<div class="header-content">
  <img src="../images/ColorStack_UNC-Charlotte_Logo.png" alt="Logo" id="logo">
  <nav id="user-navigation">
    <a id="login" href="login.html">Login</a>
    <a id="signup" href="signup.html">Signup</a>
  </nav>
</div>`;


// Make the main navigation bar the same on all pages
mainNavigation = document.createElement("nav");
mainNavigation.id = "main-navigation";
mainNavigation.innerHTML = `
<a href="index.html">Home</a>
<a href="events.html">Events</a>
<a href="newEvent.html">Create Event</a>`;
// Add main navigation to the header
header.appendChild(mainNavigation);

// Make the footer the same on all pages
footer = document.createElement("footer");
footer.innerHTML = `
<p>&copy; 2024 ColorStack at UNC Charlotte. All rights reserved.</p>
<a href="about.html">ABOUT</a>
<a href="contact.html">CONTACT</a>`;

// Append the header to the top of the body
document.body.insertBefore(header, document.body.firstChild);

// Append the footer to the bottom of the body
document.body.appendChild(footer);