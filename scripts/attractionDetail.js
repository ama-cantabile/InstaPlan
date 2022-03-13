var attractionID = localStorage.getItem("attractionID");

function readAttraction() {

    db.collection("attractions").where("id", "==", attractionID)
        .get()
        .then(attractionData => {
            attractions = attractionData.docs;
            var thisAttraction = attractions[0].data();

            document.getElementById("header-title").innerHTML = thisAttraction.name;
            document.getElementById("header-text").innerHTML = thisAttraction.information;
            document.getElementById("phone").innerHTML = thisAttraction.phone;
            document.getElementById("address").innerHTML = thisAttraction.address;
            document.getElementById("header-image").src = thisAttraction.image;

        });
}
readAttraction();