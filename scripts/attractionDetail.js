// attractionID was stored from attractionList.js.
var attractionID = localStorage.getItem("attractionID");

// Get the attraction ID from the attractionList.html page and populate the data if the ID is matching from the Firebase.
// The method is invoked when the attractionDetail.html page is loaded.
function readAttraction() {

    db.collection("attractions").where("id", "==", attractionID)
        .get()
        .then(attractionData => {
            attractions = attractionData.docs;
            var thisAttraction = attractions[0].data();

            document.getElementById("header-title").innerHTML = "<b>" + thisAttraction.name + "</b>";
            document.getElementById("header-text").innerHTML = thisAttraction.information;
            document.getElementById("phone").innerHTML = thisAttraction.phone;
            document.getElementById("address").innerHTML = thisAttraction.address;
            document.getElementById("header-image").src = thisAttraction.image;
            document.getElementById("gallery-image").src = thisAttraction.image;

        });
}
readAttraction();