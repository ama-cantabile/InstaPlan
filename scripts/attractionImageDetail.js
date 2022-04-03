//Displaying detailed attraction image.
function readAttraction() {

    db.collection("attractions").doc("1cpL9GncYHGhtBIpX8j5").onSnapshot(attractionData => {
        console.log(attractionData.data());

        document.getElementById("main-image").src = attractionData.data().image;

    });
}
readAttraction();