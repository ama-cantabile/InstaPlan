function readAttraction() {

    db.collection("attractions").doc("1cpL9GncYHGhtBIpX8j5").onSnapshot(attractionData => {
        document.getElementById("header-title").innerHTML = attractionData.data().name;
        document.getElementById("header-text").innerHTML = attractionData.data().information;
        document.getElementById("phone").innerHTML = attractionData.data().phone;
        document.getElementById("address").innerHTML = attractionData.data().address;
        document.getElementById("header-image").src = attractionData.data().image;

    });
}
readAttraction();