/**
 * @author Jin Rong Jian
 * 
 */

 function readSportList(collection) {
  let cardTemplate = document.getElementById("sportListTemplate");

  db.collection(collection).get()
    .then(allSport => {
      allSport.forEach(doc => { 
        var title = doc.data().title;
        var image = doc.data().image;
        var sportId = doc.data().id;
        let newcard = cardTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector('.gameTitle').innerHTML = title;
        newcard.querySelector('a').onclick = () => setSportData(sportId);
        newcard.querySelector('.gameImage').src = "./images/" + image + ".jpg"; 

        //give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        document.getElementById(collection + "GoHere").appendChild(newcard);
      })
    })
}
readSportList("sportList");

// Store each sport ID in local storage and use it on game detail page
function setSportData(id) {
  localStorage.setItem ('sportId', id);
}