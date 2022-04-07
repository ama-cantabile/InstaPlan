// Displaying detailed attraction image.
function readAttraction() {

    var attractionID = localStorage.getItem("attractionID");

    db.collection("attractions").where("id", "==", attractionID)
    .get()
    .then(attractionData => {
        attractions = attractionData.docs;
        var thisAttraction = attractions[0].data();

        document.getElementById("text-title").innerHTML = "<b>" + thisAttraction.name + " - Image</b>";
        document.getElementById("main-image").src = thisAttraction.image;

    });
}
readAttraction();