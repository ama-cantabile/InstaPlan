// Get the sport id of the selected sport from the local storage
let sportId = localStorage.getItem("sportId");

// Populate the title and image from the sportList collection to the slected sport gameDetail.html page
db.collection("sportList").where("id", "==", sportId)
  .get()
  .then(querySport => {
    size = querySport.size;
    sports = querySport.docs;

    if (size = 1) {
      var thisSport = sports[0].data();
      var gameTitle = thisSport.title;
      var gameImage = thisSport.image;
      console.log(gameImage);
      document.getElementById("gameTitle").innerHTML = "<b>" + gameTitle + "</b>";
      document.getElementById("gameImage").src = "./images/" + gameImage + ".jpg";

    } else {
      console.log("Query has more than one data")
    }
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

//----------------------------------------------------------------------------------------------
// This function is called when the gameDetails.html page loads.  It reads the slected sport 
// collection and saves the documents as an array of sport objects. It then calls the 
// AddAllGameDetailsToTableBody() function by passing the array as the parameter.
//-----------------------------------------------------------------------------------------------
function readGameDetailsData() {
  db.collection(sportId).get()
    .then(allSport => {
      var gameDetails = [];
      allSport.forEach(doc => {
        gameDetails.push(doc.data());
      })
      AddAllGameDetailsToTableBody(gameDetails);
      console.log(gameDetails);
    })
}

// Define game detail table body container
var gameDetailTableBody = document.getElementById("gameTableBody");

//----------------------------------------------------------------------------------------------
// This function is called by the AddAllGameDetailsToTableBody() function. It creates the table
// body element of the sports event table and populate each table column with the input parameters 
// of the sport date, start time, end time, location, and a "Add Reminder" button with added 
// Google calendar event url.
//-----------------------------------------------------------------------------------------------
function addGameDetailsToTableBody(date, start, end, location, event, calendar) {
  var row = document.createElement("tr");
  var col1 = document.createElement("td");
  var col2 = document.createElement("td");
  var col3 = document.createElement("td");
  var col4 = document.createElement("td");
  var col5 = document.createElement("td");
  var col6 = document.createElement("td");

  col1.innerHTML = date;
  
  // Display number-type time  data in 24-hour format
  if (start% 1 != 0) {
    col2.innerHTML = start - 0.5 + ":30";
  } else {
    col2.innerHTML = start + ":00";
  }
  if (end % 1 != 0) {
    col3.innerHTML = end - 0.5 + ":30";
  } else {
    col3.innerHTML = end + ":00";
  }
  col4.innerHTML = location;
  col5.innerHTML = event;

  // Add google calendar event url to the "Add Reminder" buttons
  col6.innerHTML = '<a target="_blank" class="btn btn-primary" href="' + calendar + '" role="button">Add Reminder</a>';

  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  row.appendChild(col4);
  row.appendChild(col5);
  row.appendChild(col6);
  gameDetailTableBody.appendChild(row);
}

//----------------------------------------------------------------------------------------------
// This function is called by the readGameDetailsData() function and it takes the sport object
// array as the input parameter.  It initializes the table conatiner on the gameDetails.html page.
// Then it iterates throught the array elements to pass each object's field data to the 
// addGameDetailsToTableBody() function.
//-----------------------------------------------------------------------------------------------
function AddAllGameDetailsToTableBody(gameDetailsDocsList) {
  gameDetailTableBody.innerHTML = "";
  gameDetailsDocsList.forEach(element => {
    addGameDetailsToTableBody(element.date, element.startTime, element.endTime, element.location, element.event, element.calendar);
  })
}

// Call the function to read game detail data and display as a table in the game detail page
readGameDetailsData();