
//----------------------------------------------------------------------------------------------
// This function is called when the sportList.html page loads. It reads the sportList collection
// and display the document data as a list of cards. 
//-----------------------------------------------------------------------------------------------
 function readSportList(collection) {
  let cardTemplate = document.getElementById("sportListTemplate");

  db.collection(collection).get()
    .then(allSport => {
      allSport.forEach(doc => { 
        var title = doc.data().title;
        var image = doc.data().image;
        var sportId = doc.data().id;
        let newcard = cardTemplate.content.cloneNode(true);

        // Update title and image
        newcard.querySelector('.gameTitle').innerHTML = title;
        newcard.querySelector('a').onclick = () => setSportData(sportId);
        newcard.querySelector('.gameImage').src = "./images/" + image + ".jpg"; 

        document.getElementById(collection + "GoHere").appendChild(newcard);
      })
    })
}
readSportList("sportList");


//----------------------------------------------------------------------------------------------
// This function is called when the user clicks a card on the page.  It stores the sport id of 
// the selected sport in the browser's local storage.
//-----------------------------------------------------------------------------------------------
function setSportData(id) {
  localStorage.setItem ('sportId', id);
}