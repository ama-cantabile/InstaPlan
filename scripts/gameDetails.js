/**
 * @author Jin Rong Jian
 * 
 */

let sportId = localStorage.getItem("sportId");

// Display the same title and image from the sportList collection to the game detail page
db.collection("sportList").where("id", "==", sportId)
  .get()
  .then(querySport => {
    //see how many results you have got from the query
    size = querySport.size;
    // get the documents of query
    sports = querySport.docs;

    // We want to have one document per sport, so if the the result of 
    //the query is more than one, we can check it right now and clean the DB if needed.
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

// Read game detail collection and store document data in a string.
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

// Create game detail table body element and data parameters
function addGameDetailsToTableBody(date, start, end, location, event, calendar) {
  var row = document.createElement("tr");
  var col1 = document.createElement("td");
  var col2 = document.createElement("td");
  var col3 = document.createElement("td");
  var col4 = document.createElement("td");
  var col5 = document.createElement("td");
  var col6 = document.createElement("td");

  col1.innerHTML = date;
  col2.innerHTML = start;
  col3.innerHTML = end;
  col4.innerHTML = location;
  col5.innerHTML = event;
  
  // add google calendar event anchor tag element
  col6.innerHTML = '<a target="_blank" class="btn btn-primary" href="'+ calendar +'" role="button">Add Reminder</a>';

  row.appendChild(col1);
  row.appendChild(col2);
  row.appendChild(col3);
  row.appendChild(col4);
  row.appendChild(col5);
  row.appendChild(col6);
  gameDetailTableBody.appendChild(row);
}

// Read all documents form the game detail collection
function AddAllGameDetailsToTableBody (gameDetailsDocsList) {
  gameDetailTableBody.innerHTML="";
  gameDetailsDocsList.forEach(element => {
    addGameDetailsToTableBody(element.date, element.startTime, element.endTime, element.location, element.event, element.calendar);
  })
}

// Call the function to read game detail data and display as a table in the game detail page
readGameDetailsData();