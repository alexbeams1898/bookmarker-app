// Listen for form submit
document.getElementById("myForm").addEventListener("submit", saveBookmark);

// Save bookmark entered
function saveBookmark(e) {
  //Get form values
  var siteName = document.getElementById("siteName").value;
  var siteURL = document.getElementById("siteURL").value;

  if (!validateForm(siteName, siteURL)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURL
  };

  // Local storage practe:

  // localStorage.setItem("test", "Hello world");
  // console.log(localStorage.getItem("test"));
  // localStorage.removeItem("test");

  if (localStorage.getItem("bookmarks") === null) {
    // Init array
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    // Add bookmark to array
    bookmarks.push(bookmark);
    // Set back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  document.getElementById("myForm").reset();

  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

function deleteBookmark(url) {
  // Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      // Remove from bookmarks array
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // Refetch bookmarks
  fetchBookmarks();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Get output id
  var bookmarksResults = document.getElementById("bookmarksResults");

  // Build output
  bookmarksResults.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML +=
      "<div class='bookmark'><h3>" +
      name +
      " </h3><a onclick='deleteBookmark(\"" +
      url +
      "\")' href ='#'>Delete</a><a  target='_blank' href = '" +
      url +
      "'>Visit</a><div>";
  }
}

function validateForm(siteName, siteURL) {
  if (!siteName || !siteURL) {
    alert("Please fill in the form");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteURL.match(regex)) {
    alert("Please use a valid URL");
    return false;
  }

  return true;
}
